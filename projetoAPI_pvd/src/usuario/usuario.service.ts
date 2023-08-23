import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { RetornoCadastroDTO, RetornoObjDTO } from 'src/dto/retorno.dto';
import {v4 as uuid} from 'uuid';
import { USUARIO } from './usuario.entity';
import { CriaUsuarioDTO } from './dto/usuario.dto';
import { AlteraUsuarioDTO } from './dto/atualizaUsuario.dto';
import { PESSOA } from 'src/pessoa/pessoa.entity';
import { PessoaService } from 'src/pessoa/pessoa.service';
import { listaUsuarioDTO } from './dto/listaUsuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @Inject('USUARIO_REPOSITORY')///....
    private usuarioRepository: Repository<USUARIO>,
    private readonly pessoaService: PessoaService,
  ) {}

  async listar(): Promise<USUARIO[]> {
    return this.usuarioRepository.find();
  }

  async listarPessoa(): Promise<listaUsuarioDTO[]>{
    var resultado = await (this.usuarioRepository // select marca.id as ID, marca.nome AS NOME_, pes_f.nome from marca ......
      .createQueryBuilder('usuario')
      .select('usuario.ID', 'ID')
      .addSelect('usuario.EMAIL','EMAIL')
      .addSelect('usuario.LOGIN','LOGIN')
      .addSelect('pes.NOME','NOME')
      .addSelect('pes.ENDERECO','ENDERECO')
      .leftJoin('pessoa', 'pes','usuario.idpessoa = pes.id')                     
      .getRawMany());  

    const listaRetorno = resultado.map(
      usuario => new listaUsuarioDTO(
        usuario.ID,
        usuario.LOGIN,
        usuario.EMAIL,
        usuario.NOME,
        usuario.ENDERECO
      )
    );

    return listaRetorno;
  }
  async validaEmail(EMAIL: string){
    const possivelUsuario = await this.usuarioRepository.findOne({
        where: {
          EMAIL,
        },
    });
    return (possivelUsuario !== null);
   }

  async inserir(dados: CriaUsuarioDTO): Promise<RetornoCadastroDTO>{
    let retornoPessoa = await this.pessoaService.inserir(dados.PESSOA);
    
    let usuario = new USUARIO();
        usuario.ID = uuid();
        usuario.LOGIN = dados.LOGIN;
        usuario.EMAIL = dados.EMAIL;
        usuario.SENHA = dados.SENHA;
        usuario.pessoa =await this.pessoaService.localizarID(retornoPessoa.id);
    
    return this.usuarioRepository.save(usuario)
    .then((result) => {
      return <RetornoCadastroDTO>{
        id: usuario.ID,
        message: "Usuario cadastrada!"
      };
    })
    .catch((error) => {
      return <RetornoCadastroDTO>{
        id: "",
        message: "Houve um erro ao cadastrar." + error.message
      };
    })

    
  }

  async localizarID(ID: string): Promise<USUARIO> {
    var retorno = await (this.usuarioRepository // select marca.id as ID, marca.nome AS NOME_, pes_f.nome from marca ......
      .createQueryBuilder('usuario')       
      .where('usuario.ID = :IDUSU',{ IDUSU:  `${ID}`  })                
      .getRawOne());  


    let usuarioRet = new USUARIO();
    usuarioRet.ID = retorno.usuario_ID;
    usuarioRet.EMAIL = retorno.usuario_EMAIL;
    usuarioRet.LOGIN = retorno.usuario_LOGIN;
    usuarioRet.SENHA = retorno.usuario_SENHA;
    usuarioRet.pessoa = await this.pessoaService.localizarID(retorno.usuario_IDPESSOA)    
    return usuarioRet
  }
  
  async remover(id: string): Promise<RetornoObjDTO> {
    
    const usuario = await this.localizarID(id);
    
    return this.usuarioRepository.remove(usuario)
    .then(async (result) => {
      const pessoa = await this.pessoaService.remover(usuario.pessoa.ID);
      return <RetornoObjDTO>{
        return: usuario,
        message: "Usuario excluida!"
      };
    })
    .catch((error) => {
      return <RetornoObjDTO>{
        return: usuario,
        message: "Houve um erro ao excluir." + error.message
      };
    });  
  }

  async alterar(id: string, dados: AlteraUsuarioDTO): Promise<RetornoCadastroDTO> {
    const usuario = await this.localizarID(id);


    for await (const [chave, valor] of Object.entries(dados)) {
      if (chave === 'id') {
        return;
      }

      if (chave === 'PESSOA') {
        if (usuario.pessoa != undefined) {
          this.pessoaService.alterar(usuario.pessoa.ID, valor);
        }
        else {
          let retornoPessoa = await this.pessoaService.inserir(valor);
          usuario.pessoa = await this.pessoaService.localizarID(retornoPessoa.id);
        }
      }

      usuario[chave] = valor;
    }    

    return this.usuarioRepository.save(usuario)
    .then((result) => {
      return <RetornoCadastroDTO>{
        id: usuario.ID,
        message: "Usuario alterada!"
      };
    })
    .catch((error) => {
      return <RetornoCadastroDTO>{
        id: "",
        message: "Houve um erro ao alterar." + error.message
      };
    });
  }
}