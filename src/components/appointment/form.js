import React, { useState } from "react";
import InterviewerList from "../InterviewerList";
import Button from "../Button";

const Form = (props) => {
  const [name, setName] = useState(props.name || '');
  const [value, setValue] = useState(props.interviewer || null);
  const [error, setError] = useState("");
  
  const reset = () => {
    setName("");
    setValue(null);
  };
  
  const cancel = () => {
    reset();
    props.onCancel();
  };
  
  function validate() {
    setError('');
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    if(value === null){
      setError("Please choose a interviewer");
      return;
    }
    if(props.name){
      props.onSave(name , value, true)
    }else{
      props.onSave(name, value, false);
    }
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            data-testid="student-name-input"
            
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList interviewers={props.interviewers} value={value} onChange={setValue} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button
            danger
            onClick={() => {
              cancel();
            }}
          >
            Cancel
          </Button>
          <Button confirm onClick={()=> validate()}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
};

export default Form;
