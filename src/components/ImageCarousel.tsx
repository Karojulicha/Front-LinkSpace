// src/components/ImageCarousel.tsx
import { useEffect, useState } from "react";
import "./ImageCarousel.css";

const images = [
  "/assets/img/imdb.jpg",
  "/assets/img/Microsoft.jpg",
  "/assets/img/techradar.jpg",
  "/assets/img/GitHub.png",
  "/assets/img/wikipedia.jpg",
];

export const ImageCarousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel-frame" style={{ position: "relative" }}>
      <div className="carousel-centered">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            className={`carousel-image ${i === index ? "active" : ""}`}
            alt={`img-${i}`}
          />
        ))}
      </div>
      <CarouselIndicator total={images.length} current={index} />
    </div>
  );
};


const CarouselIndicator = ({
  total,
  current,
}: {
  total: number;
  current: number;
}) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "8px",
        alignItems: "center",
        position: "absolute",
        bottom: "100px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 5,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        padding: "8px 16px",
        borderRadius: "30px",
        backdropFilter: "blur(4px)",
      }}
    >
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            width: i === current ? 40 : 10,
            height: 10,
            borderRadius: 20,
            backgroundColor: i === current ? "white" : "gray",
            opacity: i === current ? 1 : 0.5,
            transition: "all 0.3s ease",
          }}
        />
      ))}
    </div>
  );
};
