import {getErrorMsg} from './error-messages';
import {validations} from "./validations";

/**
 * Validator for required input fields.
 * @param value
 * @returns {boolean} true if valid.
 */
const requiredValidator = (value: any): boolean => {
    return value === undefined? false :  value !== '';
}

/**
 * Validator to check for minimum length of strings.
 * @param value
 * @param minlength
 * @returns {boolean} true if valid.
 */
const minLengthValidator = (value: any, minlength: number):boolean => {
    return value === undefined? false :  !(value.toString().length < minlength);
}

/**
 * Validator to check for maximum length of strings.
 * @param value
 * @param maxlength
 * @returns {boolean} true if valid.
 */
const maxLengthValidator = (value: any, maxlength: number):boolean => {
    return value === undefined? false : !(value.toString().length > maxlength);
}

/**
 * Validator to check for regular expressions of strings.
 * @param value
 * @param regex
 * @returns {boolean} true if valid.
 */
const patternValidator = (value: any, regex: RegExp): boolean => {
    return value === undefined? false : regex.test(value);
}

/**
 * Checks for validity using the belonging validator.
 * @param value
 * @param err
 * @param errObj
 * @returns {boolean} true if valid
 */
const checkValidators = (value: any, err:string, errObj: { requiredLength: number } | RegExp): boolean => {
    switch (err) {
        case 'required':
            return requiredValidator(value);
        case 'minlength':
            return minLengthValidator(value, errObj.requiredLength);
        case 'maxlength':
            return maxLengthValidator(value, errObj.requiredLength);
        case 'pattern':
            return patternValidator(value, errObj)
        default:
            return false;
    }
}

/**
 * Checks the input and returns the resulting error messages.
 * @param value
 * @param validators
 * @returns {string[]} Resulting error messages.
 */
export const checkErrors = (value: any, validators: validations): string[] => {
    const errors = Object.keys(validators);
    let errorsOccurred: string[] = [];
    for (let err of errors) {
        if (!checkValidators(value, err, validators[err])) {
            errorsOccurred.push(getErrorMsg(err, validators[err]));
        }
    }
    return errorsOccurred;
}