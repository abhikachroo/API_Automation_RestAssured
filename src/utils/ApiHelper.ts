import { APIRequestContext, APIResponse } from '@playwright/test';
import { Logger } from './Logger';

export class ApiHelper {
  private logger: Logger;

  constructor(private request: APIRequestContext, private baseURL: string) {
    this.logger = new Logger('ApiHelper');
  }

  async get(endpoint: string, headers?: Record<string, string>): Promise<APIResponse> {
    this.logger.info(`GET ${endpoint}`);
    const res = await this.request.get(`${this.baseURL}${endpoint}`, { headers });
    this.logger.debug(`Response ${res.status()}`, await res.json().catch(() => res.text()));
    return res;
  }

  async post(endpoint: string, data: unknown, headers?: Record<string, string>): Promise<APIResponse> {
    this.logger.info(`POST ${endpoint}`);
    const res = await this.request.post(`${this.baseURL}${endpoint}`, { data, headers });
    this.logger.debug(`Response ${res.status()}`, await res.json().catch(() => res.text()));
    return res;
  }

  async put(endpoint: string, data: unknown, headers?: Record<string, string>): Promise<APIResponse> {
    this.logger.info(`PUT ${endpoint}`);
    const res = await this.request.put(`${this.baseURL}${endpoint}`, { data, headers });
    this.logger.debug(`Response ${res.status()}`, await res.json().catch(() => res.text()));
    return res;
  }

  async patch(endpoint: string, data: unknown, headers?: Record<string, string>): Promise<APIResponse> {
    this.logger.info(`PATCH ${endpoint}`);
    const res = await this.request.patch(`${this.baseURL}${endpoint}`, { data, headers });
    this.logger.debug(`Response ${res.status()}`, await res.json().catch(() => res.text()));
    return res;
  }

  async delete(endpoint: string, headers?: Record<string, string>): Promise<APIResponse> {
    this.logger.info(`DELETE ${endpoint}`);
    const res = await this.request.delete(`${this.baseURL}${endpoint}`, { headers });
    this.logger.debug(`Response ${res.status()}`);
    return res;
  }
}
