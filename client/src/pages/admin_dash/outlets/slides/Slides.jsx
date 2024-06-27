import React, { useEffect, useState } from 'react';
import Axios from 'axios';

const Slides = () => {

    const [slides, setSlides] = useState([]);

    useEffect(() => {
        const getSlides = async () => {
            const slides = await Axios.get('http://localhost:4000/api/slides')
            console.log(slides.data);
            setSlides(slides.data);
        }

        getSlides()
    }, [])

    return (
        <div>
            <h5>Here you can add, delete or edit slides info and order</h5>
            <p>Skaidrės:</p>
            
        </div>
    )
}

export default Slides
