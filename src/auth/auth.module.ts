import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
// import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'demo_secret',
      signOptions: { expiresIn: '10d' },
    }),
  ],
  controllers: [AuthController],
  // providers: [AuthService, JwtStrategy, GoogleStrategy],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
