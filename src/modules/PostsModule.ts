import { expect } from '@playwright/test';
import { PostsApi } from '@api/PostsApi';
import { PostBody } from '@types/PostBody';
import { Logger } from '@utils/Logger';
import { config } from '@config/index';

export class PostsModule {
  private logger: Logger;

  constructor(private postsApi: PostsApi) {
    this.logger = new Logger('PostsModule');
  }

  /**
   * GET /posts — assert 200, assert non-empty array.
   * Source: getReqs.java getPosts() (ported and activated)
   */
  async getAllPosts(): Promise<void> {
    this.logger.info(`[${config.environment}] GET /posts`);
    const response = await this.postsApi.getAllPosts();
    expect(response.status()).toBe(200);
    const body = await response.json() as unknown[];
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
    this.logger.info(`GET /posts returned ${body.length} posts`);
  }

  /**
   * GET /posts — assert 200, extract title at given index.
   * Source: getReqs.java jsonPath() — extract().path("[6].title")
   */
  async getPostsAndExtractTitle(index: number): Promise<string> {
    this.logger.info(`[${config.environment}] GET /posts — extracting title at index ${index}`);
    const response = await this.postsApi.getAllPosts();
    expect(response.status()).toBe(200);
    const body = await response.json() as Array<{ title: string }>;
    const title = body[index]?.title ?? '';
    this.logger.info(`Title at index ${index}: ${title}`);
    return title;
  }

  /**
   * POST /posts — assert 201, verify response echoes input fields.
   * Source: postReqs.java postreq() — assertions added (source had none).
   */
  async createPost(body: PostBody): Promise<void> {
    this.logger.info(`[${config.environment}] POST /posts`, body);
    const response = await this.postsApi.createPost(body);
    expect(response.status()).toBe(201);
    const respBody = await response.json() as Record<string, unknown>;
    this.logger.info('POST /posts response', respBody);
    expect(respBody).toHaveProperty('title', body.title);
    expect(respBody).toHaveProperty('body', body.body);
  }

  /**
   * PUT /posts/{id} — assert 200, verify response echoes input fields.
   * Source: postReqs.java putreq() — assertions added (source had none).
   */
  async updatePost(id: number, body: PostBody): Promise<void> {
    this.logger.info(`[${config.environment}] PUT /posts/${id}`, body);
    const response = await this.postsApi.updatePost(id, body);
    expect(response.status()).toBe(200);
    const respBody = await response.json() as Record<string, unknown>;
    this.logger.info(`PUT /posts/${id} response`, respBody);
    expect(respBody).toHaveProperty('title', body.title);
    expect(respBody).toHaveProperty('body', body.body);
  }

  /**
   * PATCH /posts/{id} — assert 200.
   * Source: postReqs.java patchreq() (ported and activated).
   * Note: source used raw JSON string body; target uses typed Partial<PostBody>.
   */
  async patchPost(id: number, partial: Partial<PostBody>): Promise<void> {
    this.logger.info(`[${config.environment}] PATCH /posts/${id}`, partial);
    const response = await this.postsApi.patchPost(id, partial);
    expect(response.status()).toBe(200);
    const respBody = await response.json() as Record<string, unknown>;
    this.logger.info(`PATCH /posts/${id} response`, respBody);
    if (partial.title !== undefined) {
      expect(respBody).toHaveProperty('title', partial.title);
    }
  }

  /**
   * DELETE /posts/{id} — assert 200.
   * Source: postReqs.java delteReq() (ported and activated; typo in source preserved for traceability).
   */
  async deletePost(id: number): Promise<void> {
    this.logger.info(`[${config.environment}] DELETE /posts/${id}`);
    const response = await this.postsApi.deletePost(id);
    expect(response.status()).toBe(200);
    this.logger.info(`DELETE /posts/${id} — status ${response.status()}`);
  }

  /**
   * GET /posts — assert 200, assert elapsed time is within threshold.
   * Source: postReqs.java getResTime() (ported and activated).
   * RestAssured extract().time() has no Playwright native equivalent;
   * manual Date.now() delta used instead. Default threshold: 3000ms.
   */
  async getPostsWithTimingAssertion(maxMs: number): Promise<void> {
    this.logger.info(`[${config.environment}] GET /posts — timing assertion, max ${maxMs}ms`);
    const start = Date.now();
    const response = await this.postsApi.getAllPosts();
    const elapsed = Date.now() - start;
    expect(response.status()).toBe(200);
    this.logger.info(`Response time: ${elapsed}ms (threshold: ${maxMs}ms)`);
    expect(elapsed).toBeLessThan(maxMs);
  }
}
