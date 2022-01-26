import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { genSaltSync, hashSync } from 'bcrypt-nodejs';
import { CreateUsersDto } from './dto/create-users.dto';
import { SignInDTO } from './dto/signin.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService){}

    @Post()
    async create(@Body() createUserDTO: CreateUsersDto){
        const user = {...createUserDTO}
        const encryptPassword = (password: string) => {
            const salt = genSaltSync(10)
            return hashSync(password, salt)
        }
        user.password = encryptPassword(user.password)
        return await this.usersService.create(user)
    }

    @Post('signin')
    async sigin(@Body() signInDTO:SignInDTO ): Promise<{name: string, jwtToken:String, email: string}>{
        return await this.usersService.signin(signInDTO)
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    async update(@Param('id') id, @Body() updateUserDTO: UpdateUsersDto){
        const user = {...updateUserDTO}
        const encryptPassword = (password: string) => {
            const salt = genSaltSync(10)
            return hashSync(password, salt)
        }
        user.password = encryptPassword(user.password)
        return await this.usersService.update(id, user)
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    async remove(@Param('id') id){
        return await this.usersService.remove(id)
    }
}
