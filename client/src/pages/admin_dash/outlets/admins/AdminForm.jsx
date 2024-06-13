import React , { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Axios from 'axios';

const Wrapper = styled.div`
    width: 70%;
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const FormWrapper = styled.div`
    position: relative;
    display: flex;
    padding: 1rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
const Button = styled.button`
    padding: 0.5rem 2rem; 
    margin: 2rem 0 1rem ;
    border: none;
    background-color: var(--dark);
    color: white; 
    transition: color 0.3s;
    &:hover {
        color: var(--on-hover);
    }  
`;
const CloseButton = styled.i`
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    padding: 8px !important;
    color: red;
    transition: color 0.2s;
    &:hover {
        color: var(--on-hover);
    }
`;
const Error = styled.div`
    color: red;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const AdminForm = (props) => {

    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const passwordConfirmRef = useRef(null);

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    const [username, setUsername] = useState('');
    const [adminId, setAdminId] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const [usernameError, setUsernameError] = useState([]);
    const [passwordError, setPasswordError] = useState([]); 
    const [passwordsconfirmError, setPasswordsconfirmError] = useState([]);

    useEffect(() => {

        const getAdmin = async () => {
            try {
                const admin_in_db = await Axios.get('http://localhost:4000/api/admin/one', { params: {name: props.admin}});
                setUsername(admin_in_db.data.name);  
                setAdminId(admin_in_db.data._id);             
            } catch (error) {
                console.log(error);
            }
        } 
        if (props.type === 'edit') getAdmin();
    },[])

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }
    const handleShowPasswordConfirm = () => {
        setShowPasswordConfirm(!showPasswordConfirm);
    }
    const handleFocus = (event) => {
        event.target.removeAttribute('readOnly');
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        setUsernameError('');
        setPasswordError('');
        setPasswordsconfirmError('');
        try {
            props.type === 'add' ?
                await Axios.post('http://localhost:4000/api/admin/create', {name: username, password: password, password_confirm: passwordConfirm}) :
                await Axios.put('http://localhost:4000/api/admin/update', {id: adminId, name: username, password: password, password_confirm: passwordConfirm})
            props.onSubmit && props.onSubmit();
            props.setShowAddForm ? props.setShowAddForm(false) : props.setShowEditForm(false);
        } catch (error) {
            const errors = error.response.data;
            errors.hasOwnProperty('name') && setUsernameError(errors.name);
            errors.hasOwnProperty('password') && setPasswordError(errors.password);
            errors.hasOwnProperty('password_confirm') && setPasswordsconfirmError(errors.password_confirm);
        }
    };
    const handleClose = () => {
        props.setShowAddForm ? props.setShowAddForm(false) : props.setShowEditForm(false);
    };

    return (
        <Wrapper>
            <FormWrapper>
                {props.type === 'add' ? <h5>Pridėti naują administratorių</h5> : <h5>Redaguoti administratoriaus duomenis</h5>}
                <div className="form-floating input-wrapper">
                    <input 
                        type="text" 
                        className="form-control" 
                        id="user_input_field" 
                        placeholder="Username"
                        autoComplete='off'
                        spellCheck='false'
                        autoCorrect='off'
                        name='username'
                        required
                        readOnly
                        onFocus={handleFocus}
                        ref={usernameRef}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}>
                    </input>
                    <label htmlFor="user_input_field">Username</label>
                </div>
                {usernameError.length > 0 && usernameError.map((error, index) => <Error key={index}>{error}</Error>)}
                <div className="form-floating input-wrapper">
                    <input 
                        type={showPassword ? "text" : "password"} 
                        className="form-control" 
                        id="password_input_field" 
                        placeholder="Password"
                        autoComplete='off'
                        name='password'
                        required
                        readOnly
                        onFocus={handleFocus}
                        ref={passwordRef}
                        onChange={(e) => setPassword(e.target.value)}>
                    </input>
                    {showPassword ? 
                        <i className="bi bi-eye-slash-fill" onClick={handleShowPassword}></i> 
                        : <i className="bi bi-eye-fill" onClick={handleShowPassword}></i>}
                    <label htmlFor="password_input_field">Password</label>
                </div>
                {passwordError.length > 0  && passwordError.map((error, index) => <Error key={index}>{error}</Error>)}
                <div className="form-floating input-wrapper">
                    <input 
                        type={showPasswordConfirm ? "text" : "password"} 
                        className="form-control" 
                        id="password_confirm_input_field" 
                        placeholder="Confirm Password"
                        autoComplete='off'
                        name='password_confirm'
                        required
                        readOnly
                        onFocus={handleFocus}
                        ref={passwordConfirmRef}
                        onChange={(e) => setPasswordConfirm(e.target.value)}>
                    </input>
                    {showPasswordConfirm ? 
                        <i className="bi bi-eye-slash-fill" onClick={handleShowPasswordConfirm}></i> 
                        : <i className="bi bi-eye-fill" onClick={handleShowPasswordConfirm}></i>}
                    <label htmlFor="password_confirm_input_field"> Confirm Password</label>
                </div>
                {passwordsconfirmError && <Error>{passwordsconfirmError}</Error>}
                <Button type="submit" onClick={handleSubmit}>{props.type === 'edit' ? 'REDAGUOTI' : 'PRIDĖTI'}</Button>
                <CloseButton className="bi bi-x-circle-fill" onClick={handleClose}></CloseButton>
            </FormWrapper>
        </Wrapper>
    )
}

export default AdminForm
