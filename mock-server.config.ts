import { MockServerConfig } from 'mock-config-server';

let cities = [
  'tomsk-tomsk-russia',
  'novosibirsk-novosibirsk-russia',
  'new-york-new-york-united-states-of-america',
  'paris-ile-de-france-france',
  'australind-western-australia-australia',
  'toronto-ontario-canada'
];

const mockServerConfig: MockServerConfig = {
  baseUrl: '/api',
  // interceptors: {
  //   response: (data, { request, setStatusCode }) => {
  //     const { token } = request.headers;
  //     if (request.url.includes('/signin')) return data;

  //     if (!token) {
  //       setStatusCode(401);
  //       return { success: false };
  //     }

  //     return data;
  //   }
  // },
  rest: {
    configs: [
      {
        method: 'post',
        path: '/cities',
        routes: [
          {
            data: { success: true },
            interceptors: {
              response: (_, { request }) => {
                const { id } = request.body;
                cities.push(id);
                return cities;
              }
            }
          }
        ]
      },
      {
        method: 'get',
        path: '/cities/:id',
        routes: [
          {
            data: { success: true },
            interceptors: {
              response: (_, { request }) => {
                const { id } = request.params;
                cities = cities.filter((city) => city !== id);
                return cities;
              }
            }
          }
        ]
      },
      {
        method: 'get',
        path: '/cities',
        routes: [
          {
            data: () => cities
          }
        ]
      },
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
      },
      {
        method: 'get',
        path: '/profile',
        routes: [
          {
            entities: {
              headers: {
                token: 'weather-app'
              }
            },
            data: () => ({
              success: true,
              profile: {
                cities,
                email: 'dima@gmail.com'
              }
            })
          }
        ],
        interceptors: {
          request: ({ setDelay }) => setDelay(2000)
        }
      }
    ]
  }
};

export default mockServerConfig;
