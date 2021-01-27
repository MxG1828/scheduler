import React from "react";
import Header from "./header";
import Show from "./show";
import Empty from "./empty";
import Form from "./form";
import useVisualMode from "../../hooks/useVisualMode";
import Status from "./status";
import Confirm from "./confirm";
import Error from "./error";


const CREATE = "CREATE";
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const SAVE = "SAVE";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_DELETE = "ERROR_DELETE"
const ERROR_SAVE= "ERROR_SAVE"
const Appointment = (props) => {
  const { mode, transition, back } = useVisualMode(
    !props.interview || !props.interview.student || !props.interview.interviewer? EMPTY : SHOW
  );
  
  const save = (name, interviewer, edit) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVE);
    props.bookInterview(props.id, interview, edit)
    .then(()=>transition(SHOW))
    .catch(()=>transition(ERROR_SAVE,true))
  };

  const remove = () => {
    transition(DELETE,true)
    props.cancelInterview(props.id)
    .then(()=>{
      transition(EMPTY)
    }).catch(()=>transition(ERROR_DELETE,true))
  };
  


  return (
    <article data-testid="appointment" className="appointment">
      <Header time={props.time} />
      {mode === ERROR_SAVE && <Error onClose={()=>back()} message={"Could not save appointment."}/>}
      {mode === ERROR_DELETE && <Error onClose={()=>back()} message={"Could not delete appointment."} />}
      {mode === CONFIRM && <Confirm onCancel={()=>back()} onConfirm={()=>remove()} message={"Are you sure you would like to delete?"} />}
      {mode === DELETE && <Status message="Deleting" />}
      {mode === SAVE && <Status message="Saving"/>}
      {mode === EMPTY && <Empty onAdd={() => transition("CREATE")} />}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} onSave={save}/>}
      {mode === EDIT && <Form name={props.interview.student} interviewer={props.interview.interviewer.id} interviewers={props.interviewers} onCancel={back} onSave={save}/>}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete = {()=>transition(CONFIRM)}
          onEdit = {()=>transition(EDIT)}
        />
      )}
    </article>
  );
};

export default Appointment;
