import '../../../../App.css'
import FacebookIcon from '../../../soc_media_icons/Facebook'
import InstagramIcon from '../../../soc_media_icons/Instagram'
import LinkedInnIcon from '../../../soc_media_icons/LinkedInn' 
import ContribeeIcon from '../../../soc_media_icons/Contribee' 
import HamburgerMenu from './HamburgerNav'
import ShopCart from '../../../ShopCart'
const SocMediaBar = (props) => {

    return (
        <div className="soc-media-bar d-flex justify-content-between p-2" > 
            <div className="soc-media-nav d-flex gap-3 ">
                <FacebookIcon/>
                <InstagramIcon/>
                <LinkedInnIcon/>
                <ContribeeIcon/>
            </div>
            <div className='d-flex'>
                <ShopCart itemCount={0}/>
                <HamburgerMenu nav_items={props.nav_items}/>
            </div>
        </div>
    )
}

export default SocMediaBar