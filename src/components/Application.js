import React, {  useState, useEffect } from 'react';
import DayList from './DayList.js';
import axios from "axios";

import 'components/Application.scss'
import Appointment from './Appointment/Appointment'
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from 'helper/selectors.js';



export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [], 
    appointments: {}
    
  }
  );


  useEffect(() => {
    const dayURL = 'http://localhost:8001/api/days';
    const appointmentURL= 'http://localhost:8001/api/appointments';
    const interviewURL = 'http://localhost:8001/api/interviewers';
    Promise.all([axios.get(dayURL), axios.get(appointmentURL), axios.get(interviewURL)])
    .then(res =>{
      const d = res[0].data;
      const a = res[1].data;
      const i = res[2].data;
      setState(prev=> ({...prev, days:d , appointments:a, interviewers: i}));
    });
  }, []);

  async function cancelInterview(id) {
    const res = await axios.delete(`http://localhost:8001/api/appointments/${id}`);
    if(res.status === 204){
      var newApps = {...state.appointments};
      delete newApps[id].interview ;
      setState({...state, appointments: newApps});
     
      return true;
    }
    return false;
  }

  async function bookInterview(id, interview)  {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    
    const res = await axios.put(`http://localhost:8001/api/appointments/${id}`, appointment);
    if(res.status === 204){
      setState({...state, appointments});
      return true;
    }
    return false;
  }

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const appointmentList = dailyAppointments.map(appointment => {

   const interview= getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={getInterviewersForDay(state)}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    )
  })

  return (
    <main className='layout'>
      <section className='sidebar'>
        <img
          className='sidebar--centered'
          src='images/logo.png'
          alt='Interview Scheduler'
        />
        <hr className='sidebar__separator sidebar--centered' />
        <nav className='sidebar__menu'>
          
          <DayList
            days={state.days}
            day={state.day}
            setDay={(newDay)=>setState(prev=> ({...prev, day:newDay}))}
          />
        </nav>
        <img
          className='sidebnewDayar__lhl sidebar--centered'
          src='images/lhl.png'
          alt='Lighthouse Labs'
        />
      </section>
      <section className='schedule'>
        {appointmentList}
        <Appointment key="last" time='5pm' />
      </section>
    </main>
  )
}