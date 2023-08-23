import { IsEmail, IsInt, IsNotEmpty, IsString, MinLength } from "class-validator";


export class CriaPessoaDTO{
    @IsString()
    @IsNotEmpty({message: "NOME não pode ser vazio...."})
    NOME: string;

    @IsString()
    @IsNotEmpty({message: "TELEFONE não pode ser vazio...."})
    TELEFONE: string;

    @IsString()
    @IsNotEmpty({message: "ENDERECO não pode ser vazio...."})
    ENDERECO: string;
}