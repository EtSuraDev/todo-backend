import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Todo } from './todo entitie/todo.entitie';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { CreateTodoDto } from './DTO/create-todo.dto';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(Todo)
        private todoRepository: Repository<Todo>,
        private userServise: UserService
    ){}


    async getTodo(id) {
        let findUser = await this.userServise.findUserById(id)
        if(!findUser) throw new NotFoundException('User not found');


        try {
            let todos = await this.todoRepository
                .createQueryBuilder('todo')
                .leftJoinAndSelect('todo.user', 'user')
                .where('user.id = :id', { id })
                .getMany();
            return todos
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException("server erorr")
        }
    }

    async create(todo: CreateTodoDto, id: string) {
        let findUser = await this.userServise.findUserById(id)
        if(!findUser) throw new NotFoundException('User not found');

        try {
            let saveTodo = this.todoRepository.create({
                todo: todo.todo, 
                status: todo.status, 
                description:todo.description, 
                user: findUser
            })
            return await this.todoRepository.save(saveTodo);
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException("server error",error)
        }
    }

    async update(todo, id) {
        let findUser =  await this.userServise.findUserById(id)
        if(!findUser) throw new NotFoundException('User not found');

        try {
            let updateTodo = await this.todoRepository.update(todo.id, {
                todo: todo.todo,
                status: todo.status,
                description: todo.description
            })


            if ( updateTodo.affected && updateTodo.affected > 0) {
                console.log('✅ Update successful');
                return { success: true, message: 'Todo updated successfully' };
            } else {
                console.log('❌ Update failed or todo not found');
                throw new NotFoundException('Todo not found or not updated');
            }
        } catch (error) {
            console.log(error)
            if (error instanceof  NotFoundException) throw error
            throw new InternalServerErrorException("server error")
        }
    }

    delete() {}

}
