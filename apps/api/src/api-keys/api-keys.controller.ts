import { Body, Controller, Headers, Post } from '@nestjs/common';
import { ApiKeysService } from './api-keys.service';
import { SaveApiKeyDto } from './dto/save-api-key.dto';

@Controller('api-keys')
export class ApiKeysController {
  constructor(private readonly apiKeysService: ApiKeysService) {}

  @Post()
  save(
    @Headers('authorization') authHeader: string | undefined,
    @Body() dto: SaveApiKeyDto
  ) {
    return this.apiKeysService.saveKey(authHeader, dto);
  }
}
