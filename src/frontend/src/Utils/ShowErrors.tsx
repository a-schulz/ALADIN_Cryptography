import React from 'react';
import {checkErrors} from "./validation-service";

export const ShowErrors = (props) => {

    const listOfErrors = () => {
        const [validations, value] = [props.validations, props.value];
        return checkErrors(value, validations);
    }
    return (
        <div>
            {listOfErrors().map(
                err => <small key={err}>{err}</small>
            )}
        </div>
    );
}