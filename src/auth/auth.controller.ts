import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}
    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialsdto: AuthCredentialsDto):Promise<void> {
        console.log(authCredentialsdto);
        return this.authService.signUp(authCredentialsdto);
        
    }
}
