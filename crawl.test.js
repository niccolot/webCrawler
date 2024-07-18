import { test, expect } from "@jest/globals"

import { normalizeURL } from "./crawl.js"


describe('normalizeURL', () => {
    test('should return normalized URL for a valid URL', () => {
        expect(normalizeURL('http://blog.boot.dev/path/')).toBe('blog.boot.dev/path')
        expect(normalizeURL('http://blog.boot.dev/path')).toBe('blog.boot.dev/path')
        expect(normalizeURL('https://example.com/')).toBe('example.com')
    })

    test('should throw an error for an invalid URL', () => {
        expect(() => normalizeURL('invalid-url')).toThrow('Invalid URL')
        expect(() => normalizeURL('')).toThrow('Invalid URL')
    })

    test('should handle URLs without a trailing slash correctly', () => {
        expect(normalizeURL('http://example.com')).toBe('example.com')
    })

    test('should handle URLs with multiple trailing slashes correctly', () => {
        expect(normalizeURL('http://example.com///')).toBe('example.com')
    })
})


describe('getURLfromHTML', () => {
    test('', () => {

    })
})
