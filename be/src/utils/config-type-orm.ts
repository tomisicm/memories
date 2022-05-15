import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import {
  TYPEORM_HOST,
  TYPEORM_PORT,
  TYPEORM_CONNECTION,
  TYPEORM_USERNAME,
  TYPEORM_PASSWORD,
  TYPEORM_DATABASE,
  TYPEORM_ENTITIES,
  TYPEORM_URL,
  TYPEORM_LOGGING,
} from "../constants/environment";

export const configureTypeORM = () =>
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      const dbUrl = `postgres://${configService.get<string>(
        TYPEORM_USERNAME
      )}:${configService.get<string>(
        TYPEORM_PASSWORD
      )}@service-db:${configService.get<string>(TYPEORM_PORT)}/postgres`;

      return {
        type: configService.get<string>(TYPEORM_CONNECTION) as "postgres",
        host: configService.get<string>(TYPEORM_HOST),
        port: Number(configService.get<number>(TYPEORM_PORT)),
        username: configService.get<string>(TYPEORM_USERNAME),
        password: configService.get<string>(TYPEORM_PASSWORD),
        database: configService.get<string>(TYPEORM_DATABASE),
        url: dbUrl,
        logging: configService.get<string>(TYPEORM_LOGGING) === "true",
        entities: [__dirname + "/../**/*.entity.js"],
        migrations: ["src/migrations/**/*{.ts,.js}"],
        synchronize: true,
        autoLoadEntities: true,
        cli: {
          migrationsDir: "src/migrations",
        },
      };
    },
  });
