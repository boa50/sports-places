import { server } from './mock/server.tsx'
import '@testing-library/jest-dom/vitest'

import.meta.env.VITE_BACKEND_URL = 'http://apimock.com'

beforeAll(() => server.listen())
afterAll(() => server.close())
