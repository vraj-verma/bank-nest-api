import * as joi from 'joi';

export enum Gender{
    Male = 'Male',
    Female = 'Female',
    Other = 'Other'
}
export class JoiValidationSchema {
    static signupSchema = joi.object({
        name: joi.string().min(2).required(),
        email:joi.string().email().required(),
        password: joi.string().alphanum().min(8).max(15).required(),
        gender: joi.string().valid(...Object.values(Gender)).required()
    });

    static signinSchema = joi.object({
        loginId: joi.string().alphanum().required(),
        password: joi.string().alphanum().min(8).max(15).required(),
    });


}