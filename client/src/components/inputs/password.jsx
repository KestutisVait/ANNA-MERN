import { useState } from 'react'
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 61.8%;
    font-family: 'Wix Madefor Text', sans-serif;
    i {
        cursor: pointer;
        padding: 0;
        }
    input {
        font-family: 'Wix Madefor Text', sans-serif;
            
    }

`;
const PasswordInput = (props) => {
    const [type, setType] = useState("password")
    function changeType() {
        setType(type === "password" ? "text" : "password")
    }
    function handleValueChange(e) {
        props.value(e.target.value)
    }
    return (
        <Wrapper className="d-flex flex-column ">
            <div className="form-floating w-100 mx-auto d-flex border border-top-0 border-end-0 border-start-0 rounded-0 mb-1">
                <input 
                    type={type} 
                    className="form-control form-control-sm border-0 px-0 pb-0 fs-5" 
                    id={props.id} 
                    onChange={handleValueChange}
                    placeholder='Enter your password'
                    >                       
                </input>
                <label className="ps-0" htmlFor={props.id}><i className="bi bi-key"></i> {props.label}</label>
                {type === "password" && <i className="bi bi-eye mt-4" onClick={changeType} ></i>}
                {type === "text" && <i className="bi bi-eye-slash mt-4" onClick={changeType} ></i>}
            </div>
            {props.validationErrors && props.validationErrors.map(
                (error, index) => <p key={index} className="form-error  text-danger mb-0">{error}</p>
            )}
        </Wrapper>
    )
}

export default PasswordInput