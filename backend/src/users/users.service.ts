import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';
import { CreateUsersDto } from './dto/create-users.dto';
import { SignInDTO } from './dto/signin.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { User } from './entities/user.entity';
import * as bcrypt from "bcrypt-nodejs"

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly authService: AuthService,
    ){}

    async create(createUserDTO: CreateUsersDto){
        const user = await this.userRepository.findOne({email: createUserDTO.email});
        if(user){
            throw new HttpException(
                "User already exists!",
                HttpStatus.BAD_REQUEST
            )
        }

        const savedUser = await this.userRepository.save(createUserDTO)

        return {
            id: savedUser.id,
            name: savedUser.name,
            email: savedUser.email
        }
    }

    async signin(signinDto: SignInDTO): Promise<{name: string, jwtToken:String, email: string}>{
        const user = await this.userRepository.findOne({email: signinDto.email})
        if(!user){
            throw new NotFoundException('Email not found.')
        }
        const passwordsMatch = await bcrypt.compareSync(signinDto.password, user.password)
        if(!passwordsMatch){
            throw new NotFoundException('Wrong password.')
        }
        const jwtToken = await this.authService.createAccessToken(user.id)
        return {
            name: user.name,
            jwtToken,
            email: user.email
        }
    }

    async update(id: string, updateUserDTO: UpdateUsersDto){
        const user = await this.userRepository.preload({
            id: +id,
            ...updateUserDTO
        })
        
        if(!user){
            throw new NotFoundException(
                `User ID ${id} not found.`
            )
        }

        await this.userRepository.save(user)

        return {
            id: user.id,
            name: user.name,
            email: user.email
        }

    }

    async remove(id: string){
        
        const user = await this.userRepository.findOne(id)
        
        if(!user){
            throw new NotFoundException(
                `User ID ${id} not found.`
                )
        }

        return this.userRepository.remove(user)
    }
}
