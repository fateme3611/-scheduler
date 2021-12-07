import React from "react";
import "components/DayListItem.scss";



const formatSpots = spots =>{
    if (spots===0) return 'no spots remaining';
    if (spots===1) return '1 spot remaining';
    if (spots>1) return `${spots} spots remaining`;      
}

export default function DayListItem(props) {
   const spots = formatSpots(props.spots);

   let dayClass = "day-list__item";
   if(props.spots === 0){
        dayClass += " day-list__item--full" ;
   }
   if(props.selected){
    dayClass += " day-list__item--selected";
   }
  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{spots}</h3>
    </li>
  );
}