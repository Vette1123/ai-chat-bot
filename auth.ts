import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'

// its only used this way, not in @lib/auth-options.ts to support vercel edge functions
export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  // didn't provide a secret, so it will be generated automatically ( when the secrets in .env files 
  // starts with AUTH_ keyword )
  providers: [GitHub, Google],
  callbacks: {
    jwt({ token, profile }) {
      if (profile) {
        token.id = profile.id
        token.profile = profile.picture
        if (!profile.id) {
          token.id = profile.sub
        }
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
