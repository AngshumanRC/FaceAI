import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import Brain from './brain.png'; 



const Logo=()=>{
	return(
		<div>
		<Tilt className="Tilt br2 shadow-2 ml3" options={{ max : 75 }} style={{ height: 250, width: 250 }} >
        <div className="Tilt-inner ma3"> 
        <img src={Brain} alt="Brain logo" className="pt5"/>
        </div>
        </Tilt>
		</div>
		);
}


export default Logo;