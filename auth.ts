import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'

export const {
  handlers: { GET, POST },
  auth,
  CSRF_experimental, // will be removed in future
} = NextAuth({
  providers: [GitHub, Google],
  callbacks: {
    jwt({ token, profile,account,user,session, }) {
      if (profile) {
        token.id = profile.id
        token.profile = profile.picture
      }
      return token
    },
    // authorized({ auth }) {
    //   return !!auth?.user // this ensures there is a logged in user for -every- request
    // },
  },
  pages: {
    signIn: '/login', // overrides the next-auth default signin page https://authjs.dev/guides/basics/pages
  },
})
