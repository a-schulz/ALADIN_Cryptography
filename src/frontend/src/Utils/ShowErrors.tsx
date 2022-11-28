import React, {useState} from 'react';
import {checkErrors} from "./validation-service";

export const ShowErrors = (props) => {

    const listOfErrors = () => {
        const [validations, value] = [props.validations, props.value];
        return checkErrors(value, validations);
    }
    if (!props.display) { return null; }
    return (
        <div>
            {listOfErrors().map(
                err => <small className={"validation-error"} key={err}>{err}</small>
            )}
        </div>
    );
}