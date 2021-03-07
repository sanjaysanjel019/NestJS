import { ConflictException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { EntityRepository, Repository, RepositoryNotFoundError } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User>{

    async signUp(authCredentialsdto: AuthCredentialsDto):Promise<void> {
        const { username, password } = authCredentialsdto;

        const user = new User();
        const salt = await bcrypt.genSalt();
        user.username = username;
        user.salt = salt;
        user.password = await this.hashPassword(password, user.salt);

        try {
        // await user.save();    
        }
        catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Username already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }           
        
         
        
    }
    private async hashPassword(password: string, salt: string) {
        return bcrypt.hash(password, salt);
    }
}