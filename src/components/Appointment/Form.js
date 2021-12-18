import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
import React, { useState } from 'react';


export default function Form(props) {

    const [name, setName] = useState(props.name || "");
    const [interviewer, setInterviewer] = useState((props.interviewer && props.interviewer.id) || null);
    const [errMsg, setErrMsg] = useState("");


    const reset = () => {
        setName('');
        setInterviewer(null);
        setErrMsg('');
    }
    const cancel = () => {
        reset();
        props.onCancel();
    }

    const validate = () => {
        let res = <section className="appointment__validation">
            {!name && <div>Student name cannot be blank <span aria-label="" role="img">👆</span></div>
            }
            {!interviewer &&
                <div>Please select an interviewer <span aria-label="" role="img">👇</span></div>
            }
        </section>
        setErrMsg(res);
    }

    const onSave = () => {

        validate();
        if (name && interviewer) {
            props.onSave(name, interviewer);
        }
    }

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
                        onChange={event => setName(event.target.value)}

                    />
                    {errMsg}
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