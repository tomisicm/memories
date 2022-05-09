import { INestApplication } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Test, TestingModule } from "@nestjs/testing";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { getRepositoryToken, TypeOrmModule } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";

import { TypedMockType } from "../../shared/mocks/types.mocks";
import { AuthController } from "../auth.controller";
import { AuthService } from "../auth.service";
import { UserEntity } from "../../user/entities/user.entity";
import { mockRepositoryProvider } from "../../shared/mocks/mock-repository-provider";
import getConfigServiceMock from "../../shared/mocks/config.service.mock";
import { UsersModule } from "../../user/user.module";
import { UserRepositoryService } from "../../user/user.repository.service";
import { JwtStrategy } from "../strategy/jwt.strategy";
import { LocalStrategy } from "../strategy/local.strategy";

jest.mock("../auth.service");
jest.mock("../../user/user.repository.service");

const authConfig = {
  secret: "secret",
  expiresIn: "3600",
};

// TODO: passport shoudn't be mocked in this case
describe("AuthController", () => {
  let app: INestApplication;
  let moduleRef: TestingModule;
  let authService: TypedMockType<AuthService>;
  let authController: AuthController;

  const setup = async () => {
    return await Test.createTestingModule({
      imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
          secret: authConfig.secret,
          signOptions: {
            expiresIn: authConfig.expiresIn,
          },
        }),
        TypeOrmModule.forFeature([UserEntity]),
      ],
      controllers: [AuthController],
      providers: [
        AuthService,
        JwtStrategy,
        UserRepositoryService,
        LocalStrategy,
        {
          provide: ConfigService,
          useFactory: getConfigServiceMock,
        },
      ],
    })
      .overrideProvider(getRepositoryToken(UserEntity))
      .useValue(mockRepositoryProvider())
      .compile();
  };

  beforeEach(async () => {
    moduleRef = await setup();
    app = moduleRef.createNestApplication();

    await app.init();

    authController = moduleRef.get(AuthController);
    authService = moduleRef.get(AuthService);
  });

  describe.skip("Assert auth guards", () => {
    it("Then it should apply the AuthGuard guard to the request", () => {
      console.log(Reflect.getMetadata("__guards__", authController));
      // console.log(Reflect.getMetadata("__guards__", authController)[0]);

      // expect(Reflect.getMetadata("__guards__", authController)[0]).toEqual(
      //   AuthGuard
      // );
    });
  });
});
