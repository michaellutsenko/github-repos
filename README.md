# GitHub repositories viewer

This app allows querying basic information on GitHub repositories. The app uses
[GitHub GraphQL API](https://developer.github.com/v4/).

## Launch instructions

1. Run `npm i` or `npm install` to install dependencies
2. Create a `.env.local` file in the project's root directory
3. Inside `.env.local` add the following line:

`REACT_APP_GITHUB_ACCESS_TOKEN=token`

where `token` represents your GitHub access token. For more information on how
to generate this token see the
[official documentation](https://developer.github.com/v4/guides/forming-calls/#authenticating-with-graphql)

4. You're good to go. Run `npm start` to launch the app

## Development notes

The app is built with use of [create-react-app](https://create-react-app.dev/)

The design framework used in the app is [Material UI](https://material-ui.com/)

I provided several basic tests for the business logic. The test coverage is not
100% due to both time constraints and my personal view at testing, i.e. only
test the most vital parts of the app.

What little styling there is is done through the interface provided by Material
UI, which is based on `jss`

For communication with the API [Apollo Client](https://www.apollographql.com/)
is used. It also functions as a state container for the app, due to it being
more than enough for the purposes of the app.

Overall I tried to keep the app as small and non-demanding as possible. I
decided not to overload the code with commentaries and only put them whenever
any additional explanation is needed. Instead, I tried to make the code itself
mostly self-explanatory.
