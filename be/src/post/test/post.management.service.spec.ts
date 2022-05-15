import { getRepositoryToken, TypeOrmModule } from "@nestjs/typeorm";
import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, UnauthorizedException } from "@nestjs/common";

import { PostService } from "../post.service";
import { PostRepositoryService } from "../post.repository.service";
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

describe("PostManagementService", () => {
  let app: INestApplication;
  let moduleRef: TestingModule;
  let postManagementService: PostManagementService;

  beforeEach(async () => {
    moduleRef = await setup();
    app = moduleRef.createNestApplication();
    await app.init();

    postManagementService = app.get<PostManagementService>(
      PostManagementService
    );
  });

  describe("[userIsAllowedToUpdate]", () => {
    it("Allowed to update", () => {
      const user = createDummyUser({
        id: "userId",
      });
      const post = createDummyPost({
        authorId: "userId",
      });

      const result = postManagementService.userIsAllowedToUpdate(user.id, post);
      expect(result).toBe(true);
    });

    it("Not Allowed to update", () => {
      const user = createDummyUser({
        id: "userId",
      });
      const post = createDummyPost({
        authorId: "otherUserId",
      });

      try {
        postManagementService.userIsAllowedToUpdate(user.id, post);
      } catch (e) {
        expect(e instanceof UnauthorizedException);
      }
    });
  });

  describe("[userIsAllowedToRead]", () => {
    it("Author is always allowed to read post", () => {
      const user = createDummyUser({
        id: "userId",
      });
      const post = createDummyPost({
        authorId: "userId",
      });

      const result = postManagementService.userIsAllowedToRead(user.id, post);
      expect(result).toBe(true);
    });

    it("Other user is allowed to read if post is public", () => {
      const user = createDummyUser({
        id: "otherUserId",
      });
      const post = createDummyPost({
        authorId: "userId",
        status: Status.Public,
      });

      const result = postManagementService.userIsAllowedToRead(user.id, post);
      expect(result).toBe(true);
    });

    it("Other user is not allowed to read if post is not public", () => {
      const user = createDummyUser({
        id: "userId",
      });
      const post = createDummyPost({
        authorId: "otherUserId",
        status: Status.Private,
      });

      try {
        postManagementService.userIsAllowedToRead(user.id, post);
      } catch (e) {
        expect(e instanceof UnauthorizedException);
      }
    });
  });

  describe("[userIsAllowedToDelete]", () => {
    it("Only Author is allowed to delete post", () => {
      const user = createDummyUser({
        id: "userId",
      });
      const post = createDummyPost({
        authorId: "userId",
      });

      const result = postManagementService.userIsAllowedToDelete(user.id, post);
      expect(result).toBe(true);
    });

    it("Other user is  not allowed to delete post", () => {
      const user = createDummyUser({
        id: "otherUserId",
      });
      const post = createDummyPost({
        authorId: "userId",
      });

      try {
        postManagementService.userIsAllowedToDelete(user.id, post);
      } catch (e) {
        expect(e instanceof UnauthorizedException);
      }
    });
  });
});
