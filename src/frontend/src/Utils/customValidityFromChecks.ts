import {checkErrors} from './validation-service';
import {validations} from "./validations";

export const customValidityFromChecks = (value: any, validations: validations): string => {
    // console.log(value, validations)
    const errors: string[]= checkErrors(value, validations);
    // console.log(errors);
    return errors.join(" and ");
}

