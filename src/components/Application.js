import React from 'react';
import DayList from './DayList.js';

import 'components/Application.scss'
import Appointment from './Appointment/Appointment'
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from 'helper/selectors.js';
import useApplicationData from 'hooks/useApplicationData.js';



export default function Application(props) {
  const {
    state,
    bookInterview,
    cancelInterview,
    setDay,
  } = useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const appointmentList = dailyAppointments.map(appointment => {

    const interview = getInterview(state, appointment.interview);

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
    );
  });

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
            setDay={setDay}
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
  );
}