import React from 'react';


//LINE 31 CONDITIONAL RENDERING IF ALREADY LOAD ASSIGNED SHOW LOAD-TRUCK
let Load_area =   ({loads,state,PU_date}) => {

    // console.log("loads LoadArea : ",loads);

    if(loads.length==undefined || state==undefined) return(<div>No Loads</div>)

    let data=  loads.map((el)=>{

        // console.log("el : ",el);
            let {
Drop_type,Lane,PU_date,PU_time,PU_type,Price,carrier_RC,clientData,customer_address,
customer_email,customer_name,delivery_date,delivery_time,
dispatch,
load_number,
load_status,
load_type,
receiver_address,
receiver_city,
receiver_state,
receiver_zip,
shipper_address,
shipper_city,
shipper_state,
shipper_zip,
            }=el.data;


        state = state.slice(0, 2);

        // console.log("state : ",state);
        // console.log("shipper_state : ",el.data.shipper_state[0]);

        if(state!==el.data.shipper_state[0])
        {
            return(<></>)
        }

     return(
        <tr>
            <td>
                <span>{load_number}</span>
                <button className="assign-btn" >Assign</button>
            </td> 
            <td>{PU_time}</td>
            <td>{shipper_state}</td>
            <td>{receiver_state}</td>
            <td>{PU_type}<tr> {shipper_address} </tr></td>
            <td>{Drop_type} <tr>{receiver_address}</tr> </td>
            <td>{customer_name}</td>
            {/* <td><a href={carrier_RC[0].url} target="_blank"> <img src={img} alt="RC" style={{ border:'1px solid black', width: '40px', height:"40px"}} ></img></a></td> */}
            <td>{Price}</td>
            <td>{customer_email}</td>
        </tr>
     )
})   
    
    return (
        <div className="Load-area"> 
                <h3 className="first-row-heading"> Load Area</h3>
            <div className="load-area-table">
                <table>
                    <tr>
                        <th>Load</th>
                        <th>PU Time</th>
                        <th>shipper state</th>
                        <th>receiver state</th>
                        <th>PU-Type</th>
                        <th>DEL-Type</th>
                        <th>Customer</th>
                        <th>Rate Con.</th>
                        <th>Price</th>
                        <th>Email</th>
                    </tr>
                   {data}
                </table>
            </div>
        </div>
    )

}

export default Load_area