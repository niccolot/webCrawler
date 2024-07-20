import fs from 'fs'
import { writeFile } from 'fs/promises'

import { normalizeURL } from './crawl.js'

const printReport = async (baseURL, 
    pages, 
    saveReport) => {
    /**
     * prints on the terminal the interal links found in the crawled page
     * sorted by number in descending order and eventually saves them in 
     * a json file
     * 
     * @param baseURL: page crawled
     * @param pages: object returned by crawlPage
     * @param saveReport: whether to save the report as .json file
     */
    console.log(`\nReport after crawling '${baseURL}':\n`)
    const sortedPages = sortByValue(pages)
    for(const k in sortedPages){
        console.log(`Found ${sortedPages[k]} internal links to '${k}'`)
    }

    if(saveReport){
        const jsonString = JSON.stringify(pages, null, 2)
        try {
            const reportName = `crawlReport_${normalizeURL(baseURL)}.json`
            if(!fs.existsSync('reports/')){
                fs.mkdirSync('reports/')
            }
            const path = `reports/${reportName}`
            await writeFile(path, jsonString)
            console.log(`\nReport succesfully saved as ${reportName}`)
        } catch (error) {
            console.log(`\nError saving report: ${error}`)
        }
    }
}

const sortByValue = (pages) => {
    const pagesArray = Object.entries(pages)
    pagesArray.sort((a, b) => b[1] - a[1])
    const sortedPages = Object.fromEntries(pagesArray)

    return sortedPages
}

export { printReport }