import React from "react";
import Button from "components/Button";

export default function Empty(props) {

    return(
        <main className="appointment__card appointment__card--confirm">
  <h1 className="text--semi-bold">Delete the appointment?</h1>
  <section className="appointment__actions">
    <Button onClick danger={props.onCancel}>Cancel{props.onCancel}</Button>
    <Button onClick danger= {props.onConfirm}>Confirm</Button>
  </section>
</main>
    )
}