const features = [
  ['🚚', 'Free Shipping', 'On all orders over $99'],
  ['💎', 'Authentic Products', '100% Genuine Fragrances'],
  ['🎁', 'Luxury Packaging', 'Complimentary gift wrapping'],
  ['↩️', 'Easy Returns', '30-day hassle-free returns']
];

const Features = () => (
  <div className="bg-white py-12 border-b border-gray-100">
    <div className="max-w-[1400px] mx-auto px-6 md:px-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(([icon, title, desc]) => (
          <div key={title} className="flex items-center gap-4 group cursor-default">
            <span className="text-3xl grayscale group-hover:grayscale-0 transition-all">{icon}</span>
            <div>
              <h4 className="text-[14px] font-bold tracking-widest uppercase text-brand-dark">{title}</h4>
              <p className="text-[13px] text-gray-500 mt-1">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Features