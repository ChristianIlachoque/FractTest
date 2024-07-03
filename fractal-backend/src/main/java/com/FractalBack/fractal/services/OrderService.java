package com.FractalBack.fractal.services;

import com.FractalBack.fractal.dto.OrderRequest;
import com.FractalBack.fractal.dto.OrderResponse;
import com.FractalBack.fractal.dto.ProductQuantity;
import com.FractalBack.fractal.entities.Order;
import com.FractalBack.fractal.entities.OrderProduct;
import com.FractalBack.fractal.entities.OrderStatus;
import com.FractalBack.fractal.entities.Product;
import com.FractalBack.fractal.repositories.OrderRepository;
import com.FractalBack.fractal.repositories.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    @Autowired
    OrderRepository orderRepository;

    @Autowired
    ProductRepository productRepository;

    public List<OrderResponse> getAllOrders() {
        List<OrderResponse> orderResposeList = new ArrayList<>();
        orderRepository.findAll().stream().forEach(order -> orderResposeList.add(OrderResponse.convertToOrderResponse(order)));
        return orderResposeList;
    }

    public OrderResponse getOrderById(Long id){
        return OrderResponse.convertToOrderResponse(orderRepository.findById(id).orElse(null));
    }

    public Order createOrder(Order order, List<ProductQuantity> products){
        List<OrderProduct> orderProducts = new ArrayList<>();
        for (ProductQuantity pq : products) {
            Product product = productRepository.findById(pq.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found: " + pq.getProductId()));
            OrderProduct orderProduct = new OrderProduct();
            orderProduct.setOrder(order);
            orderProduct.setProduct(product);
            orderProduct.setQuantity(pq.getQuantity());
            orderProducts.add(orderProduct);
        }
        order.setOrderProducts(orderProducts);
        return orderRepository.save(order);
    }

    @Transactional
    public Order updateOrder(Long id, Order updatedOrder, List<ProductQuantity> products) {
        Optional<Order> optionalOrder = orderRepository.findById(id);
        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            order.setNumber(updatedOrder.getNumber());
            order.setDate(updatedOrder.getDate());
            order.setStatus(updatedOrder.getStatus());

            // Eliminar las relaciones actuales de OrderProduct
            List<OrderProduct> existingOrderProducts = order.getOrderProducts();
            existingOrderProducts.clear();

            // Añadir las nuevas relaciones de OrderProduct
            List<OrderProduct> orderProducts = new ArrayList<>();
            for (ProductQuantity pq : products) {
                Product product = productRepository.findById(pq.getProductId())
                        .orElseThrow(() -> new RuntimeException("Product not found: " + pq.getProductId()));
                OrderProduct orderProduct = new OrderProduct();
                orderProduct.setOrder(order);
                orderProduct.setProduct(product);
                orderProduct.setQuantity(pq.getQuantity());
                orderProducts.add(orderProduct);
            }
            existingOrderProducts.addAll(orderProducts);

            return orderRepository.save(order);
        } else {
            throw new RuntimeException("Order not found: " + id);
        }
    }

    @Transactional
    public void deleteOrder(Long id) {
        if (orderRepository.existsById(id)) {
            orderRepository.deleteById(id);
        } else {
            throw new RuntimeException("Order not found: " + id);
        }
    }
}
