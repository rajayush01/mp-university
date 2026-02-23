import React from 'react';
import { useNavigate } from 'react-router-dom';
import img1 from "../../assets/mp2.png";
import img2 from "../../assets/mp3.png";
import img3 from "../../assets/mp4.png";
import img4 from "../../assets/mp5.png";
import img5 from "../../assets/mp6.png";
import img6 from "../../assets/mp7.png";


interface GalleryPreviewProps { title?: string; subtitle?: string; }

const GalleryPreview: React.FC<GalleryPreviewProps> = ({
  title = 'Campus Life Gallery',
  subtitle = 'Capturing moments that define our community',
}) => {
  const navigate = useNavigate();
  const previewImages = [
    { id:1, url:img1, alt:'Campus Building' },
    { id:2, url:img2, alt:'Students Studying' },
    { id:3, url:img3, alt:'Graduation Ceremony' },
    { id:4, url:img4, alt:'Library Interior' },
    { id:5, url:img5, alt:'Student Activities' },
    { id:6, url:img6, alt:'Campus Landscape' },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1e3a8a] mb-4">
            {title}
          </h2>
          <div className="w-24 h-1 bg-[#B8860B] mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {previewImages.map((image) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 aspect-[4/3]"
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a8a]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-semibold text-lg">{image.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate('/gallery')}
            className="inline-flex items-center px-8 py-4 bg-black text-white font-semibold rounded-lg shadow-lg hover:bg-gray-700 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <span>See More</span>
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default GalleryPreview;