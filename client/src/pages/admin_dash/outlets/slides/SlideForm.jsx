import React , { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Axios from 'axios';

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    height: 400px;
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // background-color: #f2f1ec;
    background-image: linear-gradient(
        45deg,
        rgba(61, 61, 61, 0.15) 12.5%,
        transparent 12.5%,
        transparent 25%,
        rgba(61, 61, 61, 0.15) 25%,
        rgba(61, 61, 61, 0.15) 37.5%,
        transparent 37.5%,
        transparent 50%,
        rgba(61, 61, 61, 0.15) 50%,
        rgba(61, 61, 61, 0.15) 62.5%,
        transparent 62.5%,
        transparent 75%,
        rgba(61, 61, 61, 0.15) 75%,
        rgba(61, 61, 61, 0.15) 87.5%,
        transparent 87.5%,
        transparent
    );  
    background-size: 15px 15px; /* Adjust the size to control the pattern */
`;
const TextInputsWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    padding: 1rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width:61.5%;
    background-color: white;
    .input-wrapper {
        border-bottom: 1px solid black;
        width: 80%;
        display: flex;
    }
    input, textarea {
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
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
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
const DragArea = styled.div`
    position: absolute;
    top: 10px;
    left: 10px;
    width: 100px;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
    border: 3px dashed rgba(61, 61, 61, 0.5);
    transition: 0.2s;
    i {
        color: var(--dark);
        font-size: 2rem;
        padding: 0 3px ;
        transition: 0.2s;
    }
    p {
        color: rgba(61, 61, 61, 0.5);
        text-align: center;
        font-weight: 600;
        line-height: 1rem;
        margin: 5px;
        transition: 0.2s;
    }
    &:hover {
        border: 3px dashed var(--dark);
        i {
            color: var(--on-hover);
        }
        p {
            color: var(--dark);
        }
    }
`;

const SlideForm = (props) => {

    const titleRef = useRef(null);
    const descriptionRef = useRef(null);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [titleError, setUsernameError] = useState([]);
    const [descriptionError, setDescriptionError] = useState([]);

    useEffect(() => {

        const getAdmin = async () => {
            try {
                const admin_in_db = await Axios.get('http://localhost:4000/api/slides/one', { params: {name: props.admin}});
                setTitle(admin_in_db.data.name);  
                setDescription(admin_in_db.data._id);             
            } catch (error) {
                console.log(error);
            }
        } 
        if (props.type === 'edit') getAdmin();
    },[])

    const handleFocus = (event) => {
        event.target.removeAttribute('readOnly');
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('form submitted');
        // setUsernameError('');
        // try {
        //     props.type === 'add' ?
        //         await Axios.post('http://localhost:4000/api/admin/create', {name: username, password: password, password_confirm: passwordConfirm}) :
        //         await Axios.put('http://localhost:4000/api/admin/update', {id: adminId, name: username, password: password, password_confirm: passwordConfirm})
        //     props.onSubmit && props.onSubmit();
        //     props.setShowAddForm ? props.setShowAddForm(false) : props.setShowEditForm(false);
        // } catch (error) {
        //     const errors = error.response.data;
        //     errors.hasOwnProperty('name') && setUsernameError(errors.name);
        // }
    };
    const handleClose = () => {
        props.setShowAddForm ? props.setShowAddForm(false) : props.setShowEditForm(false);
    };

    return (
        <Wrapper>
            <TextInputsWrapper>
                {props.type === 'add' ? <h5>Pridėti naują skaidrę</h5> : <h5>Redaguoti skaidrės informaciją</h5>}
                <div className="form-floating input-wrapper">
                    <input 
                        type="text" 
                        className="form-control" 
                        id="title_input_field" 
                        placeholder="Title"
                        autoComplete='off'
                        spellCheck='false'
                        autoCorrect='off'
                        name='title'
                        required
                        readOnly
                        onFocus={handleFocus}
                        ref={titleRef}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}>
                    </input>
                    <label htmlFor="title_input_field">Antraštė</label>
                </div>
                <div className="form-floating input-wrapper">
                    <textarea 
                        className="form-control" 
                        style={{height: "9rem"}}
                        maxLength={200}
                        id="description_input_field" 
                        placeholder="Description"
                        autoComplete='off'
                        spellCheck='false'
                        autoCorrect='off'
                        name='description'
                        required
                        readOnly
                        onFocus={handleFocus}
                        ref={descriptionRef}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}>
                    </textarea>
                    <label htmlFor="description_input_field">Trumpas aprašymas</label>
                </div>
            </TextInputsWrapper>
            <CloseButton className="bi bi-x-circle-fill" onClick={handleClose}></CloseButton>
            <Button type="submit" onClick={handleSubmit}>{props.type === 'edit' ? 'REDAGUOTI' : 'PRIDĖTI'}</Button>
            <DragArea > 
                <i className="bi bi-file-image-fill" ></i>
                <p>Drag your image here</p>
            </DragArea>
        </Wrapper>
    )
}

export default SlideForm
