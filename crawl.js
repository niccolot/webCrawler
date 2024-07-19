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

const crawlPage = async (currentURL) => {
    try {
        const response = await fetch(currentURL, {
            method: 'GET',
        })

        if(response.status >= 400) { throw new Error(`Error: status code ${response.status}`)}
        
        const contentType = response.headers.get('content-type')
        if(!contentType.startsWith('text/html')) { throw new Error('Error: content type is not text/html')}
        
        const body = await response.text()
        console.log(body)

    } catch (error) {
        console.log(error)
    }
}


export { normalizeURL, getURLfromHTML, crawlPage }