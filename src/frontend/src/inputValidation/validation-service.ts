import {getErrorMsg} from './error-messages';
import {validationConstraints} from "./validationConstraints";

// Bei den Funktionen muss beachtet werden, dass hier alles rein gesteckt werden kann. Deshalb muss innerhalb der
// Funktionen immer geprüft werden, ob der Wert überhaupt existiert und vom richtigen Typ ist.

/**
 * Validator for required input fields.
 * @param value
 * @returns {boolean} true if valid.
 */
const requiredValidator = (value: any): boolean => {
    return (!value && value != 0) ? false : value !== '';
}

/**
 * Validator to check for minimum length of strings.
 * @param value
 * @param minlength
 * @returns {boolean} true if valid.
 */
const minLengthValidator = (value: any, minlength: number): boolean => {
    return (!value && value != 0) ? false : !(value.toString().length < minlength);
}

/**
 * Validator to check for maximum length of strings.
 * @param value
 * @param maxlength
 * @returns {boolean} true if valid.
 */
const maxLengthValidator = (value: any, maxlength: number): boolean => {
    return (!value && value != 0) ? false : !(value.toString().length > maxlength);
}

/**
 * Validator to check for regular expressions of strings.
 * @param value
 * @param regex
 * @returns {boolean} true if valid.
 */
const patternValidator = (value: any, regex: RegExp): boolean => {
    return (!value && value != 0) ? false : regex.test(value);
}

/**
 * Validator to check for minimum value of numbers.
 * @param value
 * @param step
 * @returns {boolean} true if valid.
 */
const stepValidator = (value: any, step: number): boolean => {
    return (!value && value != 0) ? false : Number.parseInt(value) % step == 0;
}

export interface ErrorObj {
    requiredLength?: number,
    requiredValue?: number;
    RegExp?: RegExp,
    requiredStep?: number,
}

/**
 * Mapping validating input and specified validator.
 */
const validatorFunction: { [key: string]: (value: any, errObj: ErrorObj) => boolean } = {
    required: (value, errObj) => {
        return requiredValidator(value);
    },
    minlength: (value, errObj) => {
        if (errObj.requiredLength) {
            return minLengthValidator(value, errObj.requiredLength);
        }
        return false
    },
    maxlength: (value, errObj) => {
        if (errObj.requiredLength) {
            return maxLengthValidator(value, errObj.requiredLength);
        }
        return false
    },
    min: (value, errObj) => {
        if (errObj.requiredValue) {
            return Number.parseInt(value) >= errObj.requiredValue;
        }
        return false;
    },
    max: (value, errObj) => {
        if (errObj.requiredValue) {
            return Number.parseInt(value) <= errObj.requiredValue;
        }
        return false;
    },
    pattern: (value, errObj) => {
        if (errObj.RegExp) {
            return patternValidator(value, errObj.RegExp);
        }
        return false
    },
    step: (value, errObj) => {
        if (errObj.requiredStep) {
            return stepValidator(value, errObj.requiredStep);
        }
        return false;
    }
}

/**
 * Checks the input and returns the resulting error messages.
 * @param value
 * @param validators
 * @returns {string[]} Resulting error messages.
 */
export const checkErrors = (value: any, validators: validationConstraints): string[] => {
    const errors = Object.keys(validators);
    let errorsOccurred: string[] = [];
    for (let err of errors) {
        const functionElement = validatorFunction[err];
        if (functionElement) {
            if (!functionElement(value, validators[err])) {
                errorsOccurred.push(getErrorMsg(err, validators[err]));
            }// else {
            // console.log("No error found");
            //}
        }else{
            console.log('No validatorFunction for error: ', err);
        }
    }
    return errorsOccurred;
}