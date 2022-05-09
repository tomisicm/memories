import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken, TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";

import { AuthService } from "../auth.service";
import { UserEntity } from "../../user/entities/user.entity";
import { mockRepositoryProvider } from "../../shared/mocks/mock-repository-provider";
import { UsersModule } from "../../user/user.module";
import { JwtStrategy } from "../strategy/jwt.strategy";
import { UserRepositoryService } from "../../user/user.repository.service";
import getConfigServiceMock from "../../shared/mocks/config.service.mock";
import exp from "constants";

const authConfig = {
  secret: "secret",
  expiresIn: "3600",
};

const userDummy: UserEntity = {
  id: "id",
  username: "username",
  email: "email",
  salt: "salt",
  password: "password",
  posts: [],
  hasId: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
  softRemove: jest.fn(),
  recover: jest.fn(),
  reload: jest.fn(),
};

export const userRepositoryServiceMock = jest.fn(() => ({
  create: jest.fn(() => userDummy),
  findOneOrFail: jest.fn(() => userDummy),
  validateUserPassword: jest.fn(() => true),
}));

describe("AuthService [signUp]", () => {
  let app: INestApplication;
  let moduleRef: TestingModule;
  let userAuthService: AuthService;

  const setup = async () => {
    return await Test.createTestingModule({
      imports: [
        UsersModule,
        TypeOrmModule.forFeature([UserEntity]),
        PassportModule,
        JwtModule.register({
          secret: authConfig.secret,
          signOptions: {
            expiresIn: authConfig.expiresIn,
          },
        }),
      ],
      controllers: [],
      providers: [
        AuthService,
        {
          provide: UserRepositoryService,
          useFactory: userRepositoryServiceMock,
        },
        JwtStrategy,
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

  beforeAll(async () => {
    moduleRef = await setup();
    app = moduleRef.createNestApplication();

    userAuthService = moduleRef.get<AuthService>(AuthService);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Given the Call of signin method,", () => {
    describe("And username and password satisfy criteria", () => {
      it("Then, when user is created, Verify result does not contain password and salt", async () => {
        const result = await userAuthService.signUp({
          username: userDummy.id,
          email: userDummy.email,
          password: userDummy.password,
        });

        expect(result).toStrictEqual({
          id: "id",
          username: "username",
          email: "email",
        });
      });
    });
  });
});
