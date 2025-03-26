import { Product } from "./ProductList";

type Props = {
  product: Product;
  deleteProduct: (id: number) => void;
  editProduct: (product: Product) => void;
};

export function ProductItem({ product, deleteProduct, editProduct }: Props) {
    return (
        <li className="product-item">
          <h3>{product.name} - R$ {product.price.toFixed(2)}</h3>
          <p className="description">{product.description}</p>
          
          <div className="date-info">
            <small>Criado em: {new Date(product.created_at).toLocaleString()}</small>
            <br />
            <small>Atualizado em: {new Date(product.updated_at).toLocaleString()}</small>
          </div>
          
          <div className="button-container"> 
            <div className="button-group">
              <button className="edit-button" onClick={() => editProduct(product)}>Editar</button>
              <button className="delete-button" onClick={() => deleteProduct(product.id)}>Excluir</button>
            </div>
          </div>
        </li>
      );
}

