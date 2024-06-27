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
    padding: 5px 15px;
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
const Icon = styled.i`
    cursor: pointer;
    position: relative;
    color: ${props => props.$delete ? 'red' : 'var(--light)'};
    margin: 0 9px;
    transition: 0.2s;
    &:hover {
        color: var(--on-hover);
        &::after {
            content: "${props => props.$delete ? 'Delete' : props.$add ? 'Add' : 'Edit'}";
            display: block;
            position: absolute;
            bottom: -38px;
            left: 50%;
            transform: translateX(-50%);
            color: var(--light);
            font-style: normal;
            font-size: 0.8rem;
            background-color: var(--dark);
            padding: 3px 8px;
            white-space: nowrap; /* Prevent the text from wrapping */
            z-index: 1; /* Ensure the tooltip is above other elements */
        }
    }
`;


const Slides = () => {

    const [slides, setSlides] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false)

    useEffect(() => {
        const getSlides = async () => {
            const slides = await Axios.get('http://localhost:4000/api/slides')
            setSlides(slides.data);
        }

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
                    <Slide key={index} data-index={index} slide={slide}/>
                ))}
            </SlidesWrapper>
            {showAddForm && <AddSlideForm setShowAddForm={setShowAddForm} type="add"/>}
        
        </Wrapper>
    )
}

export default Slides
