/**
 * Available error messages.
 */
const errorMessages = {
    required: () => 'This field is required',
    pattern: () => 'Incorrect format',
    minlength: (param: {requiredLength: number}) => `Min chars required is ${param.requiredLength}`,
    maxlength: (param: {requiredLength: number}) => `Max chars allowed is ${param.requiredLength}`
};

/**
 * Returns the corresponding error message.
 * @param err
 * @param errObj
 * @returns {string} Error message.
 */
export const getErrorMsg = (err:string, errObj : {requiredLength: number}): string => {
    return errorMessages[err](errObj);
}