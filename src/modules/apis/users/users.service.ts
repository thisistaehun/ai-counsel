import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public create(createUserInput: CreateUserInput): Promise<User> {
    this.hashPassword(createUserInput.password);
    const newUser = this.userRepository.create(createUserInput);
    return this.userRepository.save(newUser);
  }

  public comparePassword(password: string, user: User) {
    return bcrypt.compare(password, user.password);
  }

  public findAll() {
    return `This action returns all users`;
  }

  public findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  public findOneByEmail(email: string) {
    return this.userRepository.findOneOrFail({ where: { email } });
  }

  public update(
    id: number,
    updateUserInput: UpdateUserInput,
  ): Promise<UpdateResult> {
    return this.userRepository.update(id, updateUserInput);
  }

  public remove(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }

  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}
