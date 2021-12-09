import axios from "axios";
import { useEffect, useState } from "react";

const GET_DAYS_ENDPOINT = 'http://localhost:8001/api/days';
const GET_APPOINTMENT_ENDPOINT = 'http://localhost:8001/api/appointments';
const GET_INTERVIEWS_ENDPOINT = 'http://localhost:8001/api/interviewers';


export default function useApplicationData(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  useEffect(() => {
    Promise.all([axios.get(GET_DAYS_ENDPOINT), axios.get(GET_APPOINTMENT_ENDPOINT), axios.get(GET_INTERVIEWS_ENDPOINT)])
      .then(res => {
        const days = res[0].data;
        const appointments = res[1].data;
        const interviewers = res[2].data;
        setState(prev => ({ ...prev, days, appointments, interviewers }));
      });
  }, []);


  const bookInterview = async (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const res = await axios.put(`http://localhost:8001/api/appointments/${id}`, appointment);
    if (res.status === 204) {
      setState({ ...state, appointments });
      return true;
    }

    return false;
  }

  const cancelInterview = async (id) => {
    const res = await axios.delete(`http://localhost:8001/api/appointments/${id}`);
    if (res.status === 204) {
      var newApps = { ...state.appointments };
      delete newApps[id].interview;
      setState({ ...state, appointments: newApps });

      return true;
    }
    return false;
  }

  const setDay = (newDay) => setState(prev => ({ ...prev, day: newDay }));


  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }

}