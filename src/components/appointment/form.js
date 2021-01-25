import React, { useState } from "react";
import InterviewerList from "../InterviewerList";
import Button from "../Button";

const Form = (props) => {
  const [name, setName] = useState(props.name || '');
  const [value, setValue] = useState(props.interviewer || null);
  const reset = () => {
    setName("");
    setValue(null);
  };
  const cancel = () => {
    reset();
    props.onCancel();
  };
  
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
            /*
          This must be a controlled component
        */
          />
        </form>
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
          <Button confirm onClick={()=> props.onSave(name,value)}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
};

export default Form;
