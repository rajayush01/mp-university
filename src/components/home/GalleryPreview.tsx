import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import img1 from "../../assets/mp2.png";
import img2 from "../../assets/mp3.png";
import img3 from "../../assets/mp4.png";
import img4 from "../../assets/mp5.png";
import img5 from "../../assets/mp6.png";
import img6 from "../../assets/mp7.png";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');
  .gallery-preview { font-family: 'DM Sans', sans-serif; }
  .gallery-display  { font-family: 'Cormorant Garamond', serif; }

  @keyframes revealUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .g-reveal { animation: revealUp 0.7s cubic-bezier(0.16,1,0.3,1) backwards; }

  .gp-thumb { overflow: hidden; position: relative; }
  .gp-thumb img {
    transition: transform 0.6s cubic-bezier(0.16,1,0.3,1), filter 0.4s ease;
    filter: grayscale(15%);
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .gp-thumb:hover img { transform: scale(1.07); filter: grayscale(0%); }

  .gp-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%);
    opacity: 0;
    transition: opacity 0.35s ease;
  }
  .gp-thumb:hover .gp-overlay { opacity: 1; }

  .gp-label {
    position: absolute; bottom: 14px; left: 14px; right: 14px;
    opacity: 0; transform: translateY(8px);
    transition: all 0.35s ease;
  }
  .gp-thumb:hover .gp-label { opacity: 1; transform: translateY(0); }

  .gp-zoom {
    position: absolute; top: 50%; left: 50%;
    transform: translate(-50%, -50%) scale(0);
    transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
  }
  .gp-thumb:hover .gp-zoom { transform: translate(-50%, -50%) scale(1); }

  .gp-corner-tl { position: absolute; top: 10px; left: 10px; width: 20px; height: 20px; border-top: 2px solid rgba(255,255,255,0.7); border-left: 2px solid rgba(255,255,255,0.7); opacity: 0; transition: opacity 0.3s ease; pointer-events: none; }
  .gp-corner-br { position: absolute; bottom: 10px; right: 10px; width: 20px; height: 20px; border-bottom: 2px solid rgba(255,255,255,0.7); border-right: 2px solid rgba(255,255,255,0.7); opacity: 0; transition: opacity 0.3s ease; pointer-events: none; }
  .gp-thumb:hover .gp-corner-tl,
  .gp-thumb:hover .gp-corner-br { opacity: 1; }

  .cta-btn { transition: all 0.35s cubic-bezier(0.16,1,0.3,1); letter-spacing: 0.08em; }
  .cta-btn:hover { letter-spacing: 0.14em; background: #000 !important; }
  .cta-btn:hover .cta-arrow { transform: translateX(5px); }
  .cta-arrow { transition: transform 0.25s ease; }

  @media (max-width: 768px) {
    .gp-grid { grid-template-columns: 1fr !important; grid-template-rows: repeat(6, 220px) !important; }
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    .gp-grid { grid-template-columns: repeat(2, 1fr) !important; grid-template-rows: repeat(3, 260px) !important; }
  }
`;

interface GalleryPreviewProps {
  title?: string;
  subtitle?: string;
}

const GalleryPreview: React.FC<GalleryPreviewProps> = ({
  title = 'Campus Life Gallery',
  subtitle = 'Capturing moments that define our community',
}) => {
  const navigate = useNavigate();

  const previewImages = [
    { id: 1, url: img1, alt: 'Campus Building' },
    { id: 2, url: img2, alt: 'Students Studying' },
    { id: 3, url: img3, alt: 'Graduation Ceremony' },
    { id: 4, url: img4, alt: 'Library Interior' },
    { id: 5, url: img5, alt: 'Student Activities' },
    { id: 6, url: img6, alt: 'Campus Landscape' },
  ];

  const words = title.split(' ');
  const lastWord = words.slice(-1)[0];
  const restWords = words.slice(0, -1).join(' ');

  return (
    <>
      <style>{styles}</style>
      <section className="gallery-preview" style={{ background: '#fff', padding: '96px 16px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

          {/* ── Header ── */}
          <div className="g-reveal" style={{ textAlign: 'center', marginBottom: '56px' }}>
            {/* Ornamental divider */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '20px' }}>
              <div style={{ height: '1px', width: '64px', background: '#111' }} />
              <div style={{ width: '8px', height: '8px', background: '#111', transform: 'rotate(45deg)' }} />
              <div style={{ height: '1px', width: '64px', background: '#111' }} />
            </div>
            <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.3em', color: '#999', marginBottom: '14px' }}>
              Visual Stories
            </p>
            <h2
              className="gallery-display"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 600, color: '#111', lineHeight: 1.1, marginBottom: '20px' }}
            >
              {restWords} <em style={{ fontWeight: 400 }}>{lastWord}</em>
            </h2>
            <div style={{ height: '1px', width: '80px', background: '#e0e0e0', margin: '0 auto 18px' }} />
            <p style={{ fontSize: '15px', color: '#888', maxWidth: '460px', margin: '0 auto', fontWeight: 300, lineHeight: 1.75 }}>
              {subtitle}
            </p>
          </div>

          {/* ── 3×2 Equal Grid ── */}
          <div
            className="g-reveal gp-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridTemplateRows: 'repeat(2, 280px)',
              gap: '12px',
              animationDelay: '0.12s',
            }}
          >
            {previewImages.map((image, index) => (
              <div
                key={image.id}
                className="gp-thumb"
                style={{
                  borderRadius: '2px',
                  border: '1px solid #e8e8e8',
                  cursor: 'pointer',
                }}
              >
                <img src={image.url} alt={image.alt} />
                <div className="gp-overlay" />
                <div className="gp-corner-tl" />
                <div className="gp-corner-br" />
                <div className="gp-label">
                  <p style={{ color: '#fff', fontSize: '13px', fontWeight: 500, margin: 0 }}>{image.alt}</p>
                </div>
                <div className="gp-zoom">
                  <div style={{
                    width: '44px', height: '44px',
                    borderRadius: '50%',
                    border: '2px solid rgba(255,255,255,0.85)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(0,0,0,0.25)',
                    backdropFilter: 'blur(4px)',
                  }}>
                    <span style={{ color: '#fff', fontSize: '22px', lineHeight: 1, marginTop: '-2px' }}>+</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── CTA ── */}
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <button
              onClick={() => navigate('/gallery')}
              className="cta-btn"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '12px',
                background: '#111', color: '#fff',
                padding: '14px 40px',
                fontSize: '12px', fontWeight: 500,
                textTransform: 'uppercase',
                border: '1px solid #333',
                borderRadius: '2px',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Explore Full Gallery
              <ArrowRight className="cta-arrow" style={{ width: '16px', height: '16px' }} />
            </button>
          </div>

        </div>
      </section>
    </>
  );
};

export default GalleryPreview;