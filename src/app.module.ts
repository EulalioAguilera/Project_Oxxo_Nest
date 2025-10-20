import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { EmployeesModule } from "./employees/employees.module";
import { ProductsModule } from "./products/products.module";
import { ProvidersModule } from './providers/providers.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.host,
      port: +(process.env.port ?? 5432),
      username: "postgres",
      password: process.env.pass,
      database: process.env.name,
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
    }),
    EmployeesModule,
    ProductsModule,
    ProvidersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}