package com.FractalBack.fractal.dto;

import com.FractalBack.fractal.entities.Order;
import lombok.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class OrderResponse {
    private Long id;
    private Long number;
    private Date date;
    private String status;
    private List<ProductResponse> products;

    public static OrderResponse convertToOrderResponse(Order order){
        List<ProductResponse> productsResponse =  new ArrayList();
        order.getOrderProducts().stream().forEach(x -> productsResponse.add(ProductResponse.convertToProductResponseWithQuantity(x.getProduct(), x.getQuantity())));
        return OrderResponse.builder()
                .id(order.getId())
                .number(order.getNumber())
                .date(order.getDate())
                .status(String.valueOf(order.getStatus()))
                .products(productsResponse)
                .build();
    }
}
