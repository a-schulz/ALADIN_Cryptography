export interface validations {
    required?: boolean,
    minlength?: { requiredLength: number },
    maxlength?: { requiredLength: number },
    pattern?: RegExp
}