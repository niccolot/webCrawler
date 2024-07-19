import { crawlPage } from "./crawl.js"

function main() {
    const argv = process.argv.slice(2)
    if(argv.length !== 1) {
        throw new Error('Usage: npm run start <baseURL>')
    }
    else{
        const baseURL = argv[0]
        console.log(`Crawling ${baseURL} as base URL`)
        crawlPage(baseURL)
    }
}

main()