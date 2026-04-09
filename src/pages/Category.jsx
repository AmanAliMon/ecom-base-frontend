import { Link } from 'react-router-dom';

const categories = [
  ['Women\'s Scent', '/women', 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800', 'NEW ARRIVAL'],
  ['Men\'s Collection', '/men', 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800', 'HOT TREND']
];

const CategoryBanners = () => (
  <section className="max-w-[1400px] mx-auto px-6 md:px-16 py-16">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {categories.map(([title, url, img, label]) => (
        <div key={title} className="relative h-[350px] overflow-hidden group">
          <img 
            src={img} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all" />
          <div className="absolute top-1/2 left-12 -translate-y-1/2 z-10">
            <span className="text-stelina-gold text-sm font-semibold tracking-widest uppercase block mb-2">{label}</span>
            <h3 className="text-3xl text-white font-tenor tracking-wider mb-6">{title}</h3>
            <Link to={url} className="inline-block text-white text-xs font-bold tracking-widest border-b-2 border-white pb-1 hover:text-stelina-gold hover:border-stelina-gold transition-all">
              SHOP NOW
            </Link>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default CategoryBanners 