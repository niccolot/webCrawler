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

        // Ensure scheme is valid
        if (!isValidScheme(scheme)) {
        throw new Error('Invalid URL scheme')
        }

        // Check if authority is present when required
        if (!hasAuthority(urlStr.replace(scheme + ':', ''))) {
        throw new Error('Missing authority component')
        }

        // If everything is fine, create the URL object again with the original string
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

export { normalizeURL, getURLfromHTML }