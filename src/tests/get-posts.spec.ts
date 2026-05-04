import { test, expect } from '@fixtures';
import { config } from '@config/index';

test.describe(`@P0 @API @Posts GET Posts — ${config.displayName} on ${config.environment}`, () => {

  test('TC-001: GET /posts returns 200 with non-empty array', async ({ postsModule }) => {
    await test.step('Send GET /posts and assert 200 with non-empty array', async () => {
      await postsModule.getAllPosts();
    });
  });

  test('TC-002: GET /posts JSONPath extraction returns non-empty title at index 6', async ({ postsModule }) => {
    let title: string;

    await test.step('Send GET /posts and extract title at index 6', async () => {
      title = await postsModule.getPostsAndExtractTitle(6);
    });

    await test.step('Assert extracted title is a non-empty string', async () => {
      expect(title!).toBeTruthy();
      expect(typeof title!).toBe('string');
    });
  });

});
