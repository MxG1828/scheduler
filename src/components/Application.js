import React from "react";
import "components/Application.scss";
import "./appointment/style.scss";

import Appointment from "./appointment/index";
import DayList from "components/DayList";
import { findAllByLabelText } from "@testing-library/react";
import getAppointmentsForDay from "../helper/selectors";
import {getInterview} from "../helper/selectors";
import {getInterviewersForDay} from "../helper/selectors"
import useApplicationData from "../hooks/useApplicationData"

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  } = useApplicationData();
  
  
  const dailyAppointments = getAppointmentsForDay({days:state.days, appointments:state.appointments},state.day);
  const dailyInterviewers = getInterviewersForDay({days:state.days, interviewers: state.interviewers},state.day);
  const Schedule = dailyAppointments.map((appointment) => { 
    const interview = getInterview(state, appointment.interview);
  
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={(day) => setDay(day)}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {Schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
