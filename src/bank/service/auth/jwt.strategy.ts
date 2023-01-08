import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService:AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  // async validate(payload: any) {
  //   return { loginId: payload.sub, username: payload.username };
  // }

  async validate(req: Request, payload: any): Promise<any> {
    const { email } = payload;      
    const user = await this.authService.getUserByEmail(email);   
    if (!user) {
      throw new HttpException(`Unauthorized`, HttpStatus.UNAUTHORIZED);
    }
    return { ...user };
  }
}