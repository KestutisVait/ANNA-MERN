import React, { useEffect, useState, useContext } from 'react';
import Axios from 'axios';
import ArticleCard from './articleCard';
import styled from 'styled-components';
import { ArticleContext } from '../../../../Context';


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
`;

const Navigation = () => {
    
    const { articles, setArticles } = useContext(ArticleContext);
    
    // const [articles, setArticles] = useState([]);
    
    const getArticles = async () => {
        const articles_array = await Axios.get('http://localhost:4000/api/articles');
        setArticles(articles_array.data);
    }
    useEffect(() => {
        getArticles();
    }, []) 
    
    return (
        <Wrapper>
            <h5>Here you can add, delete or edit articles</h5>
            {articles.length > 0 && articles.map((article, index) => (
                <ArticleCard key={index} article={article} onSubmit={() => getArticles() }/>
            ))}
        </Wrapper>
    )
}

export default Navigation
