import React, { Fragment } from 'react';
import "./styles.scss";
import Header from "./Header.js";
import Empty from "./Empty";
import Show from "./Show";
import Confirm from "./Confirm";
import Status from './Status';
import Error from './Error';
import { useVisualMode } from 'hooks/useVisualMode';
import Form from './Form';



const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";


export default function Appointment(props) {

    const { interviewers, interview, time, id, bookInterview, cancelInterview } = props;
    const { student, interviewer } = interview || {};

    const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

    function save(name, interviewer) {
        transition(SAVING, true);
        const interviewModel = {
            student: name,
            interviewer
        };
        bookInterview(id, interviewModel).then((res) => {
            if (res) {
                transition(SHOW);
            }
        }).catch((err) => {
            transition(ERROR_SAVE, true);
        });
    }

    function add() {
        transition(CREATE);
    }
    function cancel() {
        back();
    }

    function deleteInterview() {
        transition(CONFIRM);
    }
    function deleteInterviewConfirmed() {
        transition(DELETING, true);
        cancelInterview(id)
            .then((res) => {
                if (res) {
                    transition(EMPTY);
                }
            }).catch((err) => {
                transition(ERROR_DELETE, true);
            });
    }

    function editInterview(params) {
        transition(EDIT);
    }

    return (
        <Fragment>
            <article className="appointment" data-testid="appointment">
                <Header time={time} />

                {mode === EMPTY && <Empty onAdd={add} />}
                {mode === SHOW && (
                    <Show
                        student={student}
                        interviewer={interviewer}
                        onDelete={deleteInterview}
                        onEdit={editInterview}
                    />
                )}
                {mode === CREATE && (
                    <Form
                        // name={"student"}
                        interviewer={interviewer}
                        onCancel={cancel}
                        onSave={save}
                        interviewers={interviewers || []}

                    />
                )}

                {mode === EDIT && (
                    <Form
                        name={student}
                        interviewer={interviewer}
                        onCancel={cancel}
                        onSave={save}
                        interviewers={interviewers || []}

                    />
                )}

                {mode === SAVING && (<Status message="Saving" />)}
                {mode === DELETING && <Status message="Deleting" />}
                {mode === CONFIRM && <Confirm onCancel={cancel} onConfirm={deleteInterviewConfirmed} message="Deleting" />}

                {mode === ERROR_DELETE && (<Error onClose={cancel} message="Coul not cancel appointment" />)}
                {mode === ERROR_SAVE && (<Error onClose={cancel} message="Coul not save appointment" />)}
            </article>
        </Fragment>
    )
}