const ProductGrid = ({ products, loading }) => (
  <section className="max-w-[1400px] mx-auto px-6 md:px-16 py-16">
    <div className="text-center mb-12">
      <span className="text-stelina-gold text-sm tracking-[0.3em] uppercase font-semibold">Top Picks</span>
      <h2 className="text-4xl font-tenor tracking-widest uppercase mt-3">Our Best Sellers</h2>
    </div>

    {loading ? (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-stelina-gold"></div>
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {products.map((product) => (
          <div key={product.id} className="group cursor-pointer">
            {/* Image Container */}
            <div className="bg-[#F9F9F9] relative overflow-hidden aspect-[3/4] flex items-center justify-center p-8">
              <span className="absolute top-4 left-4 bg-stelina-gold text-white text-[10px] px-3 py-1 font-bold tracking-widest">SALE</span>
              <img 
                src={product.image} 
                alt={product.name} 
                className="max-h-full object-contain transition-transform duration-500 group-hover:scale-105" 
              />
              {/* Quick Add Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-white/90 py-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 text-center">
                <button className="text-[11px] font-bold tracking-widest uppercase hover:text-stelina-gold">
                  Add to Cart
                </button>
              </div>
            </div>
            {/* Info */}
            <div className="mt-6 text-center">
              <h3 className="text-brand-dark text-[15px] font-medium tracking-wide group-hover:text-stelina-gold transition-colors">
                {product.name}
              </h3>
              <p className="text-stelina-gold font-bold mt-2 text-lg">
                ${product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    )}
  </section>
);

export default ProductGrid