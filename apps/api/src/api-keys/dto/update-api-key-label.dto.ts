import { IsString, MinLength } from 'class-validator';

export class UpdateApiKeyLabelDto {
  @IsString()
  @MinLength(1)
  label!: string;
}
