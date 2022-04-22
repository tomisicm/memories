import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { getDummyPost } from "../../../__tests__/helpers/posts";
import PostsService from "../posts-service";
import { IPost } from "../../../types/posts";

const axiosMock = new MockAdapter(axios);

const post: IPost = getDummyPost();

describe("PostsService", () => {
  let postsService: typeof PostsService;

  beforeAll(() => {
    axiosMock.onGet(new RegExp("/posts")).reply(200, [post]);

    postsService = PostsService;
  });

  describe("[getAllstatus]", () => {
    it("to be 200", async () => {
      const results = await postsService.getAll();

      expect(results).toStrictEqual<IPost[]>([post]);
    });
  });
});
