import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-columns: 20% 80%;
    grid-template-rows: 10% 90%;
    grid-template-areas: 
        "header header"
        "nav main"
    ;
    .header {
        grid-area: header;
    }
`;
const Nav = styled.section`
    grid-area: nav;
    div {
        background-color: #dbdfd3;
        padding: 10px;
        text-align: center;
        font-weight: 600;
        font-size: 1.2rem;
        transition: 0.2s;
        cursor: pointer;
        &:hover {
            background-color:#c6cabd;
        }
    }
`;
const Main = styled.section`
    grid-area: main;
    margin: 0 20px;
    background-color: #dbdfd3;
`;


const Login = () => {

    const navigate = useNavigate();

    return (
        <Wrapper>
            <h1 className='header'>Admin dashbord</h1>
            <Nav>
                <div onClick={() => navigate('/admin/nav')}>Navigacija</div>
                <div onClick={() => navigate('/admin/carousel')}>Skaidrės</div>
            </Nav>
            <Main >
                <Outlet />
            </Main>
        </Wrapper>
    )
}

export default Login
