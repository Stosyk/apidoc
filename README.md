# Stosyk API Documentation
[![Build Status](https://travis-ci.org/Stosyk/apidoc.svg?branch=master)](https://travis-ci.org/Stosyk/apidoc)

Stosyk is a translations management system for software projects.
Current repo contains documentation UI for APIs:
- public
- manage
- admin

## Links

- Documentation(ReDoc):
    + https://stosyk.github.io/apidoc/public/
    + https://stosyk.github.io/apidoc/manage/
    + https://stosyk.github.io/apidoc/admin/
- SwaggerUI:
    + https://stosyk.github.io/apidoc/public/swagger-ui/
    + https://stosyk.github.io/apidoc/manage/swagger-ui/
    + https://stosyk.github.io/apidoc/admin/swagger-ui/
- Look full spec: https://stosyk.github.io/openapi-spec/

**Warning:** All above links are updated only after Travis CI finishes deployment

## Working on specification
### Install

1. Install [Node JS](https://nodejs.org/)
2. Clone repo and `cd`
    + Clone submodules `git submodule update --init --recursive`
    + Run `npm install`

### Edit specs
You can start only one instance of `swagger-editor` at the moment, choose specification which you want to edit:
- `public`
- `manage`
- `admin`

1. Run `npm start --spec public`(replace public if you need another spec)
2. Checkout console output to see where local server is started. You can use all [links](#links) by replacing https://stosyk.github.io/apidoc/ with url from the message: `Server started <url>`
3. Make changes using your favorite editor or `swagger-editor` (look for URL in console output)
4. All changes are immediately propagated to your local server, moreover all documentation pages will be automagically refreshed in a browser after each change
**TIP:** you can open `swagger-editor`, documentation and `swagger-ui` in parallel
5. Once you finish with the changes you can run tests using: `npm test`
6. All the changes with specs are saved inside submodule `openapi-spec` and should be commited separately.

### Run
If you want to run entire doc project do the following steps (note that `swagger-editor` will not be started):

1. Run `npm start`
2. Checkout console output to see where local server is started. You can use all [links](#links) (except `preview`) by replacing https://stosyk.github.io/apidoc/ with url from the message: `Server started <url>`
