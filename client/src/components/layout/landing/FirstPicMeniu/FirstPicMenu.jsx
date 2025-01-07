import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MenuItem from './PicMenuItem';
import Axios from 'axios';


const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 20px;
    background-color: var(--light);
    padding: 4%;
    @media only screen and (max-width: 576px) {
        flex-direction: column;
        padding: 5%;
    }

`;


const PicMenu = () => {

    const [ items, setItems] = useState([]);
    
    useEffect(() => {
        const getItems = async () => {
            const events = await Axios.get('https://anna-backend-laxp.onrender.com/api/events');
            // const events = await Axios.get('http://localhost:4000/api/events');
            console.log(events.data);
            setItems(events.data);
        }
        getItems();
    }, []);

    return (
        <Wrapper>
            { items.length > 0 && items.map((item, index) => (
                <MenuItem key={index} data={item} />
            ))}
            {/* <MenuItem number={1}/>
            <MenuItem/>
            <MenuItem/> */}
        </Wrapper>
    )
}

export default PicMenu
