import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const [showPassword, setShowPassword] = useState(false);
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }
    const handleFocus = (event) => {
        event.target.removeAttribute('readOnly');
    };
        
    const handleSubmit = async (event) => {
        event.preventDefault();
        const name = usernameRef.current.value;
        const password = passwordRef.current.value;
        setUsernameError('');
        setPasswordError('');
        // console.log(username, password);
        try {
            const login = await Axios.post('http://localhost:4000/api/admin/login', {name, password})
            if (login.data.login) {
                const token = 'Bearer ' + login.data.token
                localStorage.setItem('Access_token', token);
                navigate('/admin')
            } else {
                if (login.data.target === 'username') {
                    setUsernameError(login.data.message);
                } else {
                    setPasswordError(login.data.message);
                }
            }
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <Wrapper>
            <FormWrapper>
                <div className="form-floating input-wrapper">
                    <input 
                        type="text" 
                        className="form-control" 
                        id="user_input_field" 
                        placeholder="Username"
                        // autoComplete='off'
                        // spellCheck='false'
                        // autoCorrect='off'
                        name='username'
                        required
                        readOnly
                        onFocus={handleFocus}
                        ref={usernameRef}>
                    </input>
                    <label htmlFor="user_input_field">Username</label>
                </div>
                {usernameError && <Error>{usernameError}</Error>}
                <div className="form-floating input-wrapper">
                    <input 
                        type={showPassword ? "text" : "password"} 
                        className="form-control" 
                        id="password_input_field" 
                        placeholder="Password"
                        // autoComplete='off'
                        name='password'
                        required
                        readOnly
                        onFocus={handleFocus}
                        ref={passwordRef}>
                    </input>
                    {showPassword ? 
                        <i className="bi bi-eye-slash-fill" onClick={handleShowPassword}></i> 
                        : <i className="bi bi-eye-fill" onClick={handleShowPassword}></i>}
                    <label htmlFor="password_input_field">Password</label>
                </div>
                {passwordError && <Error>{passwordError}</Error>}
                <Button type="submit" onClick={handleSubmit}>Login</Button>
            </FormWrapper>

        </Wrapper>
    )
}

export default Login
