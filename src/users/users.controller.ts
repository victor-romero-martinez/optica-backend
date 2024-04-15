import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Find all users.' })
  @ApiResponse({
    status: 200,
    description: 'All users.',
    type: [User],
  })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Find a user.' })
  @ApiResponse({
    status: 200,
    description: 'Find a user by id.',
    type: User,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.usersService.findOne(+id);
    } catch (error) {
      return error;
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a user.' })
  @ApiResponse({
    status: 200,
    description: 'User updated.',
    type: User,
  })
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      return this.usersService.update(req.user.email, +id, updateUserDto);
    } catch (error) {
      return error;
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a user.' })
  @ApiResponse({
    status: 200,
    description: 'Response with operation message.',
    schema: {
      example: {
        message: 'string',
      },
    },
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
