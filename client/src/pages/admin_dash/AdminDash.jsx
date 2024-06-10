import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Axios from 'axios';


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

    useEffect(() => {
        const token = localStorage.getItem('Access_token') ?? "Bearer null"
        const validateToken = async () => {
            try {
                const response = await Axios.get('http://localhost:4000/api/admin/authenticate', {
                    headers: {
                        Authorization: token
                    }
                })
                // if (response.status === 401) {
                    //     console.log('Not authorized');
                    // }
                    // console.log(response.data);
                    // if (response.data) {
                        //     navigate('/admin')
                        // }
            } catch (error) {
                if (error.response.status === 401) {
                    navigate('/login')
                } else {
                    console.log(error)
                }
                            
            }
        }

        validateToken()
    }, [])
    const handleLogOut = async () => {
        const token = localStorage.getItem('Access_token').replace('Bearer ', '')
        try {
            const response = await Axios.post('http://localhost:4000/api/admin/logout', {token: token});
            console.log(response.status);
            localStorage.removeItem('Access_token')
            navigate('/')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Wrapper>
            <h1 className='header'>
                Admin dashbord
                <button onClick={() => navigate('/')}>Home</button>
                <button onClick={handleLogOut}>Log out <i className="bi bi-box-arrow-right"></i></button>
            </h1>
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
