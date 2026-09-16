// In-memory token storage only — never in localStorage or sessionStorage
let inMemoryAccessToken: string | null = null;

export const tokenStore = {
  get: () => inMemoryAccessToken,
  set: (token: string) => {
    inMemoryAccessToken = token;
  },
  clear: () => {
    inMemoryAccessToken = null;
  },
};
