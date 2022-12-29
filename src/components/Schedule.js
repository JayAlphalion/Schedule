import ScheduleNavbar from "./ScheduleNavbar";
import SearchContainer from "./SearchContainer";
import React from 'react';

const Schedule = () => {
    return ( 
        <div className="schedule-container">
              <ScheduleNavbar ></ScheduleNavbar>
              <SearchContainer ></SearchContainer>
        </div>
     );
}
 
export default Schedule;