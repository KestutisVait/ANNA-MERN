import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Nav = (props) => {

    const navigate = useNavigate();

    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('Access_token') ?? "Bearer null"
        const validateToken = async () => {
            try {
                const response = await Axios.get('http://localhost:4000/api/admin/authenticate', {
                    headers: {
                        Authorization: token
                    }
                })
                setAuthenticated(true)
            } catch (error) {
                if (error.response.status === 200) {
                    setAuthenticated(true)
                } else {
                    console.log(error)
                }
                            
            }
        }

        validateToken()
    }, [])

    const capitalize = (str) => {
        return str.toUpperCase();
    }

    return (
        <div className="header-main-nav d-flex justify-content-center gap-sm-4 gap-md-4 gap-lg-5 ">
            {props.nav_items.map((item, index) =>
                <div key={index} className="nav-item">{capitalize(item.title)}</div>
                )}
            {authenticated && <div className='nav-item' onClick={() => navigate('/admin')}>ADMIN PANELĖ</div>}
        </div>
    )
}

export default Nav