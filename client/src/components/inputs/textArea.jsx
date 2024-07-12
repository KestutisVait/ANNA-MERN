import styled from 'styled-components';

const TextInputsWrapper = styled.div`
    display: flex;
    padding: 0 0 1rem;
    margin-top: 1rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // width:61.5%;
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
const Error = styled.div`
    color: red;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const TextInput = (props) => {

    const handleFocus = (event) => {
        event.target.removeAttribute('readOnly');
    };
    function handleValueChange(event) {
        props.value(event.target.value, event.target.name);
    }
    return (
        <TextInputsWrapper>
            <div className="form-floating input-wrapper">
                <textarea 
                    className="form-control" 
                    style={{height: "9rem", minHeight: "9rem"}}
                    maxLength={props.maxLength !== undefined ? props.maxLength : null}
                    id={`${props.name}_input_field`} 
                    placeholder={props.name}
                    autoComplete='off'
                    spellCheck='false'
                    autoCorrect='off'
                    name={props.name}
                    required
                    readOnly
                    onFocus={handleFocus}
                    value={props.inputValue}
                    onChange={handleValueChange}>
                </textarea>
                <label htmlFor="description_input_field">{props.label}</label>
            </div>
            {props.validationErrors && props.validationErrors.map((error, index) => <Error key={index}>{error}</Error>)}

        </TextInputsWrapper>
    )
}

export default TextInput