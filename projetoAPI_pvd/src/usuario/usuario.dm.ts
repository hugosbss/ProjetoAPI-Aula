import { Injectable } from "@nestjs/common";
import { USUARIO } from "./usuario.entity";

@Injectable()
export class UsuariosArmazenados{
    #usuarios: USUARIO[] = [];    

    AdicionarUsuario(usuario: USUARIO){
        this.#usuarios.push(usuario);
    }

    get Usuarios(){        
        return this.#usuarios;
    }

    async validaEmail(email: string){
        const possivelUsuario = this.#usuarios.find(
            usuario => usuario.EMAIL === email  
        );
        return (possivelUsuario !== undefined);
    }

    private buscaPorID(id: string){
        const possivelUsuario = this.#usuarios.find(
            usuarioSalvo => usuarioSalvo.ID === id
        );

        if(!possivelUsuario){
            throw new Error('Usuario não encontrado');
        }

        return possivelUsuario
    }

    async atualizaUsuario(id: string, dadosAtualizacao: Partial<USUARIO>){
        const usuario = this.buscaPorID(id);

        Object.entries(dadosAtualizacao).forEach(
            ([chave, valor]) => {
                if(chave=== 'id'){
                    return;
                }

                usuario[chave] = valor;
            }
        )

        return usuario;
    }

   async removeUsuario(id: string){
        const usuario = this.buscaPorID(id);
        this.#usuarios = this.#usuarios.filter(
            usuarioSalvo => usuarioSalvo.ID !== id
        )
        return usuario;
   }
}