import { getRepositoryToken, TypeOrmModule } from "@nestjs/typeorm";
import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, UnauthorizedException } from "@nestjs/common";

import { PostService } from "../post.service";
import { PostRepositoryService } from "../post.repository.service";
import { TypedMockType } from "../../shared/mocks/types.mocks";
import { PostEntity, Status } from "../entities/post.entity";
import { mockRepositoryProvider } from "../../shared/mocks/mock-repository-provider";
import { PostManagementService } from "../post.management.service";
import { createDummyPost } from "./post.helper";
import { createDummyUser } from "./user.helper";
import { PostController } from "../post.controller";

jest.mock("../post.repository.service");

const setup = async () => {
  const moduleRef: TestingModule = await Test.createTestingModule({
    imports: [TypeOrmModule.forFeature([PostEntity])],
    providers: [
      PostController,
      PostService,
      PostRepositoryService,
      PostManagementService,
    ],
  })
    .overrideProvider(getRepositoryToken(PostEntity))
    .useValue(mockRepositoryProvider())
    .compile();

  return moduleRef;
};

const user = createDummyUser();
const post = createDummyPost({ authorId: user.id });

describe("PostController [updatePost]", () => {
  let app: INestApplication;
  let moduleRef: TestingModule;
  let postService: PostService;
  let postRepositoryService: TypedMockType<PostRepositoryService>;
  let postController: PostController;

  beforeEach(async () => {
    moduleRef = await setup();
    app = moduleRef.createNestApplication();
    await app.init();

    postService = app.get<PostService>(PostService);
    postController = app.get<PostController>(PostController);
    postRepositoryService = app.get<TypedMockType<PostRepositoryService>>(
      PostRepositoryService
    );
  });

  describe("Given that a user is trying to update post,", () => {
    beforeEach(async () => {
      postRepositoryService.find.mockResolvedValue([post]);
      postRepositoryService.findOneBy.mockResolvedValue(post);
      postRepositoryService.update.mockResolvedValue({
        affected: 1,
        generatedMaps: [],
        raw: "",
      });
    });

    it("[updatePost]", async () => {
      const result = await postController.updatePost(
        user.id,
        {
          title: "title",
          body: "body",
          status: Status.Public,
        },
        user
      );

      expect(result).toEqual(
        expect.objectContaining({
          title: "title",
          body: "body",
          status: Status.Public,
        })
      );
      expect(postRepositoryService.update).toBeCalled();
    });

    it("[updatePost] throws UnauthorizedException", async () => {
      const user = createDummyUser({ id: "not allowed to edit" });

      await expect(
        postController.updatePost(
          "user not allowed to update",
          {
            title: "update title",
            body: "update body",
            status: Status.Public,
          },
          user
        )
      ).rejects.toThrow(UnauthorizedException);
      expect(postRepositoryService.update).not.toBeCalled();
    });
  });
});
