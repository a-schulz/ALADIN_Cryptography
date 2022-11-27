import {getErrorMsg} from './error-messages';

/**
 * retruns true if value is valid
 * @param value
 * @returns {boolean}
 */

const requiredValidator = (value) => {
    return value === undefined? false :  value !== '';
}

const minLengthValidator = (value, minlength) => {
    return value === undefined? false :  !(value.length < minlength);
}

const maxLengthValidator = (value, maxlength) => {
    return value === undefined? false : !(value.length > maxlength);
}

const patternValidator = (value, regex) => {
    return value === undefined? false : regex.test(value);
}

const checkValidators = (value, err, errObj) => {
    switch (err) {
        case 'required':
            return requiredValidator(value);
        case 'minlength':
            return minLengthValidator(value, errObj.requiredLength);
        case 'maxlength':
            return maxLengthValidator(value, errObj.requiredLength);
        case 'pattern':
            return patternValidator(value, errObj)
    }
}

export const checkErrors = (value, validators) => {
    const errors = Object.keys(validators);
    let errorsOccured = [];
    for (let err of errors) {
        if (!checkValidators(value, err, validators[err])) {
            errorsOccured.push(getErrorMsg(err, validators[err]));
        }
    }
    return errorsOccured;
}