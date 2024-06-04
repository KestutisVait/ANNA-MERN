

const HamburgerNav = (props) => {

    const capitalize = (str) => {
        return str.toUpperCase();
    }

    return (
        <div className="hamburger-nav d-flex justify-content-center gap-5 ms-3">
            <div type="button" width="30px" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop" >
            {/* <div type="button" width="30px" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" > */}
                <svg height="30px" viewBox="0 0 24 24" fill="#ffffff">
                    <path d="M4 17H20M4 12H20M4 7H20" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>  
            </div>
            <div className="offcanvas offcanvas-top " tabIndex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
            {/* <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel"> */}
                <div className="offcanvas-body d-flex justify-content-end">
                    <div className="col-11 d-flex flex-column align-items-center pe-1">
                        {props.nav_items.map((item, index) => 
                            <div key={index} className="hamburger-nav-item  d-flex flex-column align-items-center">
                                {capitalize(item.title)}
                            </div>)}
                    </div>
                    <button type="button" className="btn-close text-reset col-1" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
            </div>

        </div>
    )
    
}

export default HamburgerNav
