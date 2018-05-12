import React, { Component } from 'react';
import { Carousel } from 'antd';
import MovementPhoto from '../../../images/OneBite Brook bar movements.jpg'
import MovementPhoto2 from '../../../images/Marketing Brooke without onebite logo.jpg'
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";


class Movements extends Component {



    render() {
        var settings = {
            dots: true,
            infinite: true,
            speed: 1000,
            slidesToShow: 1,
            slidesToScroll: 1,
            // autoplay: true,
            // autoplaySpeed: 4000
        };

        return (
            <div>
                <span>Movement</span>
                <Carousel {...settings}>

                    <div><img src={MovementPhoto} alt="Movement 1"  /></div>
                    <div><img src={MovementPhoto2} alt="Movement 2"/></div>

                </Carousel>
            </div>
        );
    }
}

export default Movements;
