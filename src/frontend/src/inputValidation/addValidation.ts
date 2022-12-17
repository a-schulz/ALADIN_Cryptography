import {checkErrors} from "./validation-service";
import {validationConstraints} from "./validationConstraints";

// Todo: is it possible to use a mapping here?
/**
 * Adds corresponding attributes to the specified element.
 * @param element
 * @param validation
 */
export const addValidationAttributes = (element: HTMLInputElement, validation: validationConstraints) => {
    if (!element) return;
    const errors = Object.keys(validation);
    errors.forEach((err) => {
        const requiredLength = validation[err];
        switch (err) {
            case 'required':
                element.required = true;
                return;
            case 'minlength':
                element.minLength = requiredLength;
                return;
            case 'maxlength':
                element.maxLength = requiredLength;
                return;
            case 'pattern':
                console.log(validation[err]);
                return;
            default:
                console.log("default")
                return;
        }
    })
}

/**
 * Adds the specific attributes to element so default checks work.
 * @param validation keys should be ids for the elements
 */
export const addValidationAttributesToElements = (validation: validationConstraints): void => {
    const keys = Object.keys(validation);
    keys.every((key) => {
        const element: HTMLInputElement = <HTMLInputElement>document.getElementById(key);
        if (!element) return false;
        addValidationAttributes(element, validation[key]);
        return true;
    })
}

/**
 * Setts CustomValidity on specified elements.
 * @param validation keys should be ids for the elements
 */
export const addCustomValidity = (validation: validationConstraints): void => {
    const ids = Object.keys(validation);
    ids.every((id: string) => {
        const element = <HTMLInputElement>document.getElementById(id);
        if (!element) return false;
        // Setting the errormessage onInvalid
        const addOnInvalid = () => {
            const errors: string[] = checkErrors(element.value, validation[id]);
            element.addEventListener("invalid", () => {
                element.setCustomValidity(errors.join(" and "));
            });
        }
        element.addEventListener("change", () => {
            element.setCustomValidity("");
            // Setting CustomValidity every time the input changes.
            addOnInvalid();
        });
        addOnInvalid()
        return true;
    })
}