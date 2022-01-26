import {BadRequestException, Injectable, UnauthorizedException} from "@nestjs/common"
import {InjectRepository} from "@nestjs/typeorm"
import {Repository} from "typeorm"
import {Request} from "express"
import {User} from "../users/entities/user.entity"
import {sign} from "jsonwebtoken"
import { JwtPayload } from "./models/jwt-payload.model"

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

    public async createAccessToken(userId: number): Promise<String>{
        return sign({userId}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRATION   
        })
    }

    public async validateUser(jwtPayload: JwtPayload){
        const user = await this.userRepository.findOne(jwtPayload.userId)
        if(!user){
            throw new UnauthorizedException('User not found')
        }
        return {
            id: user.id,
            name: user.name,
            email: user.email
        }
    }

    private jwtExtractor(request: Request): string{
        const authHeader = request.headers.authorization

        if(!authHeader){
            throw new BadRequestException('Bad request.')
        }

        const [, token] = authHeader.split(' ')

        return token
    }

    public returnJwtExtractor(): (request: Request) => string {
        return this.jwtExtractor
    }
}
