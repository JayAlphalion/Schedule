import React from 'react'
import SearchInput from './SearchInput';
import SearchResult from './SearchResult';
import UsualPage from "./UsualPage";
import { useState, useEffect } from 'react';
import { Manager } from 'socket.io-client'; 

let url='http://localhost:9900'
// let url='https://alphalionserver.herokuapp.com'
// let url='http://192.168.1.12:9900/'

const manager=new Manager(url)
const socket = manager.socket("/"); 

const SearchContainer = () => {

    let [realtimedata,setrealtimedata]=useState([]);
    let [realtimetrucks,setrealtimetrucks]=useState([]);
    let [inputleft, setInputLeft] = useState([""]);
    let [inputright, setInputRight] = useState([""]);
    let [realtime,setrealtime]=useState(0);
    const [button,setbutton]=useState("Expand");

    socket.on("disconnect",()=>{
        console.log("disconnect");
        socket.emit("joinclient",{
            id:"hemant"
        })
    })

    socket.on("connect",()=>{
        console.log("connect");

        socket.emit("joinclient",{
            id:"hemant"
        })
    })

    socket.on("SCHDATA",(data)=>{
        
        // console.log("changes in db");
        // console.log(data);
        // console.log("datareal : ",data);
        // let jsondata=JSON.parse(data)
        // console.log("datarealJson : ",jsondata);

        setrealtimedata(data);
        setrealtime((old)=>1-old);
    })

    socket.on("SCHTRUCKDATA",(data)=>{
        // console.log("truck data : ",data);
        console.log("change in db");

        setrealtimetrucks(data);
        setrealtime((old)=>1-old);
    })

    // var [loads, setLoads] = useState([])
    // let [citydata, setCitydata] = useState();
 
    let [data, setData] = useState({ citydata: {}, loads: {},citytrucks:{}, trucks:{} });

    let belongs = async (arr, state) => { 
        let found = false;

        arr.map((item) => { 
            if(item!=''){
            let item1 = item.slice(0, 2);
            if (state == item1) {
                found = true;
            }
        }
        })

        return found;
    }

    // const conditionFilter =  (loads) => {

    //     try{
    //         let filterdata = []; 
    //          loads.map(async (el) =>{
    //             // console.log(el.data.shipper_state," , ",el.data.receiver_state);
    //             if (el.data.shipper_state == null || el.data.shipper_state == undefined || el.data.receiver_state == null || el.data.receiver_state == undefined) return;
    
    //             let left = await belongs(inputleft, el.data.shipper_state);
    //             let right = await belongs(inputright, el.data.receiver_state);
    
    //             if (left &&  right) { 
    //                  filterdata.push(el);
    //             }

    //         })

    //         // console.log("left : ",inputleft);
    //         // console.log("rihgt : ",inputright);
            
    //         let truckfilter=[];
    //           trucksdata.map(async (el)=>{

    //             let found =await belongs(inputleft,el.loadData.receiver_state[0])

    //             if(found)
    //             {
    //                 console.log("state : ",el.loadData.receiver_state[0]);
    //                 truckfilter.push(el);
    //             }

    //         })
      
    //         return filterdata;
    //     }catch(err){
    //         return [];
    //     }
    //  }

     const conditionFilter = async (loads,trucks) => {

        console.log("loads : ",loads);
        console.log("trucks : ",trucks);

        if(loads==undefined || trucks==undefined){ 
            let data={
                loads:{},
                trucks:{}
            }
            return data;
        }

        // return new Promise(async function(resolve,reject){
        try { 
          let filterdata = [];

          await loads.map(async (el) => {
                // console.log(el.data.shipper_state," , ",el.data.receiver_state);
                if (el.data.shipper_state == null || el.data.shipper_state == undefined || el.data.receiver_state == null || el.data.receiver_state == undefined) return;

                let left = await belongs(inputleft, el.data.shipper_state);
                let right = await belongs(inputright, el.data.receiver_state);

                if (left && right) {
                    filterdata.push(el);
                }

            })

          let filtertrucks = [];

          await trucks.map(async (el) => {

            if (el.data==undefined || el.data.truckCurrentState==undefined || el.data.truckCurrentState.receiver_state == undefined) {
                    console.log("undef");
                    return;
            }

            // console.log("re ", el.data.truckCurrentState.receiver_state[0]);

            let belong =await belongs(inputleft, el.data.truckCurrentState.receiver_state[0])

            if (belong) {
                console.log("belongsssssss");
                filtertrucks.push(el);
            }

            })

            // console.log("left : ",inputleft);
            // console.log("rihgt : ",inputright);

            // let truckfilter = [];
            // trucksdata.map(async (el) => {

            //     let found = await belongs(inputleft, el.loadData.receiver_state[0])

            //     if (found) {
            //         console.log("state : ", el.loadData.receiver_state[0]);
            //         truckfilter.push(el);
            //     }

            // })
            console.log("trucks on func : ",filtertrucks);

          let data={
                loads:filterdata,
                trucks:filtertrucks
            }

          return data;

          // resolve(data);

        } 
        catch (err) {

          console.log("this is returning from ");

          let data={
            loads:{},
            trucks:{}
           }

            return data;
            // reject(data);
        }
    //    })
  }

    useEffect(() => {
        console.log("data : for input change");
        // console.log("daa ", data);
        if( data!=undefined && data.loads!=undefined && data.loads.length!=0)
        {
         console.log("data.trucks : ",data.trucks);
        conditionFilter(data.loads,data.trucks).then((condata)=>{
            console.log("task done");
        
        console.log("condata : ",condata);

        if(condata!=undefined) {

        console.log("condata : ");
        console.log("condata : ",condata);

        setData({
            citydata:condata.loads,
            loads:data.loads,
            citytrucks:condata.trucks,
            trucks:data.trucks
        })
        

        }
           })
    }
    }, [inputleft, inputright])

    function Comparator(a, b) {
        if(a.data.PU_date == undefined) return -1;

        if(a.data.PU_date>= b.data.PU_date) return 1;
        else return -1;

    }

    async function sorted(arr) { 
        return new Promise(async function (resolve, reject) {
            if(arr==undefined)
            {
             resolve(arr);
             return;   
            } 
            let aar = await arr.sort(Comparator);
            resolve(aar);
        })
    }

    const update=async ()=>{
        // sorted(realtimedata).then(async (sorteddata) => { 
            await conditionFilter(realtimedata,realtimetrucks).then((condata)=>{  
            // console.log("json : ",json[0]);

          let  JsonObject = JSON.parse(JSON.stringify(condata));

          console.log("JJJ : ",JsonObject);
            console.log("condata : ",condata);
            // console.log("typeof  : ", typeof condata);
            console.log("cacaasdc");
            setData({
                citydata:condata.loads,
                loads:data.loads,
                citytrucks:condata.trucks,
                trucks:data.trucks
            })
        })
        //    })
    }

    useEffect(()=>{
        update()
    },[realtime])

    const fetchData = () => {
        console.log("calling");

        // let LoadsURL="https://alphalionserver.herokuapp.com/getloadsdata"; 
        
        let schdataURL=url+"/getSCHdata";

        fetch(schdataURL,{method:'POST'})
                .then((res) => res.json())
                .then(async (json) => {

                    let loads=json.loads;
                    let trucks=json.trucks;

                    console.log("loadsfet : ",loads);
                    console.log("trucksfet  : ",trucks);
                    
                    let condata= await conditionFilter(loads,trucks)
                    // .then((data)=>{
                    //     condata=data;
                    // }).catch((errdata)=>{
                    //     condata=data;
                    // })
                    

                    // setData({
                    //     citydata:condata,
                    //     loads:loads
                    // })

                    console.log("data.trucks : ",condata.trucks);


                    setData({
                        citydata:condata.loads,
                        loads:loads,
                        citytrucks:condata.trucks,
                        trucks:trucks
                    })

                    // console.log("data : ",data);


                    // let condata = conditionFilter(loads) 
                 })

            // fetch(LoadsURL,{method:'POST'})
            //     .then((res) => res.json())
            //     .then(async (json) => { 
            // //   sorted(json).then(async (sorteddata) => {
            //     // console.log("sorted :",sorteddata)

            //     let condata = conditionFilter(json)  

            //     console.log("data23 : ",condata);

            //     setData({
            //         citydata:condata,
            //         loads:json,
            //     })

            // //    })
            //  })

        let TrucksURL="https://alphalionserver.herokuapp.com/gettruckssdata"; 

        // fetch(TrucksURL,{method:'POST'})
        // .then((res) => res.json())
        // .then(async (json) => { 
        //     console.log("json : ",json);        
        // })


        // socket.emit("joinclient",{id:'hemant'})

        // socket.on("joined",(data)=>{
        //     console.log("socket data :",data);

        //     socket.emit("getdata",{id:'hemant'});
        // })

        // socket.on("setdata",(data)=>{
        //     console.log("sch :",data);
        // })



        // const colRef = collection(db, 'LoadEntries');
        // const unsubListener = onSnapshot(colRef, async snapshot => { 
        //     let arr = [];
        //     await snapshot.docs.map(doc => { 
        //         let obj = {
        //             id: doc.id,
        //             data: doc.data()
        //         };
        //         arr.push(obj)
        //     })
        //   await  sorted(arr).then((data) => {
        //         setLoads(data);
        //     })
        // });

    }

    // useEffect(() => {
    //     let condata = conditionFilter()

    //     // setCitydata(condata);

    //     console.log("changes in database");

    // }, [loads])

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div className="SearchContainerbox">
            <SearchInput setInputLeft={setInputLeft} inputleft={inputleft} inputright={inputright} setInputRight={setInputRight}></SearchInput>
            {/* <div className="expand-all-btn">
              <button>{button}</button>
            </div> */}
            <SearchResult citydata={data.citydata} inputcity={inputleft} trucks={data.citytrucks}></SearchResult>
            {/* <UsualPage loads={data.loads}></UsualPage> */}
        </div>
    );

}

const s= () =>{
    console.log("this is by container");

    return(
        <div>
            this is sample
        </div>
    )
}

export default SearchContainer;