package com.FractalBack.fractal.controllers;

import com.FractalBack.fractal.dto.OrderRequest;
import com.FractalBack.fractal.dto.OrderResponse;
import com.FractalBack.fractal.entities.Order;
import com.FractalBack.fractal.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/order")
public class OrderController {
    @Autowired
    OrderService orderService;

    @GetMapping
    public ResponseEntity<List<OrderResponse>> getAll(){
        return ResponseEntity.ok((orderService.getAllOrders()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderResponse> getById(@PathVariable Long id){
        return ResponseEntity.ok(orderService.getOrderById(id));
    }

    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(@RequestBody OrderRequest orderRequest) {
        Order order = new Order();
        order.setNumber(orderRequest.getNumber());
        order.setDate(orderRequest.getDate());
        order.setStatus(orderRequest.getStatus());
        Order savedOrder = orderService.createOrder(order, orderRequest.getProducts());
        return ResponseEntity.ok(OrderResponse.convertToOrderResponse(savedOrder));
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrderResponse> updateOrder(@PathVariable Long id, @RequestBody OrderRequest orderRequest) {
        Order updatedOrder = new Order();
        updatedOrder.setNumber(orderRequest.getNumber());
        updatedOrder.setDate(orderRequest.getDate());
        updatedOrder.setStatus(orderRequest.getStatus());
        Order savedOrder = orderService.updateOrder(id, updatedOrder, orderRequest.getProducts());
        return ResponseEntity.ok(OrderResponse.convertToOrderResponse(savedOrder));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        orderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }
}
