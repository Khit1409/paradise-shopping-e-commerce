import { IsOptional, IsString } from "class-validator";

export class createNavigationDto {
  @IsString()
  nav_name: string;
  @IsOptional()
  @IsString()
  nav_url: string;
  @IsOptional()
  @IsString()
  nav_icon?: string;
}
