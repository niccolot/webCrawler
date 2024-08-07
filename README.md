# Javascript webcrawler

Simple web crawler written in javascript with CLI interface

## How to use

```
git clone https://github.com/niccolot/webCrawler
cd webCrawler
npm install # to install dependencies
```

```
Usage: npm run start -- <url> [options]

Options:
    --save          Saves report to json file     
    --verbose       Prints to terminal every page crawled recursively
    --help          Show this help message

Example:
  npm run start -- http://example.com --save --verbose
  npm run start -- --help to print this message
```

## Example

```
npm run start -- https://wagslane.dev 
```

Will print to terminal a report listing the indexed pages in descending order of frequency

```
Report after crawling 'https://wagslane.dev':

Found 63 internal links to 'wagslane.dev'
Found 62 internal links to 'wagslane.dev/tags'
Found 62 internal links to 'wagslane.dev/about'
Found 62 internal links to 'wagslane.dev/index.xml'
Found 5 internal links to 'wagslane.dev/posts/leave-scrum-to-rugby'
Found 4 internal links to 'wagslane.dev/posts/managers-that-cant-code'
Found 4 internal links to 'wagslane.dev/posts/kanban-vs-scrum'
Found 3 internal links to 'wagslane.dev/posts/continuous-deployments-arent-continuous-disruptions'
Found 2 internal links to 'wagslane.dev/posts/dark-patterns'
Found 2 internal links to 'wagslane.dev/posts/things-i-dont-want-to-do-to-grow-business'
Found 2 internal links to 'wagslane.dev/posts/zen-of-proverbs'
Found 2 internal links to 'wagslane.dev/posts/func-y-json-api'
Found 2 internal links to 'wagslane.dev/posts/keep-your-data-raw-at-rest'
Found 2 internal links to 'wagslane.dev/posts/optimize-for-simplicit-first'
Found 2 internal links to 'wagslane.dev/posts/no-one-does-devops'
Found 2 internal links to 'wagslane.dev/posts/college-a-solution-in-search-of-a-problem'
Found 2 internal links to 'wagslane.dev/posts/guard-keyword-error-handling-golang'
Found 2 internal links to 'wagslane.dev/posts/gos-major-version-handling'
Found 2 internal links to 'wagslane.dev/posts/go-struct-ordering'
Found 2 internal links to 'wagslane.dev/posts/what-a-crazy-religion'
Found 2 internal links to 'wagslane.dev/posts/a-case-against-a-case-for-the-book-of-mormon'
Found 2 internal links to 'wagslane.dev/posts/seo-is-a-scam-job'
Found 2 internal links to 'wagslane.dev/posts/collapsing-quality-of-devto'
Found 1 internal links to 'wagslane.dev/tags/business'
Found 1 internal links to 'wagslane.dev/tags/clean-code'
Found 1 internal links to 'wagslane.dev/tags/devops'
Found 1 internal links to 'wagslane.dev/tags/education'
Found 1 internal links to 'wagslane.dev/tags/golang'
Found 1 internal links to 'wagslane.dev/tags/management'
Found 1 internal links to 'wagslane.dev/tags/philosophy'
Found 1 internal links to 'wagslane.dev/tags/writing'
Found 1 internal links to 'wagslane.dev/posts/developers-learn-to-say-no'

Report succesfully saved as crawlReport_wagslane.dev.json
```

```
npm run start -- https://wagslane.dev --save
```

Will print the report, create a 'reports' folder in the root project and save the report as json file inside the folder