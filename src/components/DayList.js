import React from "react";
import DayListItem from "./DayListItem.js";

export default function DayList(props) {
    const { days, day, setDay } = props;
    const daysArray = [];
    days.map((currentDay) => {
        return daysArray.push(
            <DayListItem
                key={currentDay.id}
                name={currentDay.name}
                spots={currentDay.spots}
                selected={currentDay.name === day}
                setDay={(setDay)}
            />
        )
    })
    return <ul>
    </ul>
}