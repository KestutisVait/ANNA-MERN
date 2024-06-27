import React, { useEffect, useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Axios from 'axios';
import { AuthContext } from '../../Context';


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
            background-color: #c6cabd;
        }
    }
`;
const Main = styled.section`
    grid-area: main;
    margin: 0 20px 0 0;
    padding: 10px 20px;
    background-color: #dbdfd3;
    border-left: 1px double var(--dark);
`;
const Button = styled.button`
    background-color: var(--dark);
    font-family: 'Wix Madefor Text', sans-serif;
    font-size: 1.2rem;
    color: white;
    border: 1px solid white;
    padding: 10px;
    cursor: pointer;
    transition: 0.2s;
    &:hover {
        color: var(--on-hover);
    }
`;

const AdminDash = () => {

    const { admin, setAdmin, auth, setAuth } = useContext(AuthContext);

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
                setAdmin(response.data.admin)
                setAuth(true)
            } catch (error) {
                if (error.response.status === 401) {
                    navigate('/login')
                } else {
                    console.log(error)
                }
                            
            }
        }

        if (!auth) validateToken()
    }, [])
    const handleLogOut = async () => {
        const token = localStorage.getItem('Access_token').replace('Bearer ', '')
        try {
            await Axios.post('http://localhost:4000/api/admin/logout', {token: token});
            localStorage.removeItem('Access_token')
            setAuth(false)
            navigate('/')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Wrapper>
            <h1 className='header' style={{display: "flex", justifyContent: "space-between", alignItems: "center", margin: "0 20px"}}>
                Admin dashbord. Wellcome {admin}
                <div>
                    <Button onClick={() => navigate('/')}>Home</Button>
                    <Button onClick={handleLogOut}>Log out <i className="bi bi-box-arrow-right"></i></Button>
                </div>
            </h1>
            <Nav>
                <div onClick={() => navigate('/admin')}>Administracija</div>
                {/* <div onClick={() => navigate('/admin/nav')}>Navigacija</div> */}
                <div onClick={() => navigate('/admin/carousel')}>Skaidrės</div>
            </Nav>
            <Main >
                <Outlet />
            </Main>
        </Wrapper>
    )
}

export default AdminDash
