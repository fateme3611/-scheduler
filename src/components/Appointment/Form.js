import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
import React, { useState } from 'react';


export default function Form(props) {

    const [name, setName] = useState(props.name || "");
    const [interviewer, setInterviewer] = useState((props.interviewer && props.interviewer.id) || null);
    const [canContinue, setCanContinue] = useState(true);
    const reset = () => {
        setName('');

        setInterviewer(null)
    }
    const cancel = () => {
        reset();
        props.onCancel();
    }

    const onSave = () => {
        setCanContinue(name && interviewer);
        if (name && interviewer) {
            props.onSave(name, interviewer);
        }
    }

    const noStudentErr = canContinue ? "" : "student name cannot be blank";

    return (
        <main className="appointment__card appointment__card--create">
            <section className="appointment__card-left">
                <form autoComplete="off">
                    <input
                        className="appointment__create-input text--semi-bold"
                        data-testid="student-name-input"
                        value={name}
                        name="name"
                        type="text"
                        placeholder="Enter Student Name"
                        onChange={event => { setName(event.target.value); setCanContinue(true); }}

                    />
                    {!name &&
                        <section className="appointment__validation">{noStudentErr}</section>
                    }
                </form>
                <InterviewerList onChange={(id) => setInterviewer(id)} interviewer={interviewer} interviewers={props.interviewers}
                /* your code goes here */
                />
            </section>
            <section className="appointment__card-right">
                <section className="appointment__actions">
                    <Button danger onClick={cancel}>Cancel</Button>
                    <Button confirm onClick={onSave}><>Save</></Button>
                </section>
            </section>
        </main>

    )

}