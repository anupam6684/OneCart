import React from "react";

export default function Hero() {
  return (
    <div
      id="carouselExampleRide"
      className="carousel slide mb-3"
      data-bs-ride="carousel"
      data-bs-interval="2000"
      data-bs-pause="hover"
      data-bs-wrap="true"
    >
      {/* picture section */}
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src="https://g.sdlcdn.com/imgs/a/b/c/feedConfig/Makeup_webplat_20nov.jpg?q=40"
            className="d-block w-100"
            alt="Makeup"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://g.sdlcdn.com/imgs/a/b/c/feedConfig/GirlClothing_webplat_20nov.jpg?q=40"
            className="d-block w-100"
            alt="Girl Clothing"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://g.sdlcdn.com/imgs/a/b/c/feedConfig/BoysClothing_webplat_20nov.jpg?q=40"
            className="d-block w-100"
            alt="Boy Clothing"
          />
        </div>
        <div className="carousel-item">
          <img
            alt="Men Footwear"
            className="d-block w-100"
            src="https://g.sdlcdn.com/imgs/a/b/c/feedConfig/MenFootwear_webplat_20nov.jpg?q=40"
          />
        </div>
        <div className="carousel-item">
          <img
            alt="Winter Accessories"
            className="d-block w-100"
            src="https://g.sdlcdn.com/imgs/a/b/c/feedConfig/WinterAccessories_webplat_20nov.jpg?q=40"
          />
        </div>
        <div className="carousel-item">
          <img
            alt="Women Clothing"
            className="d-block w-100"
            src="https://g.sdlcdn.com/imgs/a/b/c/feedConfig/WomenClothing_webplat_20nov.jpg?q=40"
          />
        </div>
      </div>
      {/* next and pre button */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleRide"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleRide"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
