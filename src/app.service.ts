import { OnModuleInit } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { DataSource } from 'typeorm';
import { Connection } from 'mongoose';

export class AppService implements OnModuleInit {
  constructor(
    private dataSource: DataSource,
    @InjectConnection() private readonly mongooseConnection: Connection,
  ) {}
  onModuleInit() {
    const sqlStatus = this.dataSource.isInitialized ? 'Connected' : 'Failed';
    const mongoStatus =
      Number(this.mongooseConnection.readyState) === 1 ? 'Connected' : 'Failed';

    console.log('======== Database Connection Status ========');
    console.table([
      { Database: 'PostgreSQL / MySQL (TypeORM)', Status: sqlStatus },
      { Database: 'MongoDB (Mongoose)', Status: mongoStatus },
    ]);
  }
}
