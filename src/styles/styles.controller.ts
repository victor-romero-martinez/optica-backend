import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/roles.enum';
import { CreateStyleDto } from './dto/create-style.dto';
import { UpdateStyleDto } from './dto/update-style.dto';
import { Style } from './entities/style.entity';
import { StylesService } from './styles.service';

@ApiTags('Style')
@Controller('styles')
export class StylesController {
  constructor(private readonly stylesService: StylesService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new style.' })
  @ApiResponse({
    status: 201,
    type: Style,
  })
  @Roles(Role.Admin)
  @Post()
  create(@Body() createStyleDto: CreateStyleDto) {
    return this.stylesService.create(createStyleDto);
  }

  @ApiOperation({ summary: 'Find all styles.' })
  @ApiResponse({
    status: 200,
    type: [Style],
  })
  @Get()
  findAll() {
    return this.stylesService.findAll();
  }

  @ApiOperation({ summary: 'Find one style by id.' })
  @ApiResponse({
    status: 200,
    type: Style,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stylesService.findOne(+id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a style.' })
  @ApiResponse({
    status: 200,
    type: Style,
  })
  @Roles(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStyleDto: UpdateStyleDto) {
    return this.stylesService.update(+id, updateStyleDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Operation message.',
    schema: {
      example: {
        message: 'string',
      },
    },
  })
  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stylesService.remove(+id);
  }
}
