package com.FractalBack.fractal.dto;

import com.FractalBack.fractal.entities.OrderProduct;
import com.FractalBack.fractal.entities.Product;
import lombok.*;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponse {
    private Long id;
    private String name;
    private double price;
    private int quantity;

    public static ProductResponse convertToProductResponse(Product product){
        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .price(product.getPrice())
                .build();
    }

    public static ProductResponse convertToProductResponseWithQuantity(Product product, int quantity){
        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .price(product.getPrice())
                .quantity(quantity)
                .build();
    }
}
