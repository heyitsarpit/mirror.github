# [Mirror Github Challenge](https://mirror-github.vercel.app/)

This is a hiring challenge to build an app with the github's graphql API with nextjs and typescript.

Links -

- [Home](https://mirror-github.vercel.app/)
- [Example repository page link](https://mirror-github.vercel.app/chakra-ui/chakra-ui-vue)

I focused on the following features:

- Security: I used `next-auth` and next `\_middleware` to handle redirects and make sure user is authenticated before the page is even loaded.
- Design: Use tailwind to keep the design visually consistent.
- Performance - Graphql queries are cached with urql caching.

## Tech Used

- NextJS 12
- TailwindCSS
- Graphql / URQL
- Next-Auth
- react-markdown
- radix-ui
- graphql code generator (❌ failed experiment)

## Pages

### `/` - Home Page

if the user is not logged in - The app has a "signin" button on the home page.

if the user is logged in - The app will show the user a list of their starred repositories.

### `/[user]` - User Page

if the user is not logged in - The app will redirect the user to the home page, redirect handled with nextjs \_middleware.

if the user is logged in - The app will show the given user's list of starred repositories, also their name and bio.
Each repository item will show

- top language
- number of stars
- a button to star/unstar the repository

### `/[user]/[repository]` - Repository Page

if not logged in - same as `/[user]` route

if the user is logged in - Will show a details about a repository.
Each repository page will show

- top languages
- number of stars and watchers
- All files and folders in the repo
- a button to star/unstar the repository
- Some info about the last commit and last committer
- The default branch
- The readme of the repository, with rendered markdown and images

## Challenges Faced

This was my first time using -

- next-auth and
- next middleware, and
- github' graphql API

So I had to learn how to use them correctly, next-auth is a great experience, next middleware is a bit janky and only next-auth beta works with it.

### Failed Experiment

Code - [tree/gql-codegen](https://github.com/heyitsarpit/mirror.github/tree/gql-codegen)

I haven't used a ton of graphql before hence it didn't occur to me to use graphql code generator right away.

I tried to rewrite the data fetching hooks and queries with graphql code generator, it was a decent setup and it worked except for one situation where it just wouldn't give me a correct type for the query(even with fragments), so I switched back to the old way to save time.
