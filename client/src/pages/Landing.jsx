
import Carousel from '../components/layout/landing/Carousel'
import Article from '../components/layout/landing/Article'
import FirstPicMenu from '../components/layout/landing/FirstPicMeniu/FirstPicMenu'

const Landing = () => {

    return (
        <div>
            <Carousel />
            <Article number={1}/>
            <FirstPicMenu />
            <Article number={2}/>
        </div>
    )
}

export default Landing
