import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "./Home.styles"; // adjust path if needed
import Buttons from "./Buttons";
const ProductGrid = ({ products, loading }) => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div style={styles.featured}>
   <p className="text-sm uppercase tracking-wider text-gray-500 text-center mb-2">
      Our Selection
    </p>
    <h2 className="text-4xl font-light tracking-wide text-center uppercase mb-12">
      Featured Products
    </h2>
      <div style={{ marginBottom: "50px" }} />

      {loading ? (
        <div style={styles.loading}>Loading...</div>
      ) : (
        <div style={styles.productGrid}>
          {products.map((product) => {
            const id = product._id || product.id;

            return (
              <Link
                to={`/product/${id}`}
                key={id}
                style={{
                  ...styles.productCard,
                  transform:
                    hoveredCard === id ? "translateY(-4px)" : "none",
                  boxShadow:
                    hoveredCard === id
                      ? "0 8px 30px rgba(0,0,0,0.1)"
                      : "none",
                }}
                onMouseEnter={() => setHoveredCard(id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div style={styles.productImageContainer}>
                  <img
                    src={
                      product.image ||
                      "https://placehold.co/400x500/f5f1eb/b8976a?text=Perfume"
                    }
                    alt={product.name}
                    style={styles.productImage}
                  />

                  {product.stock < 10 && product.stock > 0 && (
                    <span style={styles.productBadge}>
                      Low Stock
                    </span>
                  )}
                </div>

                <div style={styles.productInfo}>
                  <p style={styles.productBrand}>Stelina</p>

                  <h3 style={styles.productName}>
                    {product.name}
                  </h3>

                  <p style={styles.productPrice}>
                    ${product.price}
                  </p>

 <Buttons.CartButton            
/>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      <div style={styles.viewAllWrap}>
        <Link to="/products" style={styles.viewAllBtn}>
          View All Products
        </Link>
      </div>
    </div>
  );
};

export default ProductGrid;