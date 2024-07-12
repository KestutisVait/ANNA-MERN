import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Axios from 'axios';

const Wrapper = styled.div`
    height: 300px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: 'Wix Madefor Text', sans-serif;
    h2 {
        letter-spacing: 0.8rem;
        font-size: 1.5rem;
        font-weight: 100;
        margin:0
        text-align: center;
        text-wrap: break-word;
    }
    p {
        font-size: 1.2rem;
        line-height: 1.5rem;
        width: 80%;
        margin: 20px 0 30px;
    }
    @media only screen and (max-width: 576px) {
        height: fit-content;
        h2 {
            font-size: 1.5rem;
            text-align: center;
        }
        p {
            text-align: justify;
        }
    }
`;
const Button = styled.div`
    background-color: var(--dark);
    color : #fff;
    padding: 8px 20px;
    font-family: 'Wix Madefor Text', sans-serif;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.2rem;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
        color: var(--on-hover);
    }
`;

const Article = (props) => {

    const [article, setArticle] = useState({});

    useEffect(() => {

        const getArticle = async () => {
            try {
                const article = await Axios.get(`http://localhost:4000/api/articles/one`, {params: {number: props.number}});
                setArticle(article.data);
            } catch (error) {
                console.log(error);
            }
        }
        getArticle();

    }, [props.number])

    return (
        <Wrapper>
            <h2>{article.title}</h2>
            <p>{article.summary}</p>
            <Button>PLAČIAU</Button> 
        </Wrapper>
    )
}

export default Article
