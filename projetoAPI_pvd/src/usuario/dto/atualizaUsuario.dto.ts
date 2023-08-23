import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { AlteraPessoaDTO } from "src/pessoa/dto/alteraPessoa.dto";
import { EmailUnico } from "src/validacao/email-unico.validator";


export class AlteraUsuarioDTO{
    @IsString()
    @IsNotEmpty({message: "Nome não pode ser vazio"})
    @IsOptional()
    LOGIN: string;

    @IsEmail(undefined,{message: "Email inválido"})
    @EmailUnico({message:"Já existe usuário com esse email"})
    @IsOptional()
    EMAIL:string;

    @MinLength(6,{message: "Tamanho da senha inválido"})
    @IsOptional()
    SENHA:string;
    
    @IsOptional()
    PESSOA: AlteraPessoaDTO;
}

