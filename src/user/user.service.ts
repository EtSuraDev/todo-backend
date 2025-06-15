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

    

    async create(user: CreateUserDto) {
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
            safeUser["success"] = true
            return safeUser
       } catch (error) {
        console.log(error)
         if (error instanceof ConflictException) throw error;

        // Otherwise throw generic internal server error
        throw new InternalServerErrorException('Server failed');
       }
    }

    async getUserData(id) {
        let findUser
        try {
            findUser = await this.usersRepository.findOneBy({id: id.id})
            if(!findUser){
                console.log(id.id)
                return new NotFoundException(`user id ${id.id} not found`)
            }
            return findUser
        } catch (error) {
            console.log(findUser)
            console.log(error)
        }
    }

    async update(name) {
        try {
            // let updatedUser = this.usersRepository.update()
        } catch (error) {
            console.log(error)
        }
    }
}
