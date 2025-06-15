import { Body, Controller, Get, ParseIntPipe, Post, Req, Res, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from '../user/DTO/create-user.dto';
import { Response } from 'express';
import { AuthGuard } from './auth.guard';
import { LoginDto } from './DTO/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}



  @Post("register")
  async register(
    @Body(new ValidationPipe()) user: CreateUserDto,
    @Res( {passthrough: true} ) res: Response
  ) {

    let data = await this.authService.register(user)
    res.cookie('jwt', data.token, {
        httpOnly: true, // prevents access from JavaScript
        secure: process.env.NODE_ENV === 'production', // only over HTTPS in production
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return data
  }


  // @UseGuards(AuthGuard)
  @Get("login")
  async login(
    @Body(new ValidationPipe()) user: LoginDto, 
    @Res({passthrough: true}) res: Response
  ){    
    let data = await this.authService.login(user)

    res.cookie('jwt', data.token, {
        httpOnly: true, // prevents access from JavaScript
        secure: process.env.NODE_ENV === 'production', // only over HTTPS in production
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return data.returnUser
  }

  @Post("logout")
  logout(){
    return this.authService.logout()
  }
}
