package com.FractalBack.fractal.services;

import com.FractalBack.fractal.dto.ProductResponse;
import com.FractalBack.fractal.entities.Product;
import com.FractalBack.fractal.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    ProductRepository productRepository;

    public List<ProductResponse> getAllProducts(){
        List<Product> products = productRepository.findAll();
        List<ProductResponse> productsResponse = new ArrayList<>();
        products.stream().forEach(product -> productsResponse.add(ProductResponse.convertToProductResponse(product)));
        return productsResponse;
    }

    public ProductResponse getProductById(Long id){
        return ProductResponse.convertToProductResponse(productRepository.findById(id).orElse(null));
    }

    public ProductResponse saveProduct(Product product){
        return ProductResponse.convertToProductResponse(productRepository.save(product));
    }

    public ProductResponse updateProduct(Long id, Product productNew){
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            product.setName(productNew.getName());
            product.setPrice(productNew.getPrice());
            return ProductResponse.convertToProductResponse(productRepository.save(product));
        } else {
            throw new RuntimeException("Product not found: " + id);
        }
    }

    public boolean deleteProduct(Long id){
        try {
            productRepository.deleteById(id);
            return true;
        }catch (Exception e){
            return false;
        }
    }
}
