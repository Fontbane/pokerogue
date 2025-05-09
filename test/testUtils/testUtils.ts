import i18next, { type ParseKeys } from "i18next";
import { vi } from "vitest";

/**
 * Sets up the i18next mock.
 * Includes a i18next.t mocked implementation only returning the raw key (`(key) => key`)
 *
 * @returns A spy/mock of i18next
 */
export function mockI18next() {
  return vi.spyOn(i18next, "t").mockImplementation((key: ParseKeys) => key);
}

/**
 * Creates an array of range `start - end`
 *
 * @param start start number e.g. 1
 * @param end end number e.g. 10
 * @returns an array of numbers
 */
export function arrayOfRange(start: number, end: number) {
  return Array.from({ length: end - start }, (_v, k) => k + start);
}

/**
 * Utility to get the API base URL from the environment variable (or the default/fallback).
 * @returns the API base URL
 */
export function getApiBaseUrl() {
  return import.meta.env.VITE_SERVER_URL ?? "http://localhost:8001";
}
