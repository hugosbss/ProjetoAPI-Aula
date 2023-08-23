import { IsEmail, IsInt, IsNotEmpty, IsString, MinLength } from "class-validator";


export class CriaMarcaDTO{
    @IsString()
    @IsNotEmpty({message: "Nome não pode ser vazio"})
    NOME: string;
}