import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import TextInput from '../../../../components/inputs/text'; 
import TextArea from '../../../../components/inputs/textArea';
import { ArticleContext } from '../../../../Context';
import Axios from 'axios';

const Wrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    border: 2px dashed var(--light);
    width: 100%;
    padding: 20px;
    margin-top: 20px;
    background-color: white;
    h4 {
        margin: 0;
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
const Button = styled.button`
    padding: 0.5rem 2rem; 
    margin: 1rem auto 0;
    width: fit-content;
    border: none;
    background-color: var(--dark);
    color: white; 
    transition: color 0.3s;
    &:hover {
        color: var(--on-hover);
    }  
`;

const ArticleEditForm = (props) => {
    
    const { articles } = useContext(ArticleContext);
    const article = articles[props.article_number - 1];

    const [title, setTitle] = useState(article.title);
    const [summary, setSummary] = useState(article.summary);
    const [content, setContent] = useState(article.content);
    const [link, setLink] = useState((article.link).replace('/', ''));

    const [titleError, setTitleError] = useState('');
    const [summaryError, setSummaryError] = useState('');
    const [contentError, setContentError] = useState('');
    const [linkError, setLinkError] = useState('');

    const handleValueChange = (value, name) => {
        if (name === 'title') setTitle(value);
        else if (name === 'summary') setSummary(value);
        else if (name === 'content') setContent(value);
        else setLink(value);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        setTitleError('');
        setSummaryError('');
        setContentError('');
        setLinkError('');

        try {
            await Axios.put('http://localhost:4000/api/articles/update', { title, summary, content, link, number: article.number  });
            props.onSubmit && props.onSubmit();
        } catch (error) {
            console.log(error);
            const errors = error.response.data;
            errors.hasOwnProperty('title') && setTitleError(errors.title);
            errors.hasOwnProperty('summary') && setSummaryError(errors.description);
            errors.hasOwnProperty('content') && setContentError(errors.content);
            errors.hasOwnProperty('link') && setLinkError(errors.link);
        }
    };


    



    return (
        <Wrapper>
            <CloseButton 
                className="bi bi-x-circle-fill" 
                onClick={() => props.setShowEditForm(false)}>
            </CloseButton>
            <h4>Redaguoti straipsnį</h4>
            <TextInput
                label="Antraštė"
                name="title"
                value={handleValueChange}
                inputValue={title}
                validationErrors={titleError}
            />
            <TextArea
                label="Trumpas aprašymas"
                name="summary"
                value={handleValueChange}
                inputValue={summary}
                maxLength={200}
                validationErrors={summaryError}
            />
            <TextArea
                label="Pilnas straipsnio textas"
                name="content"
                value={handleValueChange}
                inputValue={content}
                validationErrors={contentError}
            />
            <TextInput
                label="Nuoroda"
                name="link"
                value={handleValueChange}
                inputValue={link}
                validationErrors={linkError}
            />
            <Button type="submit" onClick={handleSubmit}>REDAGUOTI</Button>
        </Wrapper>
    )
}

export default ArticleEditForm
