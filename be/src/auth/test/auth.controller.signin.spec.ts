import { HttpStatus, INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken, TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import * as request from "supertest";

import { TypedMockType } from "../../shared/mocks/types.mocks";
import { AuthController } from "../auth.controller";
import { AuthService } from "../auth.service";
import { UserEntity } from "../../user/entities/user.entity";
import { mockRepositoryProvider } from "../../shared/mocks/mock-repository-provider";
import { UsersModule } from "../../user/user.module";
import { JwtStrategy } from "../strategy/jwt.strategy";
import { UserRepositoryService } from "../../user/user.repository.service";
import { LocalStrategy } from "../strategy/local.strategy";
import getConfigServiceMock from "../../shared/mocks/config.service.mock";

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

const authConfig = {
  secret: "secret",
  expiresIn: "3600",
};

describe("AuthController [signIn]", () => {
  let app: INestApplication;
  let moduleRef: TestingModule;
  let userRepositoryService: TypedMockType<UserRepositoryService>;

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
        {
          provide: UserRepositoryService,
          useFactory: userRepositoryServiceMock,
        },
        JwtStrategy,
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

  beforeAll(async () => {
    moduleRef = await setup();
    app = moduleRef.createNestApplication();

    userRepositoryService = moduleRef.get(UserRepositoryService);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Given the POST request is made for /auth/signin", () => {
    describe("And payload is invalid, then", () => {
      it("If password does not satisfy criteria, then, verify status code 400", async () => {
        const response = await request(app.getHttpServer())
          .post("/auth/signin")
          .send({
            username: "qweeeeee",
            password: "short",
          })
          .expect(HttpStatus.BAD_REQUEST);

        expect(response.body).toStrictEqual({
          statusCode: 400,
          message: ["password must be longer than or equal to 8 characters"],
          error: "Bad Request",
        });
      });
    });

    describe("And payload valid, then", () => {
      it("If username and password satisfy criteria, then, verify status code 201, ", async () => {
        const response = await request(app.getHttpServer())
          .post("/auth/signin")
          .send({
            username: "username",
            password: "password",
          })
          .expect(HttpStatus.CREATED);

        const decodedJwt = Buffer.from(
          response.body.accessToken.split(".")[1],
          "base64"
        ).toString("ascii");

        const parseDecodedJwt = JSON.parse(decodedJwt);

        expect(parseDecodedJwt.password).toBe(undefined);
        expect(parseDecodedJwt.salt).toBe(undefined);
      });
    });
  });
});
