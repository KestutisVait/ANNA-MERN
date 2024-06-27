import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 300px;
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
`;


const SlideCard = (props) => {

    return (
        <Wrapper key={props.index} data-index={props.index}>
            <p>{props.slide.order_no ? props.slide.order_no : props.index +1}</p>
            <p>{props.slide.title}</p>
        </Wrapper>
    )
}

export default SlideCard
