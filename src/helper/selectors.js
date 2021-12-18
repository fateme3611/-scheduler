export function getAppointmentsForDay(state, day) {

    if (!state || !state.appointments) {
        return [];
    }
    const currentDay = state.days.find(d => d.name === day);

    if (!currentDay) {
        return [];
    }
    const appointmentList = Object.values(state.appointments)
        .filter(a => currentDay && currentDay.appointments && currentDay.appointments.includes(a.id))

    currentDay.spots = appointmentList.filter(x => !x.interview).length;

    return appointmentList;
}

export function getInterview(state, interviwe) {
    if (interviwe && interviwe.interviewer > 0) {
        return { ...interviwe, interviewer: state.interviewers[interviwe.interviewer] };
    }
    return null;
}

export function getInterviewersForDay(state) {
    debugger;
    const currentDay = state.days.find(it => it.name === state.day);

    var res = (currentDay.interviewers || []).reduce((acc, item) => {
        var interviewer = state.interviewers[item];
        if (interviewer) {
            acc.push(interviewer);
        }
        return acc;
    }, [])
    return res;
}