import SingleCityRes from "./SingleCityRes";
import UsualPage from "./UsualPage";
import React from 'react';

const SearchResult = ({citydata,inputcity,trucks}) => {

    let trucksdata=[];

    // console.log("trucks  :",trucks);

    // console.log("search result : ",citydata);

    // console.log("length : ",citydata.length);

    if(citydata==undefined) return(<></>)

    if(citydata.length==0 && trucks.length==0){
        return(
        <div className="empty-search-result-container">
            <h2>Nothing There</h2>
        </div>
        )
    }

    return ( 
        <div className="search-result-container">
            {/* <SingleCityRes></SingleCityRes> */}
            <UsualPage loads={citydata} inputcity={inputcity} trucks={trucks} />
        </div>
     );
}
 
export default SearchResult;