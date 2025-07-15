export const FIXED_USERNAME = 'Luke';
export const FIXED_PASSWORD = 'DadSucks';

export function validateUser(username: string, password: string): boolean {
  return username === FIXED_USERNAME && password === FIXED_PASSWORD;
}