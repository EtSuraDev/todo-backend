import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Todo } from './todo entitie/todo.entitie';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(Todo)
        todoRepository: Repository<Todo>
    ){}


    getTodo(id) {
        return id
    }

    create() {}

    update() {}

    delete() {}

}
