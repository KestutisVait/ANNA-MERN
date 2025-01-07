import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Axios from 'axios';

const Wrapper = styled.div`
    height: 300px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Wix Madefor Text', sans-serif;
    background: url("${(props) => props.$img}") right;
    background-size: cover;
    @media only screen and (max-width: 576px) {
        height: 100vw;
    }
`;
const Info = styled.div`
    width: 44.6%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(5px);
    background-color: rgba(255, 255, 255, 0.7);
    padding: 20px;
    h5 {
        font-size: 1rem;
        font-weight: 600;
        color: var(--dark);
        letter-spacing: 0.2rem;
    }
    p {
        font-size: 0.8rem;
        font-weight: 400;
        color: var(--dark);
    }
    @media only screen and (max-width: 576px) {
        width: 80%;
        height: 80%;
        gap: 10%;
    }
`;
const Button = styled.div`
    background-color: var(--dark);
    color : #fff;
    padding: 8px 20px;
    font-family: 'Wix Madefor Text', sans-serif;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.2rem;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
        color: var(--on-hover);
    }
`;

const Slide = (props) => {

    const image = `https://anna-backend-laxp.onrender.com/${props.data.image}`;
    // const image = `http://localhost:4000/${props.data.image}`;
    // const navigate = useNavigate();

    const capitalize = (str) => {
        return str.toUpperCase();
    }

    return (
        <div className={props.className}>
            <Wrapper $img={image}>
                <Info>
                    <h5>{capitalize(props.data.title)}</h5>
                    <p>{capitalize(props.data.description)}</p>
                    <Button>PLAČIAU</Button> 
                    {/* <Button onClick={ () => navigate(props.data.link)}>PLAČIAU</Button> <------- use when adding links  */}
                </Info>
            </Wrapper>
        </div>
    )
}

export default Slide
