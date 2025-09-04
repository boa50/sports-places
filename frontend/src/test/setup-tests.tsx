import { server } from './mock/server.tsx'

import.meta.env.VITE_BACKEND_URL = 'http://apimock.com'

beforeAll(() => server.listen())
afterAll(() => server.close())
