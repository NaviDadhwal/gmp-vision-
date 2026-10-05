import crypto from 'crypto';

/**
 * Timing-safe comparison wrapper to prevent timing attacks on token hashes.
 * Follows instructions.md Section 4.5
 */
export function safeCompare(a: string, b: string): boolean {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
}
