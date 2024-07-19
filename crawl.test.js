import { test, expect } from "@jest/globals"

import { normalizeURL, getURLfromHTML } from "./crawl.js"

describe('normalizeURL', () => {
    test('should return normalized URL for a valid URL', () => {
        expect(normalizeURL('http://blog.boot.dev/path/')).toBe('blog.boot.dev/path')
        expect(normalizeURL('http://blog.boot.dev/path')).toBe('blog.boot.dev/path')
        expect(normalizeURL('https://example.com/')).toBe('example.com')
    })

    test('should throw an error for an invalid URL', () => {
        expect(() => normalizeURL('http:blog.boot.dev/path')).toThrow('Missing authority component')
        expect(() => normalizeURL('htp://blog.boot.dev/path')).toThrow('Invalid URL scheme')
        expect(() => normalizeURL('')).toThrow('URL is empty')
    })

    test('should handle URLs without a trailing slash correctly', () => {
        expect(normalizeURL('http://example.com')).toBe('example.com')
    })

    test('should handle URLs with multiple trailing slashes correctly', () => {
        expect(normalizeURL('http://example.com///')).toBe('example.com')
    })
})

describe('getURLfromHTML', () => {
    const htmlString1 = '<html><body><a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a></body></html>'
    const htmlString2 = '<html><body><a href="/news"></a></body></html>'
    const htmlString3 = '<html><body><a href="https://blog.boot.dev"></a><a href="https://google.com"></a></body></html>'
    const htmlString4 = '<html><body><p>Go to Boot.dev</p></body></html>'
    const htmlString5 = '<html><body><a></a></body></html>'

    const baseUrl = 'https://blog.boot.dev'

    test('should extract the link', () => {
        expect(getURLfromHTML(htmlString1, baseUrl)).toStrictEqual(['https://blog.boot.dev/'])
    })

    test('should relative paths to absolute paths', () => {
        expect(getURLfromHTML(htmlString2, baseUrl)).toStrictEqual(['https://blog.boot.dev/news'])
    })

    test('should extract all the links if multiple are present', () => {
        expect(getURLfromHTML(htmlString3, baseUrl)).toStrictEqual(['https://blog.boot.dev/', 'https://google.com/'])
    })

    test('should extract nothing if no links are present', () => {
        expect(getURLfromHTML(htmlString4, baseUrl)).toStrictEqual([])
    })

    test('should extract nothing if no links are present', () => {
        expect(getURLfromHTML(htmlString5, baseUrl)).toStrictEqual([])
    })
})
