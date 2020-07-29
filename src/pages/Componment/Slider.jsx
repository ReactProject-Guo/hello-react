import React, { Component } from 'react';
import Slider from './../../components/Slider'

class SliderPage extends Component {
    state = {
        
    }
    render() { 
        const sliderConfig = {
            autoPlay: false,
            autoplaySpeed: 3000
        }
        return (  
            <div className="main-container magnifier">
                <Slider {...sliderConfig}>
                    <ul>
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                        <li>4</li>
                        <li>5</li> 
                    </ul> 
                </Slider>
            </div>
        );
    }
}

export default SliderPage;