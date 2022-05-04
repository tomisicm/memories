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

jest.mock("../auth.service");
jest.mock("../../user/user.repisitory.service");

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

    userRepositoryService = moduleRef.get(UserRepositoryService);
  });

  describe("Given the POST request is made for /signin", () => {
    beforeEach(() => {
      userRepositoryService.findOneOrFail.mockResolvedValue(userDummy);
    });

    it("If username and password satisfy criteria, then, verify status code 201", async () => {
      await request(app.getHttpServer())
        .post("/auth/signin")
        .send({
          username: "qweeeeeeeee",
          password: "qweeeeeeeee",
        })
        .expect(HttpStatus.CREATED);
    });

    it("If password does not satisfy criteria, then, verify status code 400", async () => {
      const result = await request(app.getHttpServer())
        .post("/auth/signin")
        .send({
          username: "qweeeeee",
          password: "short",
        })
        .expect(HttpStatus.BAD_REQUEST);

      expect(result.body).toStrictEqual({
        statusCode: 400,
        message: ["password must be longer than or equal to 8 characters"],
        error: "Bad Request",
      });
    });
  });
});

describe("AuthController [signUp]", () => {
  let app: INestApplication;
  let moduleRef: TestingModule;
  let authService: TypedMockType<AuthService>;

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

    authService = moduleRef.get(AuthService);
  });

  describe("Given the POST request is made for /signin", () => {
    it("If username and password satisfy criteria, then, verify status code 200", async () => {
      const payload = {
        username: "qweeeeeeeee",
        email: "qwe@gmail.com",
        password: "qweeeeeeeee",
      };

      await request(app.getHttpServer())
        .post("/auth/signup")
        .send(payload)
        .expect(HttpStatus.CREATED);

      expect(authService.signUp).toBeCalledWith(payload);
    });

    it("If password does not satisfy criteria, then, verify status code 400", async () => {
      const result = await request(app.getHttpServer())
        .post("/auth/signup")
        .send({
          username: "qweeeeee",
          password: "short",
        })
        .expect(HttpStatus.BAD_REQUEST);

      expect(result.body).toStrictEqual({
        statusCode: 400,
        message: [
          "email must be shorter than or equal to 20 characters",
          "email must be longer than or equal to 6 characters",
          "email must be an email",
          "password must be longer than or equal to 8 characters",
        ],
        error: "Bad Request",
      });
    });
  });
});
