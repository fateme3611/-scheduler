export function getAppointmentsForDay (state, day){
    
if (!state || !state.appointments){
    return[];
}
    const currentDay = state.days.find(d=>d.name === day);

    if (!currentDay ){
        return [];
    }
    const appointmentList = Object.values(state.appointments)
    .filter( a=> currentDay && currentDay.appointments && currentDay.appointments.includes(a.id))
    return appointmentList;
}
export function getInterview (state, interviwe){
    if(interviwe && interviwe.interviewer > 0){
       return{...interviwe, interviewer: state.interviews[interviwe.interviewer]};
    }
    return null;
}
