import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import Slide from './slideCard';
import AddSlideForm from './SlideForm';
import {DndContext, closestCenter} from '@dnd-kit/core';
import {SortableContext, arrayMove} from '@dnd-kit/sortable';
import {restrictToVerticalAxis} from '@dnd-kit/modifiers';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
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
    const [showEditForm, setShowEditForm] = useState(false)
    const [slideToEdit, setSlideToEdit] = useState(null)

    const getSlides = async () => {
        const slides = await Axios.get('http://localhost:4000/api/slides')
        setSlides(slides.data);
    }
    useEffect(() => { getSlides() }, []);
    // useEffect(() => { console.log(slides); }, [slides]);


    const handleDragEnd = (event) => {
        const {active, over} = event;
        if (over && active.id !== over.id) {
            setSlides((slides) => {
                const oldIndex = slides.findIndex((slide) => slide.order_no === active.id);
                const newIndex = slides.findIndex((slide) => slide.order_no === over.id);
                return arrayMove(slides, oldIndex, newIndex);
            })
        }
    };

    return (
        <Wrapper>
            <h5>Here you can add, delete or edit slides info and order</h5>
            <AddSlideButton onClick={() => setShowAddForm(true)}>
                <p>Pridėti naują skaidrę</p>
                <i className="bi bi-plus-circle" style={{margin: '0 0 0 9px '}}></i>
            </AddSlideButton>
            <p style={{margin: '0'}}>Skaidrės:</p>
            <DndContext
                onDragEnd={handleDragEnd} 
                collisionDetection={closestCenter}
                // onDragOver={(e) => handleDragEnd(e)} 
                modifiers={[restrictToVerticalAxis]}   
                >
                <SortableContext items={slides.map((slide) => slide.order_no)}>
                    {slides.length > 0 && slides.map((slide, index) => (
                        <Slide 
                        key={index} 
                        index={index} 
                        slide={slide} 
                        onEdit={setSlideToEdit} 
                        onDelete={getSlides}
                        setShowEditForm={setShowEditForm}
                        />
                    ))}
                </SortableContext>
            </DndContext>
            {showAddForm && 
                <AddSlideForm 
                    setShowAddForm={setShowAddForm} 
                    type="add" 
                    slide_count={slides.length} 
                    onSubmit={getSlides}
                />
            }
            {showEditForm && 
                <AddSlideForm 
                    setShowEditForm={setShowEditForm} 
                    type="edit" 
                    slide_count={slides.length} 
                    onSubmit={getSlides}
                    slideToEdit={slideToEdit}
                />
            }
        </Wrapper>
    )
}

export default Slides
