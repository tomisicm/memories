import { getRepositoryToken, TypeOrmModule } from "@nestjs/typeorm";
import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, UnauthorizedException } from "@nestjs/common";

import { CommentService } from "../comment.service";
import { CommentRepositoryService } from "../comment.repository.service";
import { TypedMockType } from "../../shared/mocks/types.mocks";
import { CommentEntity, Status } from "../entities/comment.entity";
import { mockRepositoryProvider } from "../../shared/mocks/mock-repository-provider";
import { CommentManagementService } from "../comment.management.service";
import { PostEntity } from "../../post/entities/post.entity";
import { createDummyUser } from "../../post/test/helpers/user.helper";
import { createDummyPost } from "../../post/test/helpers/post.helper";
import { createDummyComment } from "./helpers/comment.helper";
import { UpdateCommentDto } from "../dto/api/update-comment.dto";
import { PostRepositoryService } from "../../post/post.repository.service";

jest.mock("../comment.repository.service");
jest.mock("../../post/post.repository.service");

const setup = async () => {
  const moduleRef: TestingModule = await Test.createTestingModule({
    imports: [TypeOrmModule.forFeature([CommentEntity, PostEntity])],
    providers: [
      CommentService,
      CommentRepositoryService,
      CommentManagementService,
      PostRepositoryService,
    ],
  })
    .overrideProvider(getRepositoryToken(PostEntity))
    .useValue(mockRepositoryProvider())
    .overrideProvider(getRepositoryToken(CommentEntity))
    .useValue(mockRepositoryProvider())
    .compile();

  return moduleRef;
};

describe("CommentManagementService", () => {
  let app: INestApplication;
  let moduleRef: TestingModule;
  let commentManagementService: CommentManagementService;

  beforeEach(async () => {
    moduleRef = await setup();
    app = moduleRef.createNestApplication();
    await app.init();

    commentManagementService = app.get<CommentManagementService>(
      CommentManagementService
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
      const comment = createDummyComment({
        authorId: "userId",
      });
      const payload: UpdateCommentDto = {
        body: "update body",
      };

      const result = commentManagementService.userIsAllowedToUpdate(
        user,
        post,
        comment,
        payload
      );
      expect(result).toBe(true);
    });

    it("Not Allowed to update", () => {
      const user = createDummyUser({
        id: "userId",
      });
      const post = createDummyPost({
        authorId: "userId",
      });
      const comment = createDummyComment({
        authorId: "otherUserId",
      });
      const payload: UpdateCommentDto = {
        body: "update body",
      };

      try {
        commentManagementService.userIsAllowedToUpdate(
          user,
          post,
          comment,
          payload
        );
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
      const comment = createDummyComment({
        authorId: "userId",
      });

      const result = commentManagementService.userIsAllowedToDelete(
        user,
        post,
        comment
      );
      expect(result).toBe(true);
    });

    it("Other user is  not allowed to delete post", () => {
      const user = createDummyUser({
        id: "otherUserId",
      });
      const post = createDummyPost({
        authorId: "userId",
      });
      const comment = createDummyComment({
        authorId: "userId",
      });

      try {
        commentManagementService.userIsAllowedToDelete(user, post, comment);
      } catch (e) {
        expect(e instanceof UnauthorizedException);
      }
    });
  });
});
