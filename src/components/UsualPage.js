import DateLoad from "./DateLoad"; 
import React from 'react';


function getformatdata(today){

  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  const formattedToday = dd + '/' + mm + '/' + yyyy;

  return formattedToday;
}

  function maxDate(loads,trucks){

    var start = new Date();

  let max=getformatdata(start);

  if(loads!=undefined && loads.length!=undefined && loads.length!=0){
    let len=loads.length;

    let d=loads[len-1].data.PU_date;
    
    // console.log("d : ",d);
    if(max<d){
      max=d;
    }
  }

  if(trucks!=undefined && trucks.length!=undefined && trucks.length!=0){
    let len=trucks.length;

    let d=trucks[len-1].data.PU_date;
    
    if(max<d){
      max=d;
    }
  }
  return max;
}

function getFormattedDate(date1) {
  let date=new Date(date1);

  var year = date.getFullYear();

  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : '0' + month;

  var day = date.getDate().toString();
  day = day.length > 1 ? day : '0' + day;
  
  return day + '/' + month + '/' + year;
}

const UsualPage =  ({loads,inputcity,trucks}) => {

  if(loads==undefined && trucks==undefined  ) return (<></>)

  if( loads.length==undefined || trucks.length==undefined )
  return (<></>)
// 
  // console.log("len :",loads.length );

    // console.log("UsualPage : ",loads);
    // console.log("UsualPage trucks : ",trucks);
    // console.log("usualpage type  : ",typeof loads);

    // console.log("trucks : ",trucks);

    let dateloadJSX='';

    let maxdate=maxDate(loads,trucks); 
    
    let maxformatdate=getFormattedDate(maxdate)

    var start = new Date();

    let MainData=[];
    // start.setDate(tomorrow.getDate() + 1);
    
    // console.log("date now : ",getformatdata(start));
    // console.log("maxdate : ",maxformatdate);

    // console.log("start : ",start);

    let st=start;
    // st.setDate(st.getDate()+1);
    // console.log(getformatdata(st));

    let trucki=0;
    let loadi=0;

    let truckdata=[];
    let loaddata=[];

    let loadlen=loads.length;
    let trucklen=trucks.length;

    // console.log("truck len : ",trucklen);
    // console.log("max : ",maxformatdate);
  
      let j=1;



    for(let i=start;getformatdata(i)<=maxformatdate;i.setDate(i.getDate() + 1)){
      let now=getformatdata(i); 

        if(j==30)
          break;
          j++;
  

      let loadsd=[];
      let trucksd=[];
      let team=0;
      let solo=0;
 
      let unassign=0;
      let assign=0;

      while(loadi<loadlen && getFormattedDate(loads[loadi].PU_date)==now){

        // console.log("true1");
        if(loads[loadi].data.load_type=='Team')
        {
          console.log("ewrdsfvdcdlkcsvckdn jdakcs fdjfskv sj");
          team++;
        }else{
          solo++;
        }
        console.log("type : ",loads[loadi].data.load_type);

        loadsd.push(loads[loadi]);
        loadi++;
      }

      console.log("Now : ",now);
      if(trucki<trucklen)
      // console.log("trucks del date : " ,getFormattedDate(trucks[trucki].data.truckCurrentState.DEL_date));
      
      while(trucki<trucklen &&  getFormattedDate(trucks[trucki].data.truckCurrentState.DEL_date)<=now){

        if(getFormattedDate(trucks[trucki].data.truckCurrentState.DEL_date)==now){
        // console.log("true2");
        trucksd.push(trucks[trucki]);
        // trucki++;
        }
        trucki++;
      }

      console.log("load : ",loadsd);
      console.log("truck : ",trucksd);
      console.log("solo : ",solo);
      console.log("team  : ",team);

      MainData.push({
        load:loadsd,
        team:team,
        solo:solo,
        inputcity:inputcity,
        trucks:trucksd,
        PU_date:now
      })


      // let jsx1= {<DateLoad items={loadsd} team={team} PU_date={now} solo={solo} inputcity={inputcity} trucks={trucksd} />}
      // data=[];
      // trucks=[];
      // data.push(obj);
      // olddate=curr;
      // dateloadJSX= ()=>{
      //    return jsx1;
      // }
      // dateloadJSX(jsx);
      // return jsx;

    }

    

    // console.log("date1 : ",datetoday);


    // if(loads!=undefined)
    // console.log("len : ",loads.length);

    // if(loads!=null  &&loads!=undefined && loads.length!=undefined){
    //     var olddate="null";
    //     let data=[];
    //     let team=0;
    //     let solo=0;
    //     let trucks=[];
    //     let i=0;




    //       dateloadJSX= loads.map((item)=>{

    //         let curr=""+item.data.PU_date;

    //         let obj=item.data;

    //         console.log("curr : ",curr," ,old : ",olddate);
    //         if(olddate=="null"){
    //             olddate=curr;

    //             if(item.data.PU_date=='Team') team++;
    //             else solo++;

    //             data.push(obj);
    //         } else if(curr===olddate){
    //             console.log("equal");
    //             data.push(obj);
    //         }else{
 
    //                 // while(olddate==trucksdata[i].loadData.delivery_date)
    //                 // {
    //                 //     trucks.push(trucksdata[i]);
    //                 //     i++;
    //                 // }

    //             // let jsx= (<DateLoad items={data} team={team} solo={solo} inputcity={inputcity}  /> )
    //           data=[];
    //           trucks=[];
    //           data.push(obj);
    //           olddate=curr;
    //           // return jsx;
    //         } 
    //      })

    //     //  if(data.length!=0){
    //     //     dateloadJSX.push(<DateLoad items={data} team={team} solo={solo} inputcity={inputcity}  />)
    //     //       data=[];  
    //     //  }

    // }
    
    if(MainData!=undefined){
     dateloadJSX= MainData.map((el)=>{
      console.log("daaaa : ",el.team);
    
        let jsx1= <DateLoad items={el} />
        return jsx1;
    })
  } 

    return(
        <div className="sechedule-running-load-container">
              {dateloadJSX}
        </div>
    )

    // return ( 
    //     <div className="sechedule-running-load-container">

    //         <div className="north-side-schedule-container">
    //             <div className="city-heading">North-Side Schedule <FontAwesomeIcon icon={faCaretDown} color="white" className="caret-down icon" /></div>
    //             <div className="state-wise-container">
    //                  <div className="state-wise">
    //                     {/* <div className="city-heading inside-north-side">WA-CA <FontAwesomeIcon icon={faCaretDown} color="white" className="caret-down icon" /></div> */}
    //                     <div className="load-list">
    //                     <DateLoad></DateLoad>
                       
    //                     </div>
    //                 </div>
    //                 <div className="state-wise">
    //                     {/* <div className="city-heading inside-north-side">WA-OR <FontAwesomeIcon icon={faCaretDown} color="white" className="caret-down icon" /></div> */}
    //                     <div className="load-list">
    //                     <DateLoad></DateLoad>
                       
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>

    //         <div className="north-side-schedule-container">
    //             <div className="city-heading">North-Side Schedule <FontAwesomeIcon icon={faCaretDown} color="white" className="caret-down icon" /></div>
    //             <div className="state-wise-container">
    //                  <div className="state-wise">
    //                     <div className="city-heading inside-north-side">WA-CA <FontAwesomeIcon icon={faCaretDown} color="white" className="caret-down icon" /></div>
    //                     <div className="load-list">
    //                     <DateLoad></DateLoad>
    //                     <DateLoad></DateLoad>
    //                     </div>
    //                 </div>
    //                 <div className="state-wise">
    //                     <div className="city-heading inside-north-side">WA-OR <FontAwesomeIcon icon={faCaretDown} color="white" className="caret-down icon" /></div>
    //                     <div className="load-list">
    //                     <DateLoad></DateLoad>
    //                     <DateLoad></DateLoad>
    //                     </div>
    //                 </div>
    //             </div>
           
    //         </div>
    //    </div>
    //  );
}
 
export default UsualPage;