import * as joi from 'joi';


export class JoiValidationSchema {
    static AccountSignup = joi.object({
        aadhaar_card: joi.number().integer().required(),
        name: joi.string().min(2).required(),
        pan_card: joi.string().alphanum().allow('', null),
        dob: joi.date().allow('',null),
        address: joi.string().max(60).required()
    })
}