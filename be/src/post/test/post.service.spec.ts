import { getRepositoryToken, TypeOrmModule } from "@nestjs/typeorm";
import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";

import { PostService } from "../post.service";
import { PostRepositoryService } from "../post.repository.service";
import { TypedMockType } from "../../shared/mocks/types.mocks";
import { PostEntity, Status } from "../entities/post.entity";
import { mockRepositoryProvider } from "../../shared/mocks/mock-repository-provider";
import { PostManagementService } from "../post.management.service";
import { createDummyPost } from "./helpers/post.helper";
import { createDummyUser } from "./helpers/user.helper";

jest.mock("../post.repository.service");

const setup = async () => {
  const moduleRef: TestingModule = await Test.createTestingModule({
    imports: [TypeOrmModule.forFeature([PostEntity])],
    providers: [PostService, PostRepositoryService, PostManagementService],
  })
    .overrideProvider(getRepositoryToken(PostEntity))
    .useValue(mockRepositoryProvider())
    .compile();

  return moduleRef;
};

const post = createDummyPost();
const user = createDummyUser();

describe("PostService", () => {
  let app: INestApplication;
  let moduleRef: TestingModule;
  let postService: PostService;
  let postRepositoryService: TypedMockType<PostRepositoryService>;

  beforeEach(async () => {
    moduleRef = await setup();
    app = moduleRef.createNestApplication();
    await app.init();

    postService = app.get<PostService>(PostService);
    postRepositoryService = app.get<TypedMockType<PostRepositoryService>>(
      PostRepositoryService
    );
  });

  describe("[filterPosts]", () => {
    beforeEach(async () => {
      postRepositoryService.find.mockResolvedValue([post]);
    });

    it("includePrivate proerty", async () => {
      await postService.filterPosts(user, {
        includePrivate: true,
      });

      expect.assertions(1);
      expect(postRepositoryService.find).toBeCalledWith({
        where: [
          { status: Status.Public },
          { status: Status.Private, authorId: user.id },
        ],
      });
    });

    it("includePrivate proerty", async () => {
      await postService.filterPosts(user, {
        includePrivate: false,
      });

      expect.assertions(1);
      expect(postRepositoryService.find).toBeCalledWith({
        where: [{ status: Status.Public }],
      });
    });
  });
});
