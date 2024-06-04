import "../App.css"

const ShopCart = (props) => {

    return (
        <div className="shop-basket d-flex mt-1 ">{/* <==================to change visibility delete classname 'invisible' */}
            <svg id="krepselis" width="18" height="18" viewBox="0 0 24 24" className='soc-media-logo me-1' style={{marginTop: "1px", cursor: "pointer"}}>
                <path d="M20 7h-4v-3c0-2.209-1.791-4-4-4s-4 1.791-4 4v3h-4l-2 17h20l-2-17zm-11-3c0-1.654 1.346-3 3-3s3 1.346 3 3v3h-6v-3zm-4.751 18l1.529-13h2.222v1.5c0 .276.224.5.5.5s.5-.224.5-.5v-1.5h6v1.5c0 .276.224.5.5.5s.5-.224.5-.5v-1.5h2.222l1.529 13h-15.502z"/>
            </svg>
            <div id="krepselio_sk" style={{verticalAlign: "middle"}}>{props.itemCount ? props.itemCount : 0}</div>
        </div>   
    )
    
}

export default ShopCart