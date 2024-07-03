package com.FractalBack.fractal.dto;

import com.FractalBack.fractal.entities.OrderStatus;
import com.FractalBack.fractal.entities.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequest {
    private Long number;
    private Date date;
    private OrderStatus status;
    private List<ProductQuantity> products;
}

