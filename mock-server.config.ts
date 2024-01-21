import { MockServerConfig } from 'mock-config-server';

const popularCities = [
  'tomsk-tomsk-russia',
  'novosibirsk-novosibirsk-russia',
  'new-york-new-york-united-states-of-america',
  'paris-ile-de-france-france',
  'australind-western-australia-australia',
  'toronto-ontario-canada'
];

let cities = [
  'tomsk-tomsk-russia',
  'novosibirsk-novosibirsk-russia',
  'new-york-new-york-united-states-of-america',
  'paris-ile-de-france-france',
  'australind-western-australia-australia',
  'toronto-ontario-canada',
  'tomsk-tomsk-russia',
  'novosibirsk-novosibirsk-russia',
  'new-york-new-york-united-states-of-america',
  'paris-ile-de-france-france',
  'australind-western-australia-australia',
  'toronto-ontario-canada'
];

let profile = {
  cities,
  email: 'dima@gmail.com',
  name: 'dima'
};

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
  interceptors: {
    request: ({ setDelay }) => setDelay(1000)
  },
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
        path: '/cities',
        routes: [
          {
            data: () => cities,
            interceptors: {
              response: (data, { request }) => {
                const { limit, offset } = request.query;
                if (!limit || !offset) return data;

                const step = +offset + +limit;

                return {
                  next: step + +limit <= data.length,
                  prev: step - +limit > 0,
                  total: data.length,
                  data: data.slice(offset, step)
                };
              }
            }
          }
        ]
      },
      {
        method: 'get',
        path: '/cities/popular',
        routes: [
          {
            data: popularCities
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
        ]
      },
      {
        method: 'put',
        path: '/profile',
        routes: [
          {
            entities: {
              headers: {
                token: 'weather-app'
              }
            },
            data: {
              success: true
            },
            interceptors: {
              response: (data, { request }) => {
                profile = { ...profile, ...request.body };
                return { ...data, profile };
              }
            }
          }
        ]
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
              profile
            })
          }
        ]
      }
    ]
  }
};

export default mockServerConfig;
