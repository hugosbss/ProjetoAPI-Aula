import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { RetornoCadastroDTO, RetornoObjDTO } from "src/dto/retorno.dto";
import { AlteraPessoaDTO } from "./dto/alteraPessoa.dto";
import { CriaPessoaDTO } from "./dto/criaPessoa.dto";
import { PESSOA } from "./pessoa.entity";
import { PessoaService } from "./pessoa.service";


@Controller('/pessoa')
export class PessoaController{
    constructor(private readonly pessoaService: PessoaService){
             
    }

    @Get('listar')
    async listar(): Promise<PESSOA[]>{
        return this.pessoaService.listar();
    }

    @Post('')
    async cria(@Body() dados: CriaPessoaDTO): Promise<RetornoCadastroDTO>{        
        return this.pessoaService.inserir(dados)        
    }

    @Put(':id')
    async alterar(@Body() dados: AlteraPessoaDTO,@Param('id') id: string): Promise<RetornoCadastroDTO>{        
        return this.pessoaService.alterar(id,dados)        
    }
    
    @Get('ID-:id')
    async listarID(@Param('id') id: string): Promise<PESSOA>{
        return this.pessoaService.localizarID(id);//....
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<RetornoObjDTO>{
        return this.pessoaService.remover(id);
    }    

}