import { JSDOM } from 'jsdom'

const validSchemes = ['http', 'https', 'ftp', 'ftps']

const isValidScheme = (scheme) => {
  return validSchemes.includes(scheme)
}

const hasAuthority = (urlStr) => {
  return /^\/\/[^\/]+/.test(urlStr)
}

const normalizeURL = (urlStr) => {
    /**  
    * @param urlStr: string representing a valid URL
    * @return: normalized url string if input is a valid URL
    */
    try {
        if(urlStr === '') { throw new Error('URL is empty')}

        // Parse the URL to separate scheme
        const parsedURL = new URL(urlStr, 'http://dummy-base')
        const scheme = parsedURL.protocol.slice(0, -1); // remove the trailing ":"

        if (!isValidScheme(scheme)) {
            throw new Error('Invalid URL scheme')
        }

        if (!hasAuthority(urlStr.replace(scheme + ':', ''))) {
            throw new Error('Missing authority component')
        }

        const urlObj = new URL(urlStr)

        return `${urlObj.hostname}${urlObj.pathname}`.replace(/\/+$/, '')  

    } catch (error) {
        throw new Error(`${error.message}`)
    }
}

const getURLfromHTML = (htmlBody, baseURL) => {
    /**
     * @param htmlBody:  HTML string containing some links
     * @param baseURL: base URL string of the website being crawled
     * @return un-normalized array of all the URLs found within the HTML
     */
    const dom = new JSDOM(htmlBody)
    const links = dom.window.document.querySelectorAll('a[href]')
    const URLs = Array.from(links).map(link => {
        const url = new URL(link.getAttribute('href'), baseURL)
        return url.href
    })

    return URLs
    
}


const crawlPage = async (baseURL, currentURL = baseURL, pages = {}) => {
    /**
     * actual webcrawler
     * 
     * when a url is given it starts to crawl it recursively searcing for
     * additional links contained in the HTML body. It returns an object
     * containing the counts of each subdomain staring from the baseURL
     * 
     * @param baseURL: URL from where to start crawling
     * @param currentURl: URL in which the recursive function is crawling
     * @return pages: object containing the indexing of the site
     */
    try {
        const baseURLObj = new URL(baseURL)
        const currentURLObj = new URL(currentURL)
        
        // if the domain changes returns, the crawler will analyze
        // just one domain, not the entire internet
        if(!(baseURLObj.hostname === currentURLObj.hostname)){
            return pages
        }

        const currentURLNorm = normalizeURL(currentURL)
        if(currentURLNorm in pages){
            pages[currentURLNorm]++
            return pages
        }else{
            pages[currentURLNorm] = 1
        }

        const body = await parseHTML(currentURL)
        const URLs = getURLfromHTML(body, currentURL)
        for (const url of URLs){
            pages = await crawlPageR(currentURL, url, pages)
        }

        return pages

    } catch (error) {
        console.log(error)
    }
}

const parseHTML = async (url) => {
    /**
     * @param url: url to parse as string
     * @return the HTML body contained in the page pointed by the url
     */
    try {
        const response = await fetch(url, {
            method: 'GET'
        })
        /**
        if(response.status >= 400) { throw new Error(`Error: status code ${response.status}`)}
        
        const contentType = response.headers.get('content-type')
        if(!contentType.startsWith('text/html')) { throw new Error('Error: content type is not text/html')} 
         */
        if(response.status >= 400) { 
            console.log(`Error: status code ${response.status}`) 
            return
        }
        
        const contentType = response.headers.get('content-type')
        if(!contentType.startsWith('text/html')) {
            console.log('Error: content type is not text/html')
            return
        }
        
        
        const body = await response.text()

        return body

    } catch (error) {
        console.log(error)
    }
}

export { normalizeURL, getURLfromHTML, crawlPage, crawlPageR }