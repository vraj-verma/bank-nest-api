import {
    Controller,
    Post,
    Get,
    Req,
    Res,
    Body,
    HttpException,
    HttpStatus,
    UseGuards,
} from "@nestjs/common";
import { Request, Response } from 'express';
import { JoiValidationSchema } from "src/bank/helper/schema.validation";
import { ValidationPipe } from "src/bank/pipe/joiValidation.pipe";
import { AccountSignup } from "src/bank/schema/signup.schema";
import { AuthService } from "src/bank/service/auth.service";
import { JwtAuthGuard } from "src/bank/service/auth/jwt-auth.guard";
import { Signup } from "../model/signup";
import { Signin } from "../model/signin";
import * as bcrypt from 'bcrypt';


@Controller('v1/auth')
export class AuthController {

    constructor(
        private authService: AuthService,
    ) { }

    // Create account
    @Post('signup')
    async signUp(
        @Req() req: Request,
        @Res() res: Response,
        @Body(new ValidationPipe(JoiValidationSchema.signupSchema)) signup: Signup
    ) {

        const getAccountByEmail = await this.authService.getUserByEmail(signup.email);
        if(getAccountByEmail){
            throw new HttpException(
                `Account already exist, please login`,
                HttpStatus.BAD_REQUEST
            );
        }

        // Password hashing
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(signup.password, salt);
        signup.password = hash;

        const response = await this.authService.signupAccount(signup);
        if (!response) {
            throw new HttpException(
                'Account not created, please try again later',
                HttpStatus.BAD_REQUEST
            );
        }
        const loginId = Math.floor(Math.random() * 100) + 12;
        res.status(201).json(`Account created successfully. Your login id is : ${loginId}${response}`)
    }

    // Sign in
    @Post('signin')
    async signin(
        @Req() req: Request,
        @Res() res: Response,
        @Body(new ValidationPipe(JoiValidationSchema.signinSchema)) signin: Signin
    ) {
        const response = await this.authService.getUserByEmail(signin.email);
        if (!response) {
            throw new HttpException(
                `Account does not exist, please signup`,
                HttpStatus.BAD_REQUEST
            );
        }
        const password = signin.password;
        const isMatch = await bcrypt.compare(password, password);

    }
}

