import {ErrorObj} from "./validation-service";

/**
 * Available error messages.
 */
const errorMessages = {
    required: () => 'This field is required',
    pattern: () => 'Incorrect format',
    minlength: (param: {requiredLength: number}) => `Min chars required is ${param.requiredLength}`,
    maxlength: (param: {requiredLength: number}) => `Max chars allowed is ${param.requiredLength}`,
    min: (param: {requiredValue: number}) => `Input must be at least ${param.requiredValue}`,
    max: (param: {requiredValue: number}) => `Input must not exceed ${param.requiredValue}`,
    step: (param: {requiredStep: number}) => `Input must be a multiple of ${param.requiredStep}`,
};

/**
 * Returns the corresponding error message.
 * @param err
 * @param errObj
 * @returns {string} Error message.
 */
export const getErrorMsg = (err:string, errObj : ErrorObj): string => {
    if(errorMessages[err]) {
        return errorMessages[err](errObj);
    }
    console.log("Error message not found");
    return "";
}