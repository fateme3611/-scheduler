import React from "react";
import DayListItem from "./DayListItem.js";

export default function DayList(props) {
    const {days, day, setDay} = props;

    return <ul>
        {days.map((eachDay) => <DayListItem setDay={setDay} selected={eachDay.name === day} key={eachDay.id} name={eachDay.name} spots={eachDay.spots} />)}
    
    </ul> 
}