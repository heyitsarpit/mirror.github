import { GraphQLClient } from 'graphql-request'

export const githubClient = new GraphQLClient('https://api.github.com/graphql', {
  headers: { authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
})
