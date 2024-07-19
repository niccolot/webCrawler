import minimist from "minimist"

import { crawlPage } from "./crawl.js"
import { printReport } from "./report.js"

const helpMessage = `
Usage: npm run start -- <url> [options]

Options:
    --save          Saves report to json file     
    --verbose       Prints to terminal every page crawled recursively
    --help          Show this help message

Example:
  npm run start -- http://example.com --save --verbose
  npm run start -- --help to print this message
`

const printHelp = () => {
    console.log(helpMessage);
    process.exit(0);
}
  
const argv = minimist(process.argv.slice(2), {
    boolean: ['save', 'verbose'],
    default: {
      save: false,
      verbose: false
    }
})

if (argv.help) {
    printHelp();
}

const baseURL = argv._[0]
const save = argv.save || false
const verbose = argv.verbose || false

if(!baseURL || argv._.length > 1) {
    throw new Error('Usage: npm run start -- <baseURL> [--save] [--verbose]')
}

const main = async (baseURL, save, verbose) => {
    console.log(`Crawling '${baseURL}' as base URL\n`)
    const pages = await crawlPage(baseURL, verbose)
    printReport(baseURL, pages, save)
}

main(baseURL, save, verbose)
 