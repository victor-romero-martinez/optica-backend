import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth-login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /** get session token */
  @ApiOperation({ summary: 'Get session token.' })
  @ApiBody({
    schema: {
      example: {
        email: 'sobolo@kok.gd',
        password: 'secure#Pass1',
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Generate a session token.',
    schema: {
      example: {
        token: 'token_string',
      },
    },
  })
  @Post('login')
  signIn(@Body() signInDto: AuthDto) {
    try {
      return this.authService.singIn(signInDto);
    } catch (error) {
      return error;
    }
  }

  /** register and get session token */
  @ApiOperation({ summary: 'Register' })
  @ApiBody({
    schema: {
      example: {
        email: 'sobolo@kok.gd',
        password: 'secure#Pass1',
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Register and get session token.',
    schema: {
      example: {
        token: 'token_string',
      },
    },
  })
  @Post('register')
  register(@Body() registerDto: AuthDto) {
    try {
      return this.authService.register(registerDto);
    } catch (error) {
      return error;
    }
  }

  /** view token content */
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
