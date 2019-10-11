import {
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {Strategy, ExtractJwt} from 'passport-jwt';
import {JwtPayload} from '../interface/jwt-payload.interface';
import {InjectModel} from '@nestjs/mongoose';
import {User} from '../interface/user.interface';
import {Model} from 'mongoose';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_TOKEN_SECRET || process.env.AUTH_SECRET,
        });
    }

    async validate(payload: JwtPayload): Promise<object> {
        const {id} = payload;
        const user = await this.userModel.findOne({_id: id});
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }

}
