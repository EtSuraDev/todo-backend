import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user entitie/user.entity';
import { TodoModule } from '../todo/todo.module';


@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => TodoModule )],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, TypeOrmModule]
})
export class UserModule {}
