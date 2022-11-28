export interface validations {
    required?: boolean,
    minlength?: { requiredLength: number },
    maxlength?: { requiredLength: number },
    pattern?: RegExp
}


// type fehlt hier auch noch
// https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/minlength
//https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Constraint_validation#complex_constraints_using_the_constraint_validation_api