import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserInput } from './dto/create-user.dto';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async create(createUserInput: CreateUserInput): Promise<User> {
    createUserInput.password = await this.hashPassword(
      createUserInput.password,
    );
    const user = await this.userRepository.save(
      this.userRepository.create(createUserInput),
    );

    return user;
  }

  public comparePassword(password: string, user: User) {
    return bcrypt.compare(password, user.password);
  }

  public findAll() {
    return `This action returns all users`;
  }

  public findOne(key: string, value: any) {
    return this.userRepository.findOneOrFail({ where: { [key]: value } });
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
