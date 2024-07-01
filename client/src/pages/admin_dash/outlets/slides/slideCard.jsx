import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Axios from 'axios';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: start;
    width: 400px;
    height: 50px;
    margin: 10px;
    padding: 15px;
    background-color: #f2f2f2;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    p {
        margin: 0;
    }
    &:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        background-color: #e6e6e6;
    }
    .title {
        flex-grow: 1;
        margin: 0 0 0 10px;
    }
`;
const Icon = styled.i`
    justify-self: flex-end;
    cursor: pointer;
    position: relative;
    color: ${props => props.$delete ? 'red' : 'var(--dark)'};
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
const ModalWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    margin:0;    
`;



// 
const SlideCard = (props) => {



    const [showModal, setShowModal] = useState(false);
    
    const capitalize = (str) => {
        return str.toUpperCase();
    }
    const handleClickDelete = () => {
        setShowModal(true) 
    };
    const handleDeleteConfirm = async () => {
        console.log('confirm delete');
        setShowModal(false);
        try {
            await Axios.delete(`http://localhost:4000/api/slides/delete`,{data: {_id: props.slide._id, image: props.slide.image}})
        } catch (error) {
            console.log(error);
        }
        props.onDelete()
    };
    const handleClickEdit = () => {
        console.log('edit')
    }

    return (
        <Wrapper key={props.index} data-index={props.index} >
            <p><b>{props.slide.order_no ? props.slide.order_no : props.index +1}</b></p>
            <p className='title'>{capitalize(props.slide.title)}</p>
            <Icon className="bi bi-pencil-fill" $edit onClick={handleClickEdit}></Icon>
            <Icon className="bi bi-trash3-fill" $delete onClick={handleClickDelete}></Icon>
            {showModal && 
                <ModalWrapper>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Ar tikrai norite ištrinti šią skaidrę ?</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Atšaukti</button>
                                <button type="button" className="btn btn-danger" onClick={handleDeleteConfirm}>Ištrinti</button>
                            </div>
                        </div>
                    </div>
                </ModalWrapper>
            }
        </Wrapper>
    )
}

export default SlideCard
