import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowDown,faCaretDown} from '@fortawesome/free-solid-svg-icons'
import DateLoad from './DateLoad';
import { useState } from 'react';
import React from 'react';


const SingleCityRes = () => {

    const [divDisplay,setDivDisplay]=useState(true);

    return ( 
        <div className="single-city-container">
            <div className="city-heading">WA-CA <FontAwesomeIcon icon={faCaretDown} color="white" className="caret-down icon" /></div>
            <div className="date-basis-filter">

                    {/* PARTCULAR DATE LOAD  */}
                  <DateLoad></DateLoad>
                  <DateLoad></DateLoad>
            </div>
        </div>
     );
     
}
 
export default SingleCityRes;