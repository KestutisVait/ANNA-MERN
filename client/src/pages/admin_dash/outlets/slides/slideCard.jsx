import React from 'react';
import styled from 'styled-components';

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


// 
const SlideCard = (props) => {
    
    const capitalize = (str) => {
        return str.toUpperCase();
    }
    const handleDelete = () => {
        console.log('delete')       
    };

    const handleClickEdit = () => {
        console.log('edit')
    }

    return (
        <Wrapper key={props.index} data-index={props.index}>
            <p><b>{props.slide.order_no ? props.slide.order_no : props.index +1}</b></p>
            <p className='title'>{capitalize(props.slide.title)}</p>
            <Icon className="bi bi-pencil-fill" $edit onClick={handleClickEdit}></Icon>
            <Icon className="bi bi-trash3-fill" $delete onClick={handleDelete}></Icon>
        </Wrapper>
    )
}

export default SlideCard
