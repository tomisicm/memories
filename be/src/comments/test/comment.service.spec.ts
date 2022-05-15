import { getRepositoryToken, TypeOrmModule } from "@nestjs/typeorm";
import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, UnauthorizedException } from "@nestjs/common";

import { CommentService } from "../comment.service";
import { CommentRepositoryService } from "../comment.repository.service";
import { TypedMockType } from "../../shared/mocks/types.mocks";
import { CommentEntity, Status } from "../entities/comment.entity";
import { mockRepositoryProvider } from "../../shared/mocks/mock-repository-provider";
import { CommentManagementService } from "../comment.management.service";
import {
  PostEntity,
  Status as PostStatus,
} from "../../post/entities/post.entity";
import { createDummyUser } from "../../post/test/helpers/user.helper";
import { createDummyPost } from "../../post/test/helpers/post.helper";
import { createDummyComment } from "./helpers/comment.helper";
import { UpdateCommentDto } from "../dto/api/update-comment.dto";
import { PostRepositoryService } from "../../post/post.repository.service";
import { CreateCommentDto } from "../dto/api/create-comment.dto";

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

describe("CommentService", () => {
  let app: INestApplication;
  let moduleRef: TestingModule;
  let commentService: CommentService;
  let commentRepositoryService: TypedMockType<CommentRepositoryService>;
  let postRepositoryService: TypedMockType<PostRepositoryService>;

  beforeEach(async () => {
    moduleRef = await setup();
    app = moduleRef.createNestApplication();
    await app.init();

    commentService = app.get<CommentService>(CommentService);
    commentRepositoryService = app.get<TypedMockType<CommentRepositoryService>>(
      CommentRepositoryService
    );
    postRepositoryService = app.get<TypedMockType<PostRepositoryService>>(
      PostRepositoryService
    );
  });

  describe("[create]", () => {
    beforeEach(() => {
      commentRepositoryService.create.mockResolvedValue(
        createDummyComment({
          authorId: "userId",
          body: "body",
          postId: "id",
        })
      );
      postRepositoryService.findOrFail.mockResolvedValue(createDummyPost());
    });

    it("Allowed to create", async () => {
      const user = createDummyUser({
        id: "userId",
      });
      const post = createDummyPost({
        authorId: "userId",
      });
      const payload: CreateCommentDto = {
        body: "body",
        status: Status.PUBLIC,
        postId: post.id,
      };

      const result = await commentService.create(user, payload);

      expect(result).toEqual(
        expect.objectContaining({
          ...payload,
          authorId: user.id,
          postId: post.id,
        })
      );
    });

    it("Not Allowed to create", () => {
      const user = createDummyUser({
        id: "userId",
      });
      const post = createDummyPost({
        authorId: "userId",
        status: PostStatus.Private,
      });
      const payload: CreateCommentDto = {
        body: "update body",
        status: Status.PUBLIC,
        postId: post.id,
      };

      try {
        commentService.create(user, payload);
      } catch (e) {
        expect(e instanceof UnauthorizedException);
      }
    });
  });

  describe("[update]", () => {
    beforeEach(() => {
      commentRepositoryService.create.mockResolvedValue(
        createDummyComment({
          authorId: "userId",
          body: "body",
          postId: "id",
        })
      );
      commentRepositoryService.findOrFail.mockResolvedValue(
        createDummyComment({
          authorId: "userId",
          body: "body",
          postId: "id",
        })
      );
      postRepositoryService.findOrFail.mockResolvedValue(createDummyPost());
    });

    it("Allowed to update", async () => {
      const user = createDummyUser({
        id: "userId",
      });
      const post = createDummyPost({
        authorId: "userId",
      });
      const payload: CreateCommentDto = {
        body: "body",
        status: Status.PUBLIC,
        postId: post.id,
      };

      await commentService.update(user, "id", payload);

      expect(commentRepositoryService.update).toHaveBeenCalled();
    });

    it("Not allowed to update", () => {
      const user = createDummyUser({
        id: "userId",
      });
      const post = createDummyPost({
        authorId: "userId",
        status: PostStatus.Private,
      });
      const payload: CreateCommentDto = {
        body: "update body",
        status: Status.PUBLIC,
        postId: post.id,
      };

      try {
        commentService.update(user, "id", payload);
      } catch (e) {
        expect(commentRepositoryService.update).not.toHaveBeenCalled();
        expect(e instanceof UnauthorizedException);
      }
    });
  });
});
