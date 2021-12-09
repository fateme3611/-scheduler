import React, { Fragment } from 'react';
import "./styles.scss";
import Header from "./Header.js";
import Empty from "./Empty";
import Show from "./Show";
import Confirm from "./Confirm";
import Status from './Status';
import Error from './Error';




export default function Appointment(props) {
 
    const {interview, time, id} = props;
    const {student, interviewer} = interview|| {};
    
    const content = props.interview ? <Show student={student} interviewer={interviewer} onEdit={()=>{}}></Show> : <Empty onAdd={()=>{}}/>;
    return (
        <Fragment>
            <article className="appointment">
                <Header time = {time}/>
               {content}
            </article>
        </Fragment>
    )
}