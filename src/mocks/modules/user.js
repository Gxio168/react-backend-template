import { faker } from '@faker-js/faker'
import { http, HttpResponse } from 'msw'

import { UserApi } from '@/api/modules/user'

const USER_LIST = [
  {
    id: '1',
    username: 'admin',
    password: '123456',
    avatar: faker.image.avatarGitHub(),
    email: 'admin@qq.com',
  },
  {
    id: '2',
    username: 'editor',
    password: '123456',
    avatar: faker.image.avatarGitHub(),
    email: 'editor@qq.com',
  },
]

const signIn = http.post(`/api${UserApi.SignIn}`, async ({ request }) => {
  const { username, password } = await request.json()

  const user = USER_LIST.find(item => item.username === username)

  if (!user || user.password !== password) {
    return HttpResponse.json({
      status: 10001,
      message: 'Incorrect username or password.',
    })
  }

  return HttpResponse.json({
    status: 0,
    message: '',
    data: {
      user,
      token: faker.string.uuid(),
    },
  })
})

export default [signIn]
