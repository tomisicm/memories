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
import { PostCommentRepositoryService } from "../post.comments.repository.service";

jest.mock("../post.repository.service");
jest.mock("../post.comments.repository.service");

const setup = async () => {
  const moduleRef: TestingModule = await Test.createTestingModule({
    imports: [TypeOrmModule.forFeature([PostEntity])],
    providers: [
      PostService,
      PostRepositoryService,
      PostManagementService,
      PostCommentRepositoryService,
    ],
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
  let postCommentRepositoryService: TypedMockType<PostCommentRepositoryService>;

  beforeEach(async () => {
    moduleRef = await setup();
    app = moduleRef.createNestApplication();
    await app.init();

    postService = app.get<PostService>(PostService);

    postCommentRepositoryService = app.get<
      TypedMockType<PostCommentRepositoryService>
    >(PostCommentRepositoryService);
  });

  describe("[filterPosts]", () => {
    beforeEach(async () => {
      postCommentRepositoryService.getPosts.mockResolvedValue([post]);
    });

    it("includePrivate proerty", async () => {
      await postService.filterPosts(user, {
        includePrivate: true,
      });

      expect.assertions(1);
      expect(postCommentRepositoryService.getPosts).toBeCalledWith({
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
      expect(postCommentRepositoryService.getPosts).toBeCalledWith({
        where: [{ status: Status.Public }],
      });
    });
  });
});
