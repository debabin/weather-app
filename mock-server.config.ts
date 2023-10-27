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
            data: { success: false }
          },
          {
            data: { success: true },
            entities: {
              body: {
                email: 'dima@gmail.com',
                password: '1234'
              }
            },
            interceptors: {
              response: (data, { setCookie, appendHeader }) => {
                setCookie('weather-app', '1234', {
                  maxAge: 3600,
                  path: '/',
                  httpOnly: true
                });
                return data;
              }
            }
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
