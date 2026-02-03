// core/security/pin.ts

export async function hashPin(pin: string): Promise<string> {
  const enc = new TextEncoder();
  const data = enc.encode(pin);

  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  return hashArray
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function verifyPin(
  pin: string,
  hash: string
): Promise<boolean> {
  const hashed = await hashPin(pin);
  return hashed === hash;
}
