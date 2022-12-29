import { useEffect, useState } from 'react';
import Loading from './Loading'
import React from 'react';

const DateLoad = ({items}) => {

    let dataJSX=[];
    // let data=items;
    // } team={el.team} PU_date={el.PU_date} solo={el.solo} inputcity={el.inputcity} trucks={el.trucksd} />
    
    let{load,team,PU_date,solo,inputcity,trucks}=items;
    
    // console.log("date : ",PU_date);
    console.log("loads  dateload : ",items);
    // console.log("trucks  : ",trucks);
    
    let [loads,setloads]=useState({sloads:{},tloads:{},strucks:{},ttrucks:{}});

    // let [teamloads,setteamloads]=useState([]);

    // console.log("Dateload");

    // console.log("len :",items.length);
    // console.log("el : ",items);

    var render=async ()=>{

      console.log("runnig ");

        if(items!=undefined){

            let sloads=[];
            let tloads=[];

            if(load!=undefined){
          await load.map((el)=>{
            var count = Object.keys(el).length;

            if(count==0)
            {
              console.log("zero");
              return(<></>)
            }else{
              
              console.log("el  : ",el.data.load_type);

                if(el.data.load_type=='Solo'){
                sloads.push(el);
                }else{
                    tloads.push(el);
                }

            }
           }) 
          }
       
            let strucks=[];
            let ttrucks=[];

            if(trucks!=undefined){
              await trucks.map((el)=>{
              var count = Object.keys(el).length;
    
              if(count==0)
              {console.log("zero");
                return(<></>)
              }else{
             console.log("el : ",el);
                  if(el.truck_info!=undefined && el.truck_info.Truck_type!=undefined &&el.truck_info.Truck_type=='Solo'){
                  strucks.push(el);
                  }else{
                      ttrucks.push(el);
                  }
              }
               })
              }

            // if/

          console.log("sstrucks : ",strucks );
          console.log("ttrucks : ",ttrucks);
        
         setloads({
            sloads:sloads,
            tloads:tloads,
            strucks:strucks,
            ttrucks:ttrucks
        })

       }
    }

     useEffect(()=>{
      render()
     },[items])
    
    

  return(
    <div>
    <Loading sololoads={loads.sloads} PU_date={PU_date} teamloads={loads.tloads} inputcity={inputcity} strucks={loads.strucks} ttrucks={loads.ttrucks} />
    </div>
  )
}

export default DateLoad;