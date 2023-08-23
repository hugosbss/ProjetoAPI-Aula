import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { RetornoCadastroDTO, RetornoObjDTO } from "src/dto/retorno.dto";
import { AlteraUsuarioDTO } from "./dto/atualizaUsuario.dto";
import { listaUsuarioDTO } from "./dto/listaUsuario.dto";
import { CriaUsuarioDTO } from "./dto/usuario.dto";
import { USUARIO } from "./usuario.entity";
import { UsuarioService } from "./usuario.service";



@Controller('/usuario')
export class UsuarioController{
    constructor(private readonly usuarioService: UsuarioService){
             
    }

    @Get('listar')
    async listar(): Promise<USUARIO[]>{
        return this.usuarioService.listar();
    }

    @Post('')
    async cria(@Body() dados: CriaUsuarioDTO): Promise<RetornoCadastroDTO>{        
        return this.usuarioService.inserir(dados)        
    }

    @Put(':id')
    async alterar(@Body() dados: AlteraUsuarioDTO,@Param('id') id: string): Promise<RetornoCadastroDTO>{        
        return this.usuarioService.alterar(id,dados)        
    }
    
    @Get('ID-:id')
    async listarID(@Param('id') id: string): Promise<USUARIO>{
        return this.usuarioService.localizarID(id);//....
    }


    @Get('listaPessoa')
    async listaPessoa(): Promise<listaUsuarioDTO[]>{
        return this.usuarioService.listarPessoa();//....
    }
    

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<RetornoObjDTO>{
        return this.usuarioService.remover(id);
    }    

}