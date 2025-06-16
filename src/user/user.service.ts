import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user entitie/user.entity';
import { CreateUserDto } from './DTO/create-user.dto';
import * as bcrypt from 'bcrypt';




@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ){}

    

    async create(user: CreateUserDto): Promise<Omit<User, "password"> & { id: string }> {
       try {
            let findUser = await this.usersRepository.findOneBy({email: user.email})
            if(findUser) {
                throw new ConflictException('User with this email already exists');
            }
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(user.password, saltRounds);
            user.password = hashedPassword
            let newUser = this.usersRepository.create(user)
            let { password, ...safeUser} = await this.usersRepository.save(newUser)
            return safeUser
       } catch (error) {
        console.log(error)
         if (error instanceof ConflictException) throw error;
        throw new InternalServerErrorException('Server failed');
       }
    }


    async update(id: string, user: Omit<CreateUserDto, "password">) {
        try {
            let updateUser = await this.usersRepository.update(id, {
                name: user.name,
                email: user.email,
            })

            if ( updateUser.affected && updateUser.affected > 0) {
                console.log('✅ Update successful');
                return { success: true, message: 'user updated successfully' };
            } else {
                console.log('❌ Update failed or todo not found');
                throw new NotFoundException('user not found or not updated');
            }
        } catch (error) {
            console.log(error)
            if (error instanceof  NotFoundException) throw error
            throw new InternalServerErrorException("server error")
        }
    }


    async findUserById(id:string): Promise<CreateUserDto &{id:string}> {
        let findUser = await this.usersRepository.findOneBy({id})
        if (!findUser) {
            throw new NotFoundException(`user id ${id} not found`)
        }
        return findUser
    }
    async findUserByEmail(email:string):Promise<CreateUserDto&{id:string}>{
        let findUser = await this.usersRepository.findOneBy({email})
        if (!findUser) {
            throw new NotFoundException(`user email ${email} not found`)
        }
        return findUser
    }


}
