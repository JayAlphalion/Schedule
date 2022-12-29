import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightLong, faCirclePlus, faCircleArrowDown } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";
import React from 'react';

const SearchInput = ({ setInputLeft, setInputRight, inputleft, inputright }) => {

    let [empty,setEmpty]=useState();

    function setInputLeft1(ipt) {
        setInputLeft((old) => [...old, ipt]);
    }

    function setInputRight1(ipt) {
        setInputRight((old) => [...old, ipt]);
    }

    let state = [
        "AZ - Arizona",
        "CA-  California",
        "CO-  Colorado",
        "ID-   Idaho",
        "IN-   Indiana",
        "KY- Kentucky",
        "NJ- New Jersey",
        "NV- Nevada",
        "OH- Ohio",
        "OR- Oregon",
        "PA- Pennsylvania",
        "TX-  Texas",
        "UT-  Utah",
        "WA- Washington",
        "SC- South Carolina",
        "MI- Michigan",
        "MA- Massachusetts",
        "NY- New YorK",
        "CT- Connecticut",
        "BC- 	British Columbia",
        "RI- Rhode Island",
        "DE- Delaware",
        "IL- Illinois",
        "WI- Wisconsin",
        "AR- Arkansas",
        "VA- Virginia",
        "MN- Minnesota",
        "GA-Georgia",
        "MD-Maryland"]


    let search1 = (e) => {
        let select1 = e.target.selectedOptions[0].text;
        // e.target.selectedOptions;
        // console.log("press : ",e.target[0]);
        // console.log(select1.toString());
        // console.log('on changes');
        // props.setInput(select1)
        setInputLeft1(select1.toString())
        setEmpty(1-empty)
    }

    let search2 = (e) => {
        let select2 = e.target.selectedOptions[0].text;

        // console.log(select2);
        // console.log('on changes');
        setEmpty(1-empty)
        setInputRight1(select2.toString())
    }

    let removeCityA=async (e)=>{ 

        let removeCity=e.target.id;

        // console.log(e.target);
        // console.log(removeCity);

        let obj=[];

        await inputleft.map((el)=>{
            console.log("el : ",el);

            if(el=='' || el==removeCity)
            {

            } 
            
            else{
                // console.log("push");
                // setInputLeft1(el)
                obj.push(el);
            }
        })
        setInputLeft(obj);
    }

    let removeCityB=async (e)=>{ 

        let removeCity=e.target.id;

        // console.log(e.target);
        // console.log(removeCity);

        let obj=[];

        await inputright.map((el)=>{
            // console.log("el : ",el);
            if(el=='' || el==removeCity)
            {

            } 
            else{
                console.log("push");
                // setInputLeft1(el)
                obj.push(el);
            }
        })
        setInputRight(obj);
    }

    console.log("thid");
    return (
        <div className="search-box">
            <div className="search-input-box">
                {/* IF NEW PU AND DEL LOCATION IS INPUT THIS BOX WILL BE REPEATED */}
                <div className="one-row-input">
                    <div className="search-left">
                        <h3>Enter Location A:</h3>
                        {/* <input /> */}
                        <div className='leftinput'>
                            {inputleft.map(doc => {
                                if(doc=='') return;
                                return (<div className='search-city'>
                                    <span>{doc}</span>
                                    <span className='search-remove-city' onClick={removeCityA} id={doc}>-</span>
                                </div>)
                            })}
                        </div>
                        <select name="PU-loc" onChange={search1} id={empty}>
                            <option selected id='none'></option>
                            {state.map(doc => {
                                return (<option value={doc}>{doc}</option>)
                            })}

                        </select>
                        {/* <FontAwesomeIcon icon={faCircleArrowDown} color="black" className="pluss-inp icon" /> */}
                    </div>
                    <FontAwesomeIcon icon={faRightLong} color="black" className="fff icon" />

                    <div className="search-right">
                        <h3>Enter Location B:</h3>
                        {/* <input type="text" name="DEL-loc" /> */}
                        <div className='rightinput'>
                            {inputright.map(doc => {
                                 if(doc=='') return;
                                return (<div className='search-city'>
                                <span>{doc}</span>
                                <span className='search-remove-city' onClick={removeCityB} id={doc}>-</span>
                            </div>)
                            })}
                        </div>
                        <select name="PU-loc1" onChange={search2} >
                            <option selected id='none' ></option>
                            {state.map(doc => {
                                return (<option>{doc}</option>)
                            })}
                        </select>
                        {/* <FontAwesomeIcon icon={faCircleArrowDown} color="black" className="pluss-inp icon" /> */}
                    </div>
                </div>

                {/* ADDING NEW PU AND DEL BOX  */}
                <div className="add-more">
                    <FontAwesomeIcon icon={faCirclePlus} className="pluss icon" color="black" />
                    <h4>Add New PU and DROP Loc</h4>
                </div>



            </div>


        </div>
    );
}

export default SearchInput;