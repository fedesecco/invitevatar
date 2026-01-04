import { IsOptional, IsString, MinLength } from 'class-validator';

export class SaveApiKeyDto {
  @IsString()
  @MinLength(10)
  apiKey!: string;

  @IsOptional()
  @IsString()
  provider?: string;

  @IsOptional()
  @IsString()
  label?: string;
}
