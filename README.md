<div align="center">
<img src="public/assets/images/mirror.png" alt="mirro github" width="130"/>

<h1>
<a href="https://mirror-github.vercel.app/" target="_blank" rel="noopener noreferrer">
Mirror Github Challenge
</a>
</h1>
</div>

This is a hiring challenge to build an app with the github's graphql API with nextjs and typescript.

Links:

- [Home](https://mirror-github.vercel.app/)
- [Example repository page link](https://mirror-github.vercel.app/jamiebuilds/tinykeys)

I focused on the following features:

- **Security**: I used `next-auth` and `next _middleware` to handle redirects and make sure user is authenticated before the page is even loaded.
- **Design**: Use tailwind and radix-ui to keep the design visually consistent, responsive and accessible.
- **Performance** - Graphql queries are cached with urql caching.

## Tech Used

- next.js 12
- tailwind css
- graphql / urql
- next-auth
- react-markdown
- radix-ui
- graphql code generator (❌ failed experiment)

## Pages

### Home Page — `/`

| user not logged in   | user is logged in                         |
| -------------------- | ----------------------------------------- |
| Show sign in button. | Show list of user's starred repositories. |

### User Page — `/[user]`

| user **not** logged in                                         | user is logged in                                     |
| -------------------------------------------------------------- | ----------------------------------------------------- |
| Redirect to home(`/`) page, handled with nextjs `_middleware`. | Show the user's starred repositories with user's bio. |

#### Each repository item will show

- Links to the repository page
- Top language
- Number of stars
- A button to star/unstar the repository

### Repository Page — `/[user]/[repository]`

| user **not** logged in                                         | user is logged in                |
| -------------------------------------------------------------- | -------------------------------- |
| Redirect to home(`/`) page, handled with nextjs `_middleware`. | Show details about a repository. |

#### Repository will show

- Top languages
- Number of stars and list of watchers
- All files and folders in the repo
- A button to star/unstar the repository
- Some info about the last commit and last committer
- The default branch name
- The readme of the repository, with rendered markdown and images

## Challenges Faced

This was my first time using -

- next-auth,
- next middleware, and
- github's graphql api

So I had to learn how to use them correctly, next-auth is a great experience, next middleware is a bit janky and only next-auth beta works with it.

next-auth does not expose the `authToken` to the client by default, so it took me a while to figure out how to get it and not expose my personal api token.

I was using `getServerSideProps` to not expose my token, but that would have made the app read-only and I wanted to support mutations.

### Failed Experiment

Code - [tree/gql-codegen](https://github.com/heyitsarpit/mirror.github/tree/gql-codegen)

I haven't used a ton of graphql before hence it didn't occur to me to use graphql code generator right away.

I tried to rewrite the data fetching hooks and queries with graphql code generator, it was a decent setup and it worked except for one situation where it just wouldn't give me a correct type for the query(even with fragments), so I switched back to the old way to save time.

### Known Bugs

- Some actions aren't always successful, like starring a repository, it's a case of repository permissions for external apps.
- Readme doesn't render locally linked images/links.
- Does not work for github orgs.
