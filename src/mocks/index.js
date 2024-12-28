import { setupWorker } from 'msw/browser'

import userMockApi from './modules/user'

const handlers = [...userMockApi]
const worker = setupWorker(...handlers)

export default worker
