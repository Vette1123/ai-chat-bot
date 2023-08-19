import type { DefaultSession, Profile, User } from 'next-auth'

type UserId = string

declare module 'next-auth' {
  // augment next-auth DefaultSession with custom properties
  //   visit https://next-auth.js.org/getting-started/typescript for more info
  interface Profile {
    id: UserId
    avatar_url: string
  }

  interface Session {
    user: User & {
      id: UserId
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: UserId
  }
}
