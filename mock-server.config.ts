import type { MockServerConfig } from 'mock-config-server';

const mockServerConfig: MockServerConfig = {
  rest: {
    baseUrl: '/api',
    configs: [
      {
        method: 'post',
        path: '/signin',
        routes: [
          {
            data: { success: false, error: 'Invalid credentials' }
          },
          {
            data: { success: true, token: 'weather-app' },
            entities: {
              body: {
                email: 'dima@gmail.com',
                password: '1234'
              }
            }
          },
          {
            entities: {
              body: {
                email: 'dima@gmail.com',
                password: {
                  checkMode: 'exists'
                }
              }
            },
            data: { success: false, error: 'Invalid password' }
          }
        ],
        interceptors: {
          request: async ({ setDelay }) => {
            await setDelay(2000);
          }
        }
      }
    ]
  }
};

export default mockServerConfig;
