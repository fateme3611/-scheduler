import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
    const { interviewers, interviewer, onChange } = props;
    const interviewersArray = [];
    (interviewers || []).map(currentInterviewer => {
        return interviewersArray.push(
            <InterviewerListItem
                key={currentInterviewer.id}
                name={currentInterviewer.name}
                avatar={currentInterviewer.avatar}
                selected={currentInterviewer.id === interviewer}
                setInterviewer={() => onChange(currentInterviewer.id)} />
        );
    });
    return (
        <section className="interviewers">
            <h4 className="interviewers__header text--light">Interviewer</h4>
            <ul className="interviewers__list">
                {interviewersArray}
            </ul>
        </section>
    );

}