import {
    Controller,
    Post,
    Get,
    Req,
    Res,
    Body,
    HttpException,
    HttpStatus,
} from "@nestjs/common";
import { Request, Response } from 'express';
import { JoiValidationSchema } from "src/bank/helper/schema.validation";
import { ValidationPipe } from "src/bank/pipe/joiValidation.pipe";
import { AccountSignup } from "src/bank/schema/signup.schema";
import { AuthService } from "src/bank/service/auth/auth.service";

@Controller('v1/auth')
export class AuthController {

    constructor(
        private authService: AuthService,
    ) { }

    @Post()
    async signUp(
        @Req() req: Request,
        @Res() res: Response,
        @Body(new ValidationPipe(JoiValidationSchema.AccountSignup)) signup: AccountSignup
    ) {
 
        const response = await this.authService.signupAccount(signup);
        if (!response) {
            throw new HttpException(
                'Account not created, please try again later',
                HttpStatus.BAD_REQUEST
            );
        }
        res.status(201).json(`Account created successfully. Your a/c number is : ${response}`)
    }
}
