import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class RevDto {
    @ApiProperty({example: "2023-10-10T00:00:00.000", required: true})
    @IsNotEmpty()
    tranDt: string

    @ApiProperty({example: "S12345678", required: true})
    @IsNotEmpty()
    tranId: string
}