import { DataSource } from 'typeorm';
import { PRODUTO } from './produto.entity';

export const produtoProviders = [
  {
    provide: 'PRODUTO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(PRODUTO),
    inject: ['DATA_SOURCE'],
  },
];