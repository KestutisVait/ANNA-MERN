import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context';
import UsernameInput from '../components/inputs/username';
import PasswordInput from '../components/inputs/password';

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #dbdfd3;
`;
const FormWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 44.6%;
    aspect-ratio: 1.618/1;
    background-color: white;
    .input-wrapper {
        border-bottom: 1px solid black;
        width: 61.8%;
        display: flex;
    }
    input {
        border: none;
        background-color: white;
        &:focus {
           box-shadow: none;
        }
        &[readOnly] {
            background-color: white;
        }
    }
    i { 
        padding: 1rem 0;
        cursor: pointer; 
    }
`;
const Error = styled.div`
    color: red;
`;
const Button = styled.button`
    padding: 0.5rem 2rem; 
    margin: 2rem 0;
    border: none;
    background-color: var(--dark);
    color: white; 
    transition: color 0.3s;
    &:hover {
        color: var(--on-hover);
    }  
`;

const Login = () => {
    const { setAuth, setAdmin } = useContext(AuthContext);
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState([]);
    const [passwordError, setPasswordError] = useState([]);

    const handleFocus = (event) => {
        event.target.removeAttribute('readOnly');
    };
        
    const handleSubmit = async (event) => {
        event.preventDefault();
        setUsernameError('');
        setPasswordError('');
        try {
            const login = await Axios.post('http://localhost:4000/api/admin/login', {name: username, password: password})
            const token = 'Bearer ' + login.data.token
            localStorage.setItem('Access_token', token);
            setAuth(true);
            setAdmin(login.data.name);
            navigate('/admin')
        } catch (error) {
            const errors = error.response.data;
            errors.hasOwnProperty('name') && setUsernameError(errors.name);
            errors.hasOwnProperty('password') && setPasswordError(errors.password);
        }
    }

    return (
        <Wrapper>
            <FormWrapper>
                <UsernameInput value={setUsername} validationErrors={usernameError} />
                <PasswordInput value={setPassword} validationErrors={passwordError} label='Password'/>
                <Button type="submit" onClick={handleSubmit}>Login</Button>
            </FormWrapper>
        </Wrapper>
    )
}

export default Login
