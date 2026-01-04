import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiKeysService } from './api-keys.service';
import { SaveApiKeyDto } from './dto/save-api-key.dto';
import { UpdateApiKeyLabelDto } from './dto/update-api-key-label.dto';

@Controller('api-keys')
export class ApiKeysController {
  constructor(private readonly apiKeysService: ApiKeysService) {}

  @Get()
  list(@Headers('authorization') authHeader: string | undefined) {
    return this.apiKeysService.list(authHeader);
  }

  @Post()
  save(
    @Headers('authorization') authHeader: string | undefined,
    @Body() dto: SaveApiKeyDto
  ) {
    return this.apiKeysService.saveKey(authHeader, dto);
  }

  @Patch(':id')
  rename(
    @Headers('authorization') authHeader: string | undefined,
    @Param('id') id: string,
    @Body() dto: UpdateApiKeyLabelDto
  ) {
    return this.apiKeysService.updateLabel(authHeader, id, dto);
  }

  @Delete(':id')
  remove(
    @Headers('authorization') authHeader: string | undefined,
    @Param('id') id: string
  ) {
    return this.apiKeysService.delete(authHeader, id);
  }
}
