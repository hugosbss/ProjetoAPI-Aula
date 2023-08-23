import { IsEmail, IsInt, IsNotEmpty, IsString, MinLength } from "class-validator";
import { AlteraPessoaDTO } from "src/pessoa/dto/alteraPessoa.dto";
import { CriaPessoaDTO } from "src/pessoa/dto/criaPessoa.dto";
import { EmailUnico } from "src/validacao/email-unico.validator";

export class CriaUsuarioDTO{
    @IsString()
    @IsNotEmpty({message: "Nome não pode ser vazio"})
    LOGIN: string;

    @IsEmail(undefined,{message: "Email inválido"})
    @EmailUnico({message:"Já existe usuário com esse email"})
    EMAIL:string;

    @MinLength(6,{message: "Tamanho da senha inválido"})
    SENHA:string;

    @IsNotEmpty({message: "Pessoa não pode ser vazio"})
    PESSOA: CriaPessoaDTO;
}