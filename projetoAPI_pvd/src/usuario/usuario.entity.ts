import { PESSOA } from "src/pessoa/pessoa.entity";
import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from "typeorm";


@Entity()
export class USUARIO{
    @PrimaryColumn()
    ID: string;

    @Column()
    LOGIN: string;

    @Column()
    EMAIL: string;

    @Column()
    SENHA: string;

    @OneToOne(() => PESSOA, pessoa => pessoa.usuario)
    @JoinColumn({ name: 'IDPESSOA', referencedColumnName:'ID'})
    pessoa: PESSOA;
}