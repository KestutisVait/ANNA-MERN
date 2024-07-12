import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-bottom: 1px solid black;
    background-color: white;
    width: 80%;
    display: flex;
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
        <>
            <Wrapper className="form-floating input-wrapper">
                <input 
                    type="text" 
                    className="form-control" 
                    id={`${props.name}_input_field`} 
                    placeholder={props.inputValue}
                    autoComplete='off'
                    spellCheck='false'
                    autoCorrect='off'
                    name={props.name}
                    required
                    readOnly
                    onFocus={handleFocus}
                    value={props.inputValue}
                    onChange={handleValueChange}>
                </input>
                <label htmlFor={`${props.name}_input_field`}>{props.label}</label>
            </Wrapper>
            {props.validationErrors && props.validationErrors.map((error, index) => <Error key={index}>{error}</Error>)}
        </>
    )
}

export default TextInput