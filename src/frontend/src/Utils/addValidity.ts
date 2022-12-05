import {validations} from "../frontend/src/Utils/validations";

/**
 * Adds corresponding attributes to the specified element.
 * @param element
 * @param validation
 */
export const addValidationAttributes = (element: HTMLInputElement | null, validation: validations) => {
    if (!element) return;
    const errors = Object.keys(validation);
    errors.forEach((err) => {
        switch (err) {
            case 'required':
                element.required = true;
                // console.log("required")
                return true;
            case 'minlength':
                element.minLength = validation[err].requiredLength;
                // console.log(validation[err].requiredLength);
                return;
            case 'maxlength':
                element.maxLength = validation[err].requiredLength;
                // console.log(validation[err].requiredLength);
                return;
            case 'pattern':
                console.log(validation[err]);
                return;
            default:
                console.log("default")
                return false;
        }
    })
}

export const addValidation = (validation:validations) => {
    const keys = Object.keys(validation);
    keys.forEach((key) => {
        const element : HTMLInputElement | null = document.getElementById(key);
        addValidationAttributes(element,validation[key]);
    })
}