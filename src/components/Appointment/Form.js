import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
import React, { useState } from 'react';


export default function Form(props) {
  
    const [name, setName] = useState(props.name || "");
    const [interviewer, setInterviewer] = useState((props.interviewer && props.interviewer.id) || null);
    const reset = () => {
        setName('')
        setInterviewer(null)
    }
    const cancel =() => {
        reset();
        props.onCancel();
    }

    const save=()=>{
        props.onSave(name, interviewer);
    }

    return (
        <main className="appointment__card appointment__card--create">
            <section className="appointment__card-left">
                <form autoComplete="off">
                    <input
                        className="appointment__create-input text--semi-bold"
                        value={name}
                        name="name"
                        type="text"
                        placeholder="Enter Student Name"
                        onChange={event => setName(event.target.value)}

                    />
                </form>
                <InterviewerList onChange={(id)=>setInterviewer(id)} interviewer={interviewer} interviewers={props.interviewers}
                /* your code goes here */
                />
            </section>
            <section className="appointment__card-right">
                <section className="appointment__actions">
                    <Button danger onClick={cancel}>Cancel</Button>
                    <Button disabled={!name || !interviewer} confirm onClick={save}>Save</Button>
                </section>
            </section>
        </main>

    )

}