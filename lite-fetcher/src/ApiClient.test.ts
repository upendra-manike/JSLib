import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ApiClient } from './ApiClient';

// Mock fetch
global.fetch = vi.fn();

describe('ApiClient', () => {
  let api: ApiClient;

  beforeEach(() => {
    api = new ApiClient({ baseURL: 'https://api.example.com' });
    vi.clearAllMocks();
    // Clear localStorage
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }
  });

  it('should make GET request', async () => {
    const mockData = { id: 1, name: 'Test' };
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      status: 200,
      statusText: 'OK',
      headers: new Headers(),
      json: async () => mockData,
    });

    const response = await api.get('/users/1');

    expect(response.data).toEqual(mockData);
    expect(response.status).toBe(200);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.example.com/users/1',
      expect.objectContaining({ method: 'GET' })
    );
  });

  it('should make POST request', async () => {
    const mockData = { id: 1, name: 'New User' };
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      status: 201,
      statusText: 'Created',
      headers: new Headers(),
      json: async () => mockData,
    });

    const response = await api.post('/users', { name: 'New User' });

    expect(response.data).toEqual(mockData);
    expect(response.status).toBe(201);
  });

  it('should cache GET requests', async () => {
    const mockData = { id: 1, name: 'Test' };
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      status: 200,
      statusText: 'OK',
      headers: new Headers(),
      json: async () => mockData,
    });

    // First request
    const response1 = await api.get('/users/1', { cache: true });
    expect(response1.cached).toBe(false);

    // Second request (should be cached)
    const response2 = await api.get('/users/1', { cache: true });
    expect(response2.cached).toBe(true);
    expect(response2.data).toEqual(mockData);

    // fetch should only be called once
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('should respect cache TTL', async () => {
    const mockData = { id: 1, name: 'Test' };
    (global.fetch as any).mockResolvedValue({
      ok: true,
      status: 200,
      statusText: 'OK',
      headers: new Headers(),
      json: async () => mockData,
    });

    // First request with 100ms TTL
    await api.get('/users/1', { cache: { ttl: 100 } });

    // Second request immediately (should be cached)
    const response1 = await api.get('/users/1', { cache: { ttl: 100 } });
    expect(response1.cached).toBe(true);

    // Wait for TTL to expire
    await new Promise((resolve) => setTimeout(resolve, 150));

    // Third request after TTL (should fetch again)
    const response2 = await api.get('/users/1', { cache: { ttl: 100 } });
    expect(response2.cached).toBe(false);
  });

  it('should handle errors', async () => {
    (global.fetch as any).mockRejectedValueOnce(new Error('Network error'));

    await expect(api.get('/users/1')).rejects.toThrow();
  });
});

