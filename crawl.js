import { JSDOM } from 'jsdom'

const normalizeURL = (urlStr) => {
    /* 
    @param urlStr : string representing a valid URL
    @return normalized url string if input is a valid URL
    */
    try {
        const urlObj = new URL(urlStr)
        return `${urlObj.hostname}${urlObj.pathname}`.replace(/\/+$/, '')    
    } catch (error) {
        throw new Error(`${error.message}`)
    }
}

const getURLfromHTML = (htmlBody, baseURL) => {

}

export { normalizeURL, getURLfromHTML }