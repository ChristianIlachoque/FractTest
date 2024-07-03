package com.FractalBack.fractal.dto;

import com.FractalBack.fractal.entities.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductQuantity {
    private Long productId;
    private int quantity;
}
