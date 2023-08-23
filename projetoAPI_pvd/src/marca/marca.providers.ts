import { DataSource } from 'typeorm';
import { MARCA } from './marca.entity';

export const marcaProviders = [
  {
    provide: 'MARCA_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(MARCA),
    inject: ['DATA_SOURCE'],
  },
];