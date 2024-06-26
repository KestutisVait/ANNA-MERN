import React from 'react';
import { useEffect, useState } from 'react';
import Slide from './Slide';
import styled from 'styled-components';
import Axios from 'axios';

const CarousellWrapper = styled.div`
    .carousel {
        &-control-prev {
            justify-content: flex-start;
            padding: 0 0 0 1%;
        }
        &-control-next {
            justify-content: flex-end;
            padding: 0 1% 0 0;
        }
    }
`;

const Carousel = () => {

    const [slides, setSlides] = useState([]);


    useEffect(() => {
        const getSlides = async () => {
            const slides_array = [];
            const slides = await Axios.get('./data/slides.json');
            // console.log(slides.data);
            const data = slides.data;
            for (let s in data) {
                // console.log(data[s]);
                slides_array.push(data[s]);
            }
            setSlides(slides_array);
        }

        getSlides();
    }, []);


    useEffect(() => {
        const carousel = document.querySelector('#carouselExample');
        new window.bootstrap.Carousel(carousel, {
          interval: 10000, 
          wrap: true
        });
      }, []);

    return (
        <CarousellWrapper>
            <div id="carouselExampleIndicators" className="carousel carousel-dark slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    {slides.length > 0 && slides.map((slide, index) => (
                        <Slide key={index} index={index + 1} data={slide} className={`carousel-item ${index === 0 ? 'active' : ''}`}/>
                    ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </CarousellWrapper>
    )
}

export default Carousel
