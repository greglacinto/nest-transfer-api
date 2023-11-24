import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class IntraDto{
    @ApiProperty({example: 2055190017, required: true})
    @IsNotEmpty()
    drAcct: number

    @ApiProperty({example: 1616172012, required: true})
    @IsNotEmpty()
    crAcct: number

    @ApiProperty({example: "100.00", required: true})
    @IsNotEmpty()
    amount: string

    @ApiProperty({example: "A test", required: true})
    @IsNotEmpty()
    narration: string
}