import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowDown, faCaretDown, faExpand,faMessage } from '@fortawesome/free-solid-svg-icons'
import React from 'react';

let Available_area = ({ trucks,state }) => {

    console.log("trucks  : ",trucks);

    if(trucks.length==undefined ) return(<>No Trucks</>)
   
    let data=trucks.map((el)=>{
        console.log("state : ",state);

        let{truckBasicDetails,truckCurrentState,truck_info}=el.data;

        console.log("trucks el : ",el);

        state= state.slice(0, 2);

        if(truckCurrentState.receiver_state[0]!=undefined && state!==truckCurrentState.receiver_state[0])
        {
            return(<></>)
        }

        console.log("el : ",truckBasicDetails.Truck_name);

        return(
            <tr>
                <td>{truckBasicDetails.Truck_name}</td>
                <td>{truckCurrentState.current_dispatch!=''?"intransit":''}</td>
                <td>{truckCurrentState.receiver_state[0]}</td>
                <td>{truckCurrentState.DEL_date}</td>
                <td><textarea value={truckCurrentState.Notes} rows='5' col='30'></textarea></td>
                <td><textarea  rows='5' col='30'></textarea></td>
                <td>Talk</td>
            </tr>
        )

    })

    function handleChatIcon()
    {
        console.log("Chat icon handle");
    }

    let data11=(
      <div>NO Trucks</div>
    )


    let data12=(<div className="load-area-table">
    <table>
        <tr>
            <th>Truck</th>  
            <th>Status</th>
            <th>Delivery_State</th>
            <th>ETA</th>
            <th>Truck Notes</th>
            <th>Driver Notes</th>
            <th>Chat</th>
        </tr>
            {data} 
    </table>
</div>)
    

    return (
        <div className="Available-area">
            <div >
                <h3 className="first-row-heading"> Available Area</h3>
            </div>

            { trucks.length==0?data11:data12}

            

        </div>
    )

}

export default Available_area;