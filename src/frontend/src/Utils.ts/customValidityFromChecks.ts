import { checkErrors } from './validation-service';

export const customValidityFromChecks = (value: any, validations: validations): string => {
    console.log(value, validations)
    const errors: string[]= checkErrors(value, validations);
    console.log(errors);
    return errors.join(" and ");
}

interface validations {
    required?: boolean,
    minlength?: { requiredLength: number },
    maxlength?: { requiredLength: number },
    pattern?: RegExp
}
