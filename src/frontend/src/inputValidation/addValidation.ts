import {checkErrors} from "./validation-service";
import {validationConstraints} from "./validationConstraints";

/**
 * Attribute mapping returning function, that adds the corresponding attribute to HTMLElement.
 */
const validationAttributes: { [key: string]: (el: HTMLInputElement, val: any) => void } = {
    required: (el, val) => { el.required = val; },
    minlength: (el, val) => { el.minLength = val.requiredLength; },
    maxlength: (el, val) => { el.maxLength = val.requiredLength; },
    min: (el, val) => { el.min = val.requiredValue; },
    max: (el, val) => { el.max = val.requiredValue; },
    pattern: (el, val) => { console.log(val); },
    step: (el, val) => { el.step = val.requiredStep; },
};

/**
 * Adds the specific attributes to element so default checks work.
 * @param validation keys should be ids for the elements
 */
export const addValidationAttributesToElements = (validation: validationConstraints): void => {
    const keys = Object.keys(validation);
    keys.every((key) => {
        const element: HTMLInputElement = <HTMLInputElement>document.getElementById(key);
        if (!element) return false;
        const errors = Object.keys(validation[key]);
        errors.forEach((err) => {
            const handler = validationAttributes[err];
            if (handler) {
                handler(element, validation[key][err]);
            } else {
                console.log("no validationAttribute found");
            }
        });
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
                element.setCustomValidity(errors.filter(Boolean).join(" and "));
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