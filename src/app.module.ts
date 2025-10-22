import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { EmployeesModule } from "./employees/employees.module";
import { ProductsModule } from "./products/products.module";
import { ProvidersModule } from './providers/providers.module';
import { ManagersModule } from './managers/managers.module';
import { LocationsModule } from './locations/locations.module';
import { RegionsModule } from './regions/regions.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from "@nestjs/jwt";
import { JWT_KEY, JWT_EXPIRES_IN } from "./auth/constants/jwt.constants";


@Module({
  imports: [
    JwtModule.register({global: true,
      secret: JWT_KEY,
      signOptions: { expiresIn: JWT_EXPIRES_IN }}),
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
    ProvidersModule,
    ManagersModule,
    LocationsModule,
    RegionsModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}