import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import Slide from './slideCard';
import AddSlideForm from './SlideForm';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    `;
const SlidesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    border-top: 1px solid #c6cabd;
    // margin: 15px 0;
`;
const AddSlideButton = styled.div`
    align-self: flex-end;
    width: fit-content;
    padding: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background-color: var(--dark);
    color: white;
    cursor: pointer;
    transition: 0.2s;
    p {
        margin: 0;
        padding: 0;
    }
    &:hover {
        color: var(--on-hover);
    }
`;


const Slides = () => {

    const [slides, setSlides] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false)

    const getSlides = async () => {
        const slides = await Axios.get('http://localhost:4000/api/slides')
        setSlides(slides.data);
    }
    useEffect(() => {
        getSlides()
    }, [])

    return (
        <Wrapper>
            <h5>Here you can add, delete or edit slides info and order</h5>
            <AddSlideButton onClick={() => setShowAddForm(true)}>
                <p>Pridėti naują skaidrę</p>
                <i className="bi bi-plus-circle" style={{margin: '0 0 0 9px '}}></i>
            </AddSlideButton>
            <p style={{margin: '0'}}>Skaidrės:</p>
            <SlidesWrapper>
                {slides.length > 0 && slides.map((slide, index) => (
                    <Slide key={index} data_index={index} slide={slide} onDelete={getSlides}/>
                ))}
            </SlidesWrapper>
            {showAddForm && <AddSlideForm setShowAddForm={setShowAddForm} type="add" slide_count={slides.length} onSubmit={getSlides}/>}
        </Wrapper>
    )
}

export default Slides
