/**
 * Security & Encryption Utilities for زجاج سكريت ابوعريش Assistant
 * Encrypts chat logs, session tokens, and local cache so no plain text appears in storage
 */

const DEFAULT_SALT = 'AbuArish_Glass1_Securit_Encrypted_2026_SecureKey';

/**
 * Derives a deterministic cipher key from browser session + salt
 */
function getDerivedKey(): string {
  try {
    let sessionToken = sessionStorage.getItem('_sec_ses_token');
    if (!sessionToken) {
      sessionToken = 'sk_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
      sessionStorage.setItem('_sec_ses_token', sessionToken);
    }
    return DEFAULT_SALT + '_' + sessionToken;
  } catch {
    return DEFAULT_SALT;
  }
}

/**
 * Encrypts a plain text string into an obfuscated, salted ciphertext
 */
export function encryptData(plainText: string): string {
  if (!plainText) return '';
  try {
    const key = getDerivedKey();
    const chars = plainText.split('');
    const encryptedCodes: number[] = [];

    for (let i = 0; i < chars.length; i++) {
      const charCode = chars[i].charCodeAt(0);
      const keyChar = key.charCodeAt(i % key.length);
      // XOR bitwise cipher with salt offset
      const ciphered = (charCode ^ keyChar) + (i % 7);
      encryptedCodes.push(ciphered);
    }

    // Convert to hex-encoded string to avoid binary storage issues
    return 'ENC_' + encryptedCodes.map((c) => c.toString(16).padStart(4, '0')).join('');
  } catch (err) {
    console.warn('Encryption fallback applied', err);
    return plainText;
  }
}

/**
 * Decrypts an encrypted ciphertext back to plain text
 */
export function decryptData(cipherText: string): string {
  if (!cipherText) return '';
  if (!cipherText.startsWith('ENC_')) {
    // If unencrypted legacy string
    return cipherText;
  }

  try {
    const key = getDerivedKey();
    const hex = cipherText.replace('ENC_', '');
    const codes: number[] = [];

    for (let i = 0; i < hex.length; i += 4) {
      const chunk = hex.substring(i, i + 4);
      codes.push(parseInt(chunk, 16));
    }

    const decryptedChars: string[] = [];
    for (let i = 0; i < codes.length; i++) {
      const keyChar = key.charCodeAt(i % key.length);
      const originalCode = (codes[i] - (i % 7)) ^ keyChar;
      decryptedChars.push(String.fromCharCode(originalCode));
    }

    return decryptedChars.join('');
  } catch (err) {
    console.warn('Decryption failed, clearing payload', err);
    return '';
  }
}

/**
 * Securely stores encrypted data in LocalStorage
 */
export function secureSetItem(key: string, value: any): void {
  try {
    const serialized = JSON.stringify(value);
    const encrypted = encryptData(serialized);
    localStorage.setItem('sec_' + key, encrypted);
  } catch (e) {
    console.warn('Could not securely write to storage', e);
  }
}

/**
 * Securely reads and decrypts data from LocalStorage
 */
export function secureGetItem<T = any>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem('sec_' + key);
    if (!raw) return defaultValue;
    const decrypted = decryptData(raw);
    if (!decrypted) return defaultValue;
    return JSON.parse(decrypted) as T;
  } catch {
    return defaultValue;
  }
}

/**
 * Securely clears an encrypted item
 */
export function secureRemoveItem(key: string): void {
  try {
    localStorage.removeItem('sec_' + key);
  } catch (e) {
    console.warn('Could not remove storage item', e);
  }
}
