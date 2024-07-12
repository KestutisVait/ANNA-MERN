import React , { useState, useEffect } from 'react';
import styled from 'styled-components';
import Axios from 'axios';
import Dropzone from './dropzone'
import TextInput from '../../../../components/inputs/text';
import TextArea from '../../../../components/inputs/textArea';

const Heading = styled.h5`
    color: var(--dark);
    margin: 0;
    padding: 20px 0 5px ;
    text-align: center;
`;
const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${props => props.$backgroundimage
      ? `url(${props.$backgroundimage}) right;`
      : `linear-gradient(
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
        )`};
  background-size: ${({ $backgroundimage }) => ($backgroundimage ? 'cover' : '15px 15px')};
  border: 1px solid rgba(61, 61, 61, 0.15);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;
const TextInputsWrapper = styled.div`
    display: flex;
    padding: 0 0 1rem;
    margin-top: 1rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width:61.5%;
    background-color: white;
`;
const Button = styled.button`
    padding: 0.5rem 2rem; 
    margin: 1rem 0 0;
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
const ClearBgButton = styled.button`
    position: absolute;
    top: 120px;
    left: 10px;
    width: 100px;
    cursor: pointer;
    padding: 5px;
    font-size: 0.8rem;
    color: var(--light);
    background-color:  rgba(61, 61, 61, 0.5);
    border: none;
    transition: 0.2s;
    &:hover {
        background-color:  rgba(61, 61, 61, 0.8);
`;

const SlideForm = (props) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');
    const [image, setImage] = useState({});

    const [titleError, setTitleError] = useState([]);
    const [descriptionError, setDescriptionError] = useState([]);
    const [linkError, setLinkError] = useState([]);

    const [preview, setPreview] = useState(null);

    // useEffect(() => {console.log(preview);},[preview])

    useEffect(() => {
        
        const getSlide = async () => {
            try {
                const slide_in_db = await Axios.get('http://localhost:4000/api/slides/one', { params: {order_no: props.slideToEdit}});
                setTitle(slide_in_db.data.title);  
                setDescription(slide_in_db.data.description);             
                setLink(slide_in_db.data.link);
                setImage(slide_in_db.data.image);   
                setPreview('http://localhost:4000/' + slide_in_db.data.image);          
            } catch (error) {
                console.log(error);
            }
        } 
        if (props.type === 'edit') getSlide();
    },[])



    const handleSubmit = async (event) => {
        event.preventDefault();
        setTitleError('');
        setDescriptionError('');
        setLinkError('');

        const order_no = props.type === 'add ' ? props.slide_count + 1 : props.slideToEdit;
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('link', link);
        formData.append('image', image);
        formData.append('order_no', order_no);
        try {
            props.type === 'add' ?
                await Axios.post('http://localhost:4000/api/slides/add', formData, {headers: {'Content-Type': 'multipart/form-data'}}) :
                await Axios.put('http://localhost:4000/api/slides/update', formData, {headers: {'Content-Type': 'multipart/form-data'}})
            props.onSubmit && props.onSubmit();
            props.setShowAddForm ? props.setShowAddForm(false) : props.setShowEditForm(false);
        } catch (error) {
            console.log(error);
            const errors = error.response.data;
            errors.hasOwnProperty('title') && setTitleError(errors.title);
            errors.hasOwnProperty('description') && setDescriptionError(errors.description);
            errors.hasOwnProperty('link') && setLinkError(errors.link);
        }
    };
    const handleClose = () => {
        props.setShowAddForm ? props.setShowAddForm(false) : props.setShowEditForm(false);
    };
    const handleValueChange = (value, name) => {
        if (name === 'title') setTitle(value);
        else if (name === 'description') setDescription(value);
        else if (name === 'link') setLink(value);
        else setLink(value);
    };
    const handleFileChange = (file, previewUrl) => {
        // console.log(file);
        setImage(file)
        setPreview(previewUrl);
      };

      useEffect(() => {
        return () => {
          if (preview) {
            URL.revokeObjectURL(preview);
          }
        };
      }, [preview]);

      const handleClearBg = () => {
        setPreview(null);
        props.type === 'edit' &&setImage(null);
      };
    

    return (
        <>
            {props.type === 'add' ? <Heading>Pridėti naują skaidrę</Heading> : <Heading>Redaguoti skaidrės informaciją</Heading>}
            <Wrapper $backgroundimage={preview}>
                <TextInputsWrapper>
                    <TextInput
                         label="Antraštė"
                         name="title"
                         value={handleValueChange}
                         inputValue={title}
                         validationErrors={titleError}/>
                    <TextArea 
                        label="Trumpas aprašymas"
                        name="description"
                        value={handleValueChange}
                        inputValue={description}
                        validationErrors={descriptionError}
                        />
                    <TextInput
                         label="Puslapio nuorodos raktažodis"
                         name="link"
                         value={handleValueChange}
                         inputValue={link}
                         validationErrors={linkError}/>
                </TextInputsWrapper>
                <CloseButton className="bi bi-x-circle-fill" onClick={handleClose}></CloseButton>
                <Button type="submit" onClick={handleSubmit}>{props.type === 'edit' ? 'REDAGUOTI' : 'PRIDĖTI'}</Button>
                <Dropzone onFileChange={handleFileChange}/>
                <ClearBgButton onClick={handleClearBg}>Išvalyti foną</ClearBgButton>
            </Wrapper>
        </>
    )
}

export default SlideForm
