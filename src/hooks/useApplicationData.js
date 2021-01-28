import { useState, useEffect } from "react";
import axios from "axios";
import DayList from "components/DayList";
const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  const spotsLeft = (x) => {
    const day = state.days.filter((day) => day.name === state.day);
    const dayObj = day[0];
    const index = state.days.indexOf(dayObj);
    const spots = day[0].spots + x;
    const newDayObj = { ...day[0], spots };
    const daysAry = [...state.days];
    daysAry.splice(index, 1, newDayObj);
    return daysAry;
  };

  const setDay = (day) => setState({ ...state, day });
  const bookInterview = (id, interview, edit) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const newDays = edit ? spotsLeft(0) : spotsLeft(-1);
    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(() => {
        setState({ ...state, appointments, days: newDays });
      });
  };

  const cancelInterview = (id) => {
    const interview = null;
    const appointment = {
      ...state.appointments[id],
      interview,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const newDays = spotsLeft(1);
    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        setState({ ...state, appointments, days: newDays });
      });
  };
  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
