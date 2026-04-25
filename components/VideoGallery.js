'use client';
import { useState } from 'react';

export default function VideoGallery({ videos }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!videos || videos.length === 0) return null;

  const activeId = videos[activeIndex];

  return (
    <div className="video-gallery">
      <div className="video-gallery-player">
        <iframe
          src={`https://www.youtube.com/embed/${activeId}`}
          frameBorder="0"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>

      {videos.length > 1 && (
        <div className="video-thumbnails">
          {videos.map((id, i) => (
            <button
              key={id}
              className={`video-thumb${i === activeIndex ? ' active' : ''}`}
              onClick={() => setActiveIndex(i)}
              aria-label={`Video ${i + 1}`}
            >
              <img
                src={`https://img.youtube.com/vi/${id}/mqdefault.jpg`}
                alt={`Video ${i + 1}`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
