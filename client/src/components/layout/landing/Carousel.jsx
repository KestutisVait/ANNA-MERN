import React from 'react';
import { useEffect, useState} from 'react';
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
            const slides = await Axios.get('http://localhost:4000/api/slides');
            console.log(slides.data);
            setSlides(slides.data);
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
                    {slides.length > 0 && slides.map((slide, index) => (
                    <button
                        key={index}
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to={index}
                        className={index === 0 ? "active" : ""}
                        aria-current={index === 0 ? "true" : "false"}
                        aria-label={`Slide ${index + 1}`}
                    ></button>
                    ))}
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
