import { useState, useEffect } from "react";
import { Product } from "./ProductList";

type Props = {
  addProduct: (product: Product) => void;
  editingProduct: Product | null;
};

export function ProductForm({ addProduct, editingProduct }: Props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setPrice(editingProduct.price.toString());
      setDescription(editingProduct.description);
    }
  }, [editingProduct]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !description) return;

    addProduct({
      id: editingProduct ? editingProduct.id : 0,
      name,
      price: Number(price),
      description,
      created_at: editingProduct ? editingProduct.created_at : new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    setName("");
    setPrice("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="number" placeholder="Preço" value={price} onChange={(e) => setPrice(e.target.value)} />
      <textarea placeholder="Descrição" value={description} onChange={(e) => setDescription(e.target.value)} />
      <button>{editingProduct ? "Salvar" : "Adicionar"}</button>
    </form>
  );
}

