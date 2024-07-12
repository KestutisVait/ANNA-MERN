import React, { useState } from 'react';
import styled from 'styled-components';
import EditForm from './articleEditForm'

const Wrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    margin: 10px 0;
    background-color: #f2f2f2;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
    transition: 0.2s;
    p {
        margin: 0;
        padding: 0;
        text-align: center;
    }
`;
const Icon = styled.i`
    z-index: 1;
    justify-self: flex-end;
    cursor: pointer;
    position: relative;
    color: ${props => props.$delete ? 'red' : 'var(--dark)'};
    margin: 0 9px;
    transition: 0.2s;
    &:hover {
        color: var(--on-hover);
        &::after {
            content: "${props => props.$delete ? 'Delete' : props.$add ? 'Add' : 'Edit'}";
            display: block;
            position: absolute;
            bottom: -38px;
            left: 50%;
            transform: translateX(-50%);
            color: var(--light);
            font-style: normal;
            font-size: 0.8rem;
            background-color: var(--dark);
            padding: 3px 8px;
            white-space: nowrap; /* Prevent the text from wrapping */
            z-index: 1; /* Ensure the tooltip is above other elements */
        }
    }
`;
const IconWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    position: absolute;
    top: 10px;
    right: 10px;
    
`;

const ArticleCard = (props) => {

    const [showEditForm, setShowEditForm] = useState(false);

    const handleOnSubmit = () => {
        setShowEditForm(false);
        props.onSubmit();
    }

    return (
        <Wrapper>
            <IconWrapper>
                <Icon
                    className="bi bi-pencil-fill"
                    $edit
                    onClick={() => setShowEditForm(!showEditForm)}
                    />
                {/* <Icon
                    className="bi bi-trash3-fill"
                    $delete
                    // onClick={handleClickDelete}
                    /> */}
            </IconWrapper>
            <h3>{props.article.title}</h3>
            <p>{props.article.summary}</p>
            {showEditForm && 
                <EditForm 
                    article_number={props.article.number} 
                    setShowEditForm={setShowEditForm} 
                    onSubmit={handleOnSubmit}
                />
            }
        </Wrapper>
    )
}

export default ArticleCard
