import React from "react";
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowDown, faCaretDown, faExpand } from '@fortawesome/free-solid-svg-icons'
import Load_area from './Load_area';
import Available_area from './Available_area';



let Loading = ({ sololoads, teamloads, PU_date ,inputcity,strucks,ttrucks }) => {

    let solo = sololoads.length;
    let team = teamloads.length;

    let solotrucks=strucks.length;
    let teamtrucks=ttrucks.length;

    // console.log("strucks : ",strucks);
    // console.log("ttrucks : ",ttrucks);    

    // console.log("da1-2");
    // console.log("PU : ",PU_date);
    // console.log("solo : ",sololoads);
    // console.log(item);

    // let {
    // Drop_type,Lane,PU_date,PU_time,PU_type,Price,carrier_RC,clientData,customer_address,customer_email,customer_name,delivery_date,delivery_time,
    // dispatch,
    // load_number,
    // load_status,
    // load_type,
    // receiver_address,
    // receiver_city,
    // receiver_state,
    // receiver_zip,
    // shipper_address,
    // shipper_city,
    // shipper_state,
    // shipper_zip,
    // }=item;

    // console.log("PU : ",PU_date);

    const allexpand=()=>{
        setDivDisplay(!divDisplay)
        setDivTeamDisplay(!divDisplay)
        setDivSoloDisplay(!divDisplay)
    }

    const [button,setbutton]=useState("Expand");
    const [divDisplay, setDivDisplay] = useState(true);
    const [divTeamDisplay, setDivTeamDisplay] = useState(true);
    const [divSoloDisplay, setDivSoloDisplay] = useState(true);


    let DataJSXTeam;
    let DataJSXSolo;

    
    if(inputcity!=undefined){
  
        DataJSXTeam=inputcity.map((el)=>{
 
        if(el=='') return(<></>)

        else {
        return(
            <div>
            <h3 className="inp_states">{el}</h3>
            <div className="team-desc-details" >
           
            <div className="team-trucks-details">
           <Available_area trucks={ttrucks} state={el}/>
           </div>

           <div className="team-loads-details">
               <Load_area loads={teamloads} PU_date={PU_date} state={el}/>
           </div>
          
           </div>
           </div>
        )
        }
        })

        DataJSXSolo=inputcity.map((el)=>{
            if(el=='') return (<></>);
            else{
                return(
                     <div>
                     <h3 className="inp_states">{el}</h3>
                     <div className="team-desc-details" >

                     <div className="solo-trucks-details" >
                     <Available_area trucks={strucks} state={el}/>
                      </div>

                     <div className="solo-loads-details">
                     <Load_area loads={sololoads} PU_date={PU_date} state={el}/>
                     </div>
                     
                      </div>
                     </div>
                    )
               }
        })                  
} 

return (
        <div>
            <div >
                <div className="date-row" onClick={() => setDivDisplay(!divDisplay)} >
                    <h3>{PU_date}</h3>
                    <div className="mid-date-basis">
                        <h4 className='team-bg'>Team - {team}</h4>
                        <div className="assign-unassign team-assign-unassign">
                            <p>{solotrucks} Solo-Trucks</p>
                        </div>
                    </div>
                    <div className="end-date-basis">
                        <h4 className='solo-bg'>Solo - {solo}</h4>
                        <div className="assign-unassign solo-assign-unassign">
                            <p>{teamtrucks} Team-Trucks</p>
                        </div>
                    </div>

                    {/* ADD FUNCTIONALITY OF EXPAND COLLAPSE */}
                    <FontAwesomeIcon icon={faCircleArrowDown} color="black" className="fff icon" onClick={() => setDivDisplay(!divDisplay)} />
                </div>

                <div className="expand1-box"  style={{ display: divDisplay!= true? 'block': 'none'}} >

                    <p className="date">{PU_date}</p>
                 
                    <div className="team-box">
                   
                        <div className="team-desc-header" onClick={() => setDivTeamDisplay(!divTeamDisplay)}>
                            <div className="team-desc-left">
                                <span className='team-bg'>Team</span>
                                <span>{team} Loads</span>
                            </div>
                        </div>
                        <div className="PU_state_filter">

                        {DataJSXTeam}
                       
                        </div>
                    </div>

                    <div className="solo-box" >
                        <div className="team-desc-header" onClick={() => setDivSoloDisplay(!divSoloDisplay)}>
                            <div className="team-desc-left">
                                <span className='solo-bg'>Solo</span>
                                <span>{solo} Loads</span>
                            </div>
                            {/* ADD FUNCTIONALITY OF EXPAND COLLAPSE */}
                            {/* <FontAwesomeIcon icon={faCircleArrowDown} color="black" className="fff icon" /> */}
                        </div>
                        <div className="PU_state_filter">

                          {DataJSXSolo}

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}




export default Loading;
