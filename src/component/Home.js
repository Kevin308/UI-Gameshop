import React, {Component} from 'react';
import Homescreen from './Homescreen';
import { Link } from 'react-router-dom';

class home extends Component {
    render() {
        return (
            <div>
                <Homescreen />
                <div className="produkitem col-6" >
                    <Link to='/PS4Game'>
                    <img src="https://dist.3doid.com/d5847/preview.jpg" alt="ps4" />
                    </Link>
                    <div>
                    <h4>Playstation 4</h4>
                    </div>  
                </div>
                <div className="produkitem col-6" >
                    <Link to='/SwitchGame'>
                    <img src="https://www.jbhifi.com.au/FileLibrary/ProductResources/Images/204506-L-LO.jpg" alt="nsw" />
                    </Link>
                    <div>
                    <h4>Nintendo Switch</h4>
                    </div>  
                </div>            
            </div>
        )
    }
}

export default home;