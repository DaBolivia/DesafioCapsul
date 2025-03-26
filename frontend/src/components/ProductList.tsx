import { useState, useEffect } from "react";
import { ProductItem } from "./ProductItem";
import { ProductForm } from "./ProductForm";
import "./ProductStyles.css"; 

export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  created_at: string;
  updated_at: string;
};

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    setProducts([
      {
        id: 1,
        name: "Produto A",
        price: 19.9,
        description: "Descrição do Produto A",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]);
  }, []);

  const addProduct = (product: Product) => {
    const timestamp = new Date().toISOString();
    if (editingProduct) {
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id ? { ...product, updated_at: timestamp } : p
        )
      );
      setEditingProduct(null);
    } else {
      setProducts([
        ...products,
        { ...product, id: products.length + 1, created_at: timestamp, updated_at: timestamp },
      ]);
    }
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const editProduct = (product: Product) => {
    setEditingProduct(product);
  };

  return (
    <div className="container">
      
      <ProductForm addProduct={addProduct} editingProduct={editingProduct} />
      <h2>Lista de Produtos</h2>
      <ul>
        {products.map((product) => (
          <ProductItem key={product.id} product={product} deleteProduct={deleteProduct} editProduct={editProduct} />
        ))}
      </ul>
    </div>
  );
}

