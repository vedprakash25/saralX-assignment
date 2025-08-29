import { useEffect, useRef, useState } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

const slides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1634816959430-91725cb42b03?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8",
    title: "Slide 1",
    description: "This is the first slide.",
    alt: "Abstract portrait of a person with glowing neon green and blue paint under blacklight.",
  },
  {
    id: 2,
    image:
      "https://plus.unsplash.com/premium_photo-1756286484747-c269c20e6a24?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8",
    title: "Slide 2",
    description: "This is the second slide.",
    alt: "Two people arranging and viewing photographs displayed on a white wall in an art-style setup.",
  },
  {
    id: 3,
    image:
      "https://plus.unsplash.com/premium_photo-1756298029029-175eeb4bff18?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxN3x8fGVufDB8fHx8fA%3D%3D",
    title: "Slide 3",
    description: "This is the third slide.",
    alt: "Digital artwork of an astronaut standing on the moon holding a flag with a dog image, with an error message box overlay.",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1749372533354-c8d8f30721d5?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNHx8fGVufDB8fHx8fA%3D%3D",
    title: "Slide 4",
    description: "This is the fourth slide.",
    alt: "Silhouette of a person holding a plant stem near their face, softly blurred with warm sunlight in the background.",
  },
  {
    id: 5,
    image:
      "https://plus.unsplash.com/premium_photo-1755856680228-60755545c4ec?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzN3x8fGVufDB8fHx8fA%3D%3D",
    title: "Slide 5",
    description: "This is the fifth slide.",
    alt: "Silhouette of a person standing outdoors during sunset with the moon visible in the sky.",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1755884405235-5c0213aa3374?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3MHx8fGVufDB8fHx8fA%3D%3D",
    title: "Slide 6",
    description: "This is the sixth slide.",
    alt: "Portrait of a woman in a black outfit against a dark red and black background with dramatic lighting.",
  },
];

function App() {
  const sliderRef = useRef(null);
  const [current, setCurrent] = useState(0);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1.8,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 1 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
    accessibility: true,
    arrows: false,
    beforeChange: (oldIndex, newIndex) => setCurrent(newIndex),
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;

      if (e.key === "ArrowRight") {
        sliderRef.current?.slickNext();
      } else if (e.key === "ArrowLeft") {
        sliderRef.current?.slickPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [sliderRef.current]);

  return (
    <section
      className="overflow-x-hidden p-4 md:p-8"
      aria-roledescription="carousel"
      aria-label="Image Carousel"
      role="region"
    >
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => sliderRef.current?.slickPrev()}
          className="text-2xl px-4 md:pt-1 md:pb-2 pb-1 bg-gray-200 rounded-3xl hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Previous Slide"
          aria-controls="carousel-slides"
        >
          &#8592;
        </button>
        <div
          id="carousel-status"
          aria-live="polite"
          className="text-sm text-gray-600"
        >
          Slide {current + 1} of {slides.length}
        </div>
        <button
          onClick={() => sliderRef.current?.slickNext()}
          className="text-2xl px-4 md:pt-1 md:pb-2 pb-1 bg-gray-200 rounded-3xl hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Next Slide"
          aria-controls="carousel-slides"
        >
          &#8594;
        </button>
      </div>
      <Slider
        ref={sliderRef}
        {...settings}
        className="w-full border"
        id="carousel-slides"
        aria-live="polite"
      >
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            tabIndex={0}
            className="border p-4 md:p-10 outline-none"
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${idx + 1}: ${slide.title}. ${
              slide.description
            }`}
            aria-current="false"
          >
            <img
              src={slide.image}
              alt={slide.alt}
              tabIndex={0}
              className="mb-4 2xl:h-80 h-52 w-full object-cover rounded"
            />
            <h3
              className="text-lg font-bold"
              tabIndex={0}
            >
              {slide.title}
            </h3>
            <p
              className="text-sm"
              tabIndex={0}
            >
              {slide.description}
            </p>
          </div>
        ))}
      </Slider>
      <div
        className="flex gap-2 justify-center items-center mt-6"
        role="tablist"
        aria-label="Slide selector"
      >
        {slides.map((slide, idx) => (
          <button
            key={slide.id}
            className={`w-3 h-3 rounded-full ${
              current === idx ? "bg-blue-600" : "bg-gray-300"
            } focus:outline-none`}
            aria-label={`Go to slide ${idx + 1}`}
            aria-controls="carousel-slides"
            aria-selected={current === idx}
            tabIndex={current === idx ? 0 : -1}
            role="tab"
            onClick={() => sliderRef.current?.slickGoTo(idx)}
          />
        ))}
      </div>
    </section>
  );
}

export default App;
