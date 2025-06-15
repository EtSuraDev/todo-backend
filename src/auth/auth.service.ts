import { Injectable, NotFoundException, Res } from '@nestjs/common';
import { CreateUserDto } from '../user/DTO/create-user.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import * as bcrypt from "bcrypt"
import { User } from 'src/user/user entitie/user.entity';




@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService ,
        private readonly jwtService: JwtService
    ){}

    async register(
        user: CreateUserDto, 
    ) {
        try {
            let data = await this.userService.create(user)
            const payload = { sub: data.id, email: data.email };
            let token = await this.jwtService.signAsync(payload)
            return {data, token, "success": true}
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async login(user: Omit<CreateUserDto, "name">) {

        let findUser = await this.userService.findUserByEmail(user.email)
        let chekPassword = await bcrypt.compareSync(user.password, findUser.password)

        if (!chekPassword) {
            throw new NotFoundException('incorrect password');
        }
        let {password, ...returnUser} = findUser

        let token = await this.jwtService.signAsync({sub: findUser.id, email: findUser.email})
        return {returnUser, token }
    }


    logout() {
        return "logout"
    }
}
