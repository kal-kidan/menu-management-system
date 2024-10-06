import { IsString, IsOptional, IsUUID, IsArray, ValidateNested } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMenuDto {
    @ApiProperty({ description: 'Title of the menu item' })
    @IsString()
    name: string;

    @ApiPropertyOptional({ description: 'Parent menu ID, if any' })
    @IsUUID()
    @IsOptional()
    parentId?: string;
}


export class UpdateMenuDto {
    @ApiPropertyOptional({ description: 'New title for the menu item' })
    @IsString()
    @IsOptional()
    name?: string;

}