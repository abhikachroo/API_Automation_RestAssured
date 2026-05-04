import { test, expect } from '@fixtures';
import { config } from '@config/index';
import { PostBody } from '@types/PostBody';

// postBody mirrors the payload from postReqs.java (postreq() / putreq() methods).
// Note: userId is set to 'new Post' — this is the value from the original Java source
// (posts.setUserid("new Post")), preserved for faithful migration traceability.
const postBody: PostBody = {
  userId: 'new Post',
  id: '101',
  title: 'New Post Title',
  body: 'post body added',
};

const putBody: PostBody = {
  userId: 'new Post',
  id: '101',
  title: 'Put Post Title',
  body: 'Put body Update',
};

test.describe(`@P0 @API @Posts Write Posts — ${config.displayName} on ${config.environment}`, () => {

  test('TC-003: POST /posts creates a new post and returns 201', async ({ postsModule }) => {
    await test.step('Send POST /posts with new post body and assert 201 with echoed fields', async () => {
      await postsModule.createPost(postBody);
    });
  });

  test('TC-004: PUT /posts/101 updates post and returns 200', async ({ postsModule }) => {
    await test.step('Send PUT /posts/101 with updated body and assert 200 with echoed fields', async () => {
      await postsModule.updatePost(101, putBody);
    });
  });

  test('TC-005: PATCH /posts/101 partially updates post title and returns 200', async ({ postsModule }) => {
    await test.step('Send PATCH /posts/101 with partial title body and assert 200', async () => {
      // Source: patchreq() used raw JSON { "title":"updated by Patch request" }
      // Migrated to typed Partial<PostBody> — semantically equivalent.
      await postsModule.patchPost(101, { title: 'updated by Patch request' });
    });
  });

  test('TC-006: DELETE /posts/101 deletes post and returns 200', async ({ postsModule }) => {
    await test.step('Send DELETE /posts/101 and assert 200', async () => {
      // Source: delteReq() — typo in original Java method name preserved in comment for traceability.
      await postsModule.deletePost(101);
    });
  });

  test('TC-007: GET /posts response time is within 3000ms threshold', async ({ postsModule }) => {
    await test.step('Send GET /posts and assert response time under 3000ms', async () => {
      // Threshold: 3000ms default. Source: getResTime() logged time but had no assertion bound.
      // TODO: Confirm acceptable response time SLA with project owner before merge.
      await postsModule.getPostsWithTimingAssertion(3000);
    });
  });

});
