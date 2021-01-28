export const getAppointmentsForDay = (state, day) => {
  let today = state.days.filter((day1) => day1.name === day);
  let ids = today[0] ? today[0].appointments : [];
  let array = [];
  ids.forEach((id) => {
    array.push(state.appointments[id]);
  });
  return array;
};

export const getInterviewersForDay = (state, day) => {
  let today = state.days.filter((day1) => day1.name === day);
  let ids = today[0] ? today[0].interviewers : [];
  let array = [];
  ids.forEach((id) => {
    array.push(state.interviewers[id]);
  });
  return array;
};

export const getInterview = (state, interview) => {
  if (interview) {
    const id = interview.interviewer;
    const data = { ...interview, interviewer: state.interviewers[id] };
    return data;
  } else {
    return null;
  }
};

export default getAppointmentsForDay;
