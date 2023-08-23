import { USUARIO } from 'src/usuario/usuario.entity';
import {Entity,Column, PrimaryColumn, OneToMany, OneToOne} from 'typeorm';

@Entity()
export class PESSOA{
    @PrimaryColumn()
    ID: string;

    @Column()
    NOME: string;

    @Column()
    TELEFONE: string;//....

    @Column()
    ENDERECO: string;//....

    @OneToOne(() => USUARIO, usuario => usuario.pessoa)
    usuario: USUARIO;
}