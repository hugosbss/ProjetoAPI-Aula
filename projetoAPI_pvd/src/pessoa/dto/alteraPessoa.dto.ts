import { Optional } from "@nestjs/common";
import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";


export class AlteraPessoaDTO{
    @IsString()
    @IsNotEmpty({message: "NOME não pode ser vazio"})
    @IsOptional()
    NOME: string;

    @IsString()
    @IsNotEmpty({message: "TELEFONE não pode ser vazio"})
    @IsOptional()
    TELEFONE: string;

    @IsString()
    @IsNotEmpty({message: "ENDERECO não pode ser vazio"})
    @IsOptional()
    ENDERECO: string;
}