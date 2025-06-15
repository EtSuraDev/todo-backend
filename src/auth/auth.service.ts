import { Injectable, Res } from '@nestjs/common';
import { CreateUserDto } from '../user/DTO/create-user.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';




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
            return {data, token}
        } catch (error) {
            console.log(error)
            return error
        }
    }

    login() {
        return "login"
    }

    logout() {
        return "logout"
    }
}
