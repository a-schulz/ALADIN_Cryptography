import {getErrorMsg} from './error-messages';
import {validationConstraints} from "./validationConstraints";

/**
 * Validator for required input fields.
 * @param value
 * @returns {boolean} true if valid.
 */
const requiredValidator = (value: any): boolean => {
    return (!value && value != 0)? false :  value !== '';
}

/**
 * Validator to check for minimum length of strings.
 * @param value
 * @param minlength
 * @returns {boolean} true if valid.
 */
const minLengthValidator = (value: any, minlength: number):boolean => {
    return (!value && value != 0)? false :  !(value.toString().length < minlength);
}

/**
 * Validator to check for maximum length of strings.
 * @param value
 * @param maxlength
 * @returns {boolean} true if valid.
 */
const maxLengthValidator = (value: any, maxlength: number):boolean => {
    return (!value && value != 0)? false : !(value.toString().length > maxlength);
}

/**
 * Validator to check for regular expressions of strings.
 * @param value
 * @param regex
 * @returns {boolean} true if valid.
 */
const patternValidator = (value: any, regex: RegExp): boolean => {
    return (!value && value != 0)? false : regex.test(value);
}

// ToDo: improve by using mapping
/**
 * Checks for validity using the belonging validator.
 * @param value
 * @param err
 * @param errObj
 * @returns {boolean} true if valid
 */

interface ErrorObj {
    requiredLength?: number,
    RegExp?: RegExp
}
const checkValidators = (value: any, err:string, errObj: ErrorObj): boolean => {
    switch (err) {
        case 'required':
            return requiredValidator(value);
        case 'minlength':
            if(errObj.requiredLength) {
                return minLengthValidator(value, errObj.requiredLength);
            }
            return false;
        case 'maxlength':
            if(errObj.requiredLength) {
                return minLengthValidator(value, errObj.requiredLength);
            }
            return false;
        case 'pattern':
            if(errObj.RegExp) {
                return patternValidator(value, errObj.RegExp);
            }
            return false;

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
export const checkErrors = (value: any, validators: validationConstraints): string[] => {
    const errors = Object.keys(validators);
    let errorsOccurred: string[] = [];
    for (let err of errors) {
        if (!checkValidators(value, err, validators[err])) {
            errorsOccurred.push(getErrorMsg(err, validators[err]));
        }
    }
    return errorsOccurred;
}