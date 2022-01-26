import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm"
import {User} from '../users/entities/user.entity'
import {PassportModule} from '@nestjs/passport'
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [ 
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: "cvsioifkjcdi",
      signOptions: {
        expiresIn: "2d"
      }
    })
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
