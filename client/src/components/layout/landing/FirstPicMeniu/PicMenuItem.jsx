import React from 'react';
import styled from 'styled-components';
// import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
    border: 1px solid black;
    flex-grow: 1;
    aspect-ratio: 1 / 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media only screen and (max-width: 576px) {
        width: 100%;
    }
`;
const Button = styled.div`
    width: 70%;
    height:25%;
    text-align: center;
    background-color: white;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.3s;
    &:hover {
        background-color: var(--on-hover);
    }

`; 

const MenuItem = (props) => {

    // const navigate = useNavigate();


    return (
        <Wrapper>
            <Button>{ props.data.title}</Button>
            {/* <Button onClick={ () => navigate(props.data.link)}>{ props.data.title}</Button> <------- use when adding links  */}
        </Wrapper>
    )
}

export default MenuItem
