import { forwardRef, Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todo entitie/todo.entitie';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [TodoController],
  providers: [TodoService],
  imports: [TypeOrmModule.forFeature([Todo]),forwardRef(() => AuthModule), forwardRef(() => UserModule)],
  exports: [TypeOrmModule]
})
export class TodoModule {}
