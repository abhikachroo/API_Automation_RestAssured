import { APIRequestContext, APIResponse } from '@playwright/test';
import { ApiHelper } from '@utils/ApiHelper';
import { config } from '@config/index';
import { PostBody } from '@types/PostBody';

export class PostsApi {
  private api: ApiHelper;

  constructor(request: APIRequestContext) {
    this.api = new ApiHelper(request, config.apiUrl);
  }

  async getAllPosts(): Promise<APIResponse> {
    return this.api.get('/posts');
  }

  async getPostById(id: number): Promise<APIResponse> {
    return this.api.get(`/posts/${id}`);
  }

  async createPost(body: PostBody): Promise<APIResponse> {
    return this.api.post('/posts', body);
  }

  async updatePost(id: number, body: PostBody): Promise<APIResponse> {
    return this.api.put(`/posts/${id}`, body);
  }

  async patchPost(id: number, partial: Partial<PostBody>): Promise<APIResponse> {
    return this.api.patch(`/posts/${id}`, partial);
  }

  async deletePost(id: number): Promise<APIResponse> {
    return this.api.delete(`/posts/${id}`);
  }
}
