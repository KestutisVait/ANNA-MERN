import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Axios from 'axios';
import {
    DndContext, 
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {restrictToVerticalAxis} from '@dnd-kit/modifiers';
import Slide from './slideCard';
import AddSlideForm from './SlideForm';

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

function App() {
    const [slides, setSlides] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false)
    const [slideToEdit, setSlideToEdit] = useState(null)

    const getSlides = async () => {
        const slides = await Axios.get('http://localhost:4000/api/slides')
        setSlides(slides.data);
    }
    useEffect(() => { getSlides() }, []);
    // useEffect(() => { 
    //     console.log(slides) 
    // }, [ slides ]);

    const sensors = useSensors(     
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );
    function handleDragEnd(event) {
        const {active, over} = event;
        let slidesCopy = [];
      
        if (active.id !== over.id) {
            setSlides((slides) => {
                const oldIndex = slides.findIndex(slide => slide.id === active.id);
                const newIndex = slides.findIndex(slide => slide.id === over.id);
                slidesCopy = arrayMove(slides, oldIndex, newIndex);
                return arrayMove(slides, oldIndex, newIndex);
            });
            const payload_to_reorder= [];
            for ( let i = 0; i < slidesCopy.length; i++ ) {
                console.log(slidesCopy[i]._id);
                payload_to_reorder.push({ _id: slidesCopy[i]._id, title: slidesCopy[i].title, order_no: i + 1 });

            }
            Axios.put('http://localhost:4000/api/slides/reorder', payload_to_reorder)  
        }
    }
    
    return (
        <Wrapper>
            <h5>Here you can add, delete or edit slides info and order</h5>
            <AddSlideButton onClick={() => setShowAddForm(true)}>
                <p>Pridėti naują skaidrę</p>
                <i className="bi bi-plus-circle" style={{margin: '0 0 0 9px '}}></i>
            </AddSlideButton>
            <p style={{margin: '0'}}>Skaidrės:</p>
            <DndContext 
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToVerticalAxis]}
            >
                <SortableContext 
                    items={slides}
                    strategy={verticalListSortingStrategy}
                >
                    {slides.length > 0 && slides.map(slide=> 
                        <Slide 
                            key={slide.id} 
                            id={slide.id} 
                            slide={slide}
                            setShowEditForm={setShowEditForm}
                            onEdit={setSlideToEdit}
                        />
                    )}
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
    );
}

export default App