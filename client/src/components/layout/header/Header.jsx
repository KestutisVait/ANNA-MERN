import SocMediaBar from "./header_components/Soc_media_bar"
import LogoBanner from "./header_components/LogoBanner"
import Nav from "./header_components/Nav"
import Axios from 'axios'
import { useState, useEffect } from 'react'
import "../../../App.css"

const Header = () => {

    const [ navItems, setNavItems ] = useState([])

    useEffect(() => {
        const getNavItems = async () => {
            const items = await Axios.get('http://localhost:4000/api/nav')
            // const items = await Axios.get('./data/nav_items.json')
            setNavItems(items.data);
        }
        getNavItems()
    },[])

    return (
        <div>
            <SocMediaBar nav_items={navItems}/>
            <LogoBanner />
            <Nav nav_items={navItems}/>
        </div>
    )
}

export default Header