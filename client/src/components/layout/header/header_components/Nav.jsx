import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../../Context'

const Nav = (props) => {

    const navigate = useNavigate();

    const { auth } = useContext(AuthContext);

    const capitalize = (str) => {
        return str.toUpperCase();
    }

    return (
        <div className="header-main-nav d-flex justify-content-center gap-sm-4 gap-md-4 gap-lg-5 ">
            {props.nav_items.map((item, index) =>
                <div key={index} className="nav-item">{capitalize(item.title)}</div>
                )}
            {auth && <div className='nav-item' onClick={() => navigate('/admin')}>ADMIN PANELĖ</div>}
        </div>
    )
}

export default Nav