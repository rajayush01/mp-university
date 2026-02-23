import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const galleryStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');
  .gallery-page   { font-family: 'DM Sans', sans-serif; }
  .gallery-display { font-family: 'Cormorant Garamond', serif; }

  @keyframes fadeIn   { from { opacity: 0; } to { opacity: 1; } }
  @keyframes scaleIn  { from { opacity: 0; transform: scale(0.93); } to { opacity: 1; transform: scale(1); } }
  @keyframes slideUp  { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }

  .g-fade   { animation: fadeIn  0.45s ease backwards; }
  .g-scale  { animation: scaleIn 0.45s cubic-bezier(0.16,1,0.3,1) backwards; }
  .g-slide  { animation: slideUp 0.6s  cubic-bezier(0.16,1,0.3,1) backwards; }

  .g-thumb img { filter: grayscale(20%); transition: transform 0.55s cubic-bezier(0.16,1,0.3,1), filter 0.35s ease; }
  .g-thumb:hover img { transform: scale(1.08); filter: grayscale(0%); }

  .g-overlay {
    background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 55%);
    opacity: 0; transition: opacity 0.3s ease;
  }
  .g-thumb:hover .g-overlay { opacity: 1; }

  .g-caption { opacity: 0; transform: translateY(8px); transition: all 0.3s ease; }
  .g-thumb:hover .g-caption { opacity: 1; transform: translateY(0); }

  .filter-btn { transition: all 0.2s ease; }
  .filter-btn.active { background: #1e3a8a; color: #fff; }
  .filter-btn:not(.active):hover { background: #f0f7ff; color: #1e3a8a; }

  .lightbox-img { animation: scaleIn 0.4s cubic-bezier(0.16,1,0.3,1); }
`;

interface GalleryImage { id: number; url: string; alt: string; category: string; }
interface GalleryCategory { id: string; name: string; images: GalleryImage[]; }

const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const categories: GalleryCategory[] = [
    {
      id: 'campus', name: 'Campus',
      images: [
        { id: 1,  url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800', alt: 'Main Campus Building', category: 'campus' },
        { id: 2,  url: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800', alt: 'University Library',   category: 'campus' },
        { id: 3,  url: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800', alt: 'Campus Grounds',       category: 'campus' },
        { id: 4,  url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800', alt: 'Study Areas',          category: 'campus' },
        { id: 5,  url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800', alt: 'Technology Center',   category: 'campus' },
        { id: 6,  url: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800', alt: 'Science Laboratory',  category: 'campus' },
      ],
    },
    {
      id: 'events', name: 'Events',
      images: [
        { id: 7,  url: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800', alt: 'Graduation Ceremony', category: 'events' },
        { id: 8,  url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800', alt: 'Annual Convocation',  category: 'events' },
        { id: 9,  url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800', alt: 'Cultural Festival',   category: 'events' },
        { id: 10, url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800', alt: 'Academic Conference', category: 'events' },
        { id: 11, url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800', alt: 'Sports Day',          category: 'events' },
        { id: 12, url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800', alt: 'Freshers Welcome',    category: 'events' },
      ],
    },
    {
      id: 'students', name: 'Student Life',
      images: [
        { id: 13, url: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?w=800', alt: 'Student Collaboration', category: 'students' },
        { id: 14, url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800', alt: 'Group Study Session',    category: 'students' },
        { id: 15, url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800', alt: 'Campus Recreation',      category: 'students' },
        { id: 16, url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800', alt: 'Team Discussion',        category: 'students' },
        { id: 17, url: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800', alt: 'Student Presentations',  category: 'students' },
        { id: 18, url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800', alt: 'Outdoor Activities',     category: 'students' },
      ],
    },
    {
      id: 'research', name: 'Research',
      images: [
        { id: 19, url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800', alt: 'Research Laboratory',  category: 'research' },
        { id: 20, url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800', alt: 'Scientific Equipment', category: 'research' },
        { id: 21, url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800', alt: 'Data Analysis',        category: 'research' },
        { id: 22, url: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800', alt: 'Engineering Projects', category: 'research' },
        { id: 23, url: 'https://images.unsplash.com/photo-1581093458791-9d42e3c4e1e9?w=800', alt: 'Innovation Lab',       category: 'research' },
        { id: 24, url: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800', alt: 'Research Symposium',   category: 'research' },
      ],
    },
  ];

  const allImages = categories.flatMap(c => c.images);
  const displayed = activeCategory === 'all' ? allImages : categories.find(c => c.id === activeCategory)?.images || [];

  const nav = (dir: 'prev' | 'next') => {
    if (!selectedImage) return;
    const idx = displayed.findIndex(i => i.id === selectedImage.id);
    const next = dir === 'next' ? (idx + 1) % displayed.length : (idx - 1 + displayed.length) % displayed.length;
    setSelectedImage(displayed[next]);
  };

  return (
    <>
      <style>{galleryStyles}</style>
      <div className="gallery-page min-h-screen mt-10 md:mt-36" style={{ background: '#fff' }}>

        {/* Hero Header */}
        <div className="py-20 px-4 text-center" style={{ background: '#1e3a8a', position: 'relative', overflow: 'hidden' }}>
          {/* Decorative ghost text */}
          <div
            className="gallery-display absolute inset-0 flex items-center justify-center select-none pointer-events-none"
            style={{ fontSize: '240px', opacity: 0.06, color: '#fff', fontStyle: 'italic', lineHeight: 1, letterSpacing: '-0.04em' }}
          >
            Gallery
          </div>
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="h-px w-12" style={{ background: 'rgba(255,255,255,0.4)' }} />
              <div className="w-2 h-2 rotate-45" style={{ background: 'rgba(255,255,255,0.6)' }} />
              <div className="h-px w-12" style={{ background: 'rgba(255,255,255,0.4)' }} />
            </div>
            <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: 'rgba(255,255,255,0.6)' }}>Visual Archive</p>
            <h1 className="gallery-display g-slide text-6xl md:text-7xl font-semibold text-white mb-4">Photo Gallery</h1>
            <p className="text-lg font-light max-w-xl mx-auto g-slide" style={{ color: 'rgba(255,255,255,0.7)', animationDelay: '0.1s' }}>
              Discover the essence of our university through these captivating moments
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="sticky top-0 z-40 bg-white" style={{ borderBottom: '1px solid #e5e5e5', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <div className="max-w-7xl mx-auto px-4 py-5 flex flex-wrap gap-2 justify-center">
            {[{ id: 'all', name: 'All Photos' }, ...categories].map(({ id, name }) => (
              <button
                key={id}
                onClick={() => setActiveCategory(id)}
                className={`filter-btn px-5 py-2 text-sm font-medium rounded-sm uppercase tracking-wide ${activeCategory === id ? 'active' : 'text-gray-500'}`}
                style={{ border: '1px solid #e0e0e0' }}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {displayed.map((image, index) => (
              <div
                key={image.id}
                onClick={() => setSelectedImage(image)}
                className="g-thumb g-scale relative overflow-hidden rounded-sm cursor-pointer aspect-[4/3]"
                style={{ animationDelay: `${index * 0.04}s`, border: '1px solid #eee' }}
              >
                <img src={image.url} alt={image.alt} className="w-full h-full object-cover" />
                <div className="g-overlay absolute inset-0" />
                <div className="g-caption absolute bottom-3 left-3 right-3">
                  <p className="text-white text-xs font-medium">{image.alt}</p>
                </div>
                {/* Zoom indicator */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                    <span className="text-white text-xs">+</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {displayed.length === 0 && (
            <div className="text-center py-24">
              <p className="text-gray-400 font-light">No images found in this category.</p>
            </div>
          )}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div
            className="g-fade fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(10,20,60,0.97)' }}
            onClick={() => setSelectedImage(null)}
          >
            {/* Close */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors rounded-sm hover:bg-white/10"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev */}
            <button
              onClick={e => { e.stopPropagation(); nav('prev'); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-gray-400 hover:text-white transition-colors rounded-sm hover:bg-white/10"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>

            {/* Next */}
            <button
              onClick={e => { e.stopPropagation(); nav('next'); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-gray-400 hover:text-white transition-colors rounded-sm hover:bg-white/10"
            >
              <ChevronRight className="w-7 h-7" />
            </button>

            {/* Image */}
            <div className="max-w-5xl w-full lightbox-img" onClick={e => e.stopPropagation()}>
              <img
                src={selectedImage.url}
                alt={selectedImage.alt}
                className="w-full h-auto max-h-[82vh] object-contain rounded-sm"
                style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.6)' }}
              />
              <div className="flex items-center justify-between mt-5">
                <div>
                  <p className="text-white font-medium">{selectedImage.alt}</p>
                  <p className="text-gray-500 text-sm mt-0.5 capitalize">{selectedImage.category}</p>
                </div>
                <p className="text-gray-600 text-sm">
                  {displayed.findIndex(i => i.id === selectedImage.id) + 1} / {displayed.length}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Gallery;