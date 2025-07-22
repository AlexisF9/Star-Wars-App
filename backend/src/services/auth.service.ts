export function validateUser(username: string, password: string): boolean {
  return username === process.env.FIXED_USERNAME && password === process.env.FIXED_PASSWORD;
}