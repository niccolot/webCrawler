import { test, expect } from "@jest/globals"

import { normalizeURL } from "./crawl.js"

test('normalizeURLTest', () => {
    const url1 = 'https://blog.boot.dev/path/' 
    const url2 = 'https://blog.boot.dev/path'
    const url3 = 'http://blog.boot.dev/path/'
    const url4 = 'http://blog.boot.dev/path'
    const wrongUrl1 = 'htp://blog.boot.dev/path'
    const wrongUrl2 = 'htt://blog.boot.dev/path'
    const wrongUrl3 = 'ttp://blog.boot.dev/path'
    const wrongUrl4 = 'http//blog.boot.dev/path'
    const wrongUrl5 = 'http:/blog.boot.dev/path'
    const wrongUrl6 = 'http:blog.boot.dev/path'
    const wrongUrl7 = '://blog.boot.dev/path'
    const wrongUrl8 = '//blog.boot.dev/path'    
    
    const normalizedUrl = 'blog.boot.dev/path'

    expect(normalizeURL(url1)).toBe(normalizedUrl)
    expect(normalizeURL(url2)).toBe(normalizedUrl)
    expect(normalizeURL(url3)).toBe(normalizedUrl)
    expect(normalizeURL(url4)).toBe(normalizedUrl)
})
