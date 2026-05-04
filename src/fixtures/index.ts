import { test as base } from '@playwright/test';
import { PostsApi } from '@api/PostsApi';
import { PostsModule } from '@modules/PostsModule';

type ApiFixtures = {
  postsApi: PostsApi;
  postsModule: PostsModule;
};

export const test = base.extend<ApiFixtures>({
  postsApi: async ({ request }, use) => {
    await use(new PostsApi(request));
  },
  postsModule: async ({ postsApi }, use) => {
    await use(new PostsModule(postsApi));
  },
});

export { expect } from '@playwright/test';
