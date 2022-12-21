export interface validationConstraints {
    required?: boolean,
    minlength?: { requiredLength: number },
    maxlength?: { requiredLength: number },
    pattern?: RegExp,
    min?: {requiredValue: number},
    max?: {requiredValue: number},
    // type?: string,
    step?: {requiredStep: number},

}
// https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/minlength