---
layout: ../../../layouts/Layout.astro
title: "Segmen C & I"
---

<div class="slider-with-nav">
  <!-- Inputs -->
  <input type="radio" name="slider" id="s1" checked>
  <input type="radio" name="slider" id="s2">
  <input type="radio" name="slider" id="s3">
  <input type="radio" name="slider" id="s4">

  <!-- Slides -->
  <div class="slide" id="slide1">
    <img src="/images/layanan/image.png" alt="Solar Panel Image 1">
  </div>
  <div class="slide" id="slide2">
    <img src="/images/layanan/image-1.png" alt="Solar Panel Image 2">
  </div>
  <div class="slide" id="slide3">
    <img src="/images/layanan/image-2.png" alt="Solar Panel Image 3">
  </div>
  <div class="slide" id="slide4">
    <img src="/images/layanan/image-3.png" alt="Solar Panel Image 4">
  </div>

  <!-- Navigation -->
  <div class="nav" id="nav1">
    <label for="s4" class="prev">&lsaquo;</label>
    <label for="s2" class="next">&rsaquo;</label>
  </div>
  <div class="nav" id="nav2">
    <label for="s1" class="prev">&lsaquo;</label>
    <label for="s3" class="next">&rsaquo;</label>
  </div>
  <div class="nav" id="nav3">
    <label for="s2" class="prev">&lsaquo;</label>
    <label for="s4" class="next">&rsaquo;</label>
  </div>
  <div class="nav" id="nav4">
    <label for="s3" class="prev">&lsaquo;</label>
    <label for="s1" class="next">&rsaquo;</label>
  </div>
</div>

<style>
.slider-with-nav {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  margin-bottom: 1.5rem;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}
.slider-with-nav input { display: none; }

.slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  pointer-events: none;
  transition: opacity .5s ease-in-out;
}
.slide img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  display: none;
  justify-content: space-between;
  padding: 0 1rem;
  box-sizing: border-box;
  z-index: 2;
}
.nav label {
  cursor: pointer;
  font-size: 2.5rem;
  color: white;
  text-shadow: 0 1px 2px rgba(0,0,0,0.6);
  background-color: rgba(0,0,0,0.2);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  line-height: 35px;
  text-align: center;
  user-select: none;
  transition: background-color .2s;
}
.nav label:hover {
  background-color: rgba(0,0,0,0.5);
}

/* Show the active slide and its nav */
#s1:checked ~ #slide1, #s1:checked ~ #nav1 { opacity: 1; display: flex; pointer-events: auto; z-index: 1; }
#s2:checked ~ #slide2, #s2:checked ~ #nav2 { opacity: 1; display: flex; pointer-events: auto; z-index: 1; }
#s3:checked ~ #slide3, #s3:checked ~ #nav3 { opacity: 1; display: flex; pointer-events: auto; z-index: 1; }
#s4:checked ~ #slide4, #s4:checked ~ #nav4 { opacity: 1; display: flex; pointer-events: auto; z-index: 1; }
</style>

Welcome to SONUS, a leading provider of EPC Solar PV Systems for corporate and industrial segments.

At SONUS, we offer comprehensive services for designing, engineering, constructing, and maintaining Solar PV Systems. Our team of experienced professionals works closely with clients to understand their unique requirements and design customized solutions that maximize energy savings and reduce costs.

We specialize in providing turnkey solutions that include procurement, construction, and commissioning of Solar PV Systems. Our expertise in project management ensures timely and efficient completion of projects while maintaining the highest safety and quality standards.

We have a proven track record of successfully completing Solar PV System installations for clients in various industries, including manufacturing, healthcare, hospitality, and more. Our solutions are tailored to meet the specific needs of each industry segment, ensuring maximum energy savings and minimal impact on the environment.

At SONUS, we understand the importance of sustainability and take pride in contributing to a greener future. Our Solar PV Systems help reduce carbon footprints, save energy costs, and increase the overall value of a property.

Partner with us for your Solar PV System needs and experience our commitment to quality, innovation, and customer satisfaction.