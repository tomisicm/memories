export const BROWSER_KEY_SIGNIN = "memory-signin-details";
export const BROWSER_KEY_SIGNED_IN = "memory-signed-in";
export const BROWSER_KEY_JWT = "memory-user-jwt";

export enum AuthSessionAction {
  SIGN_IN = "SIGN-IN",
  SIGN_UP = "SIGN-UP",
  SIGNED_UP = "SIGNED-UP",
}

export interface SessionStorage {
  [BROWSER_KEY_SIGNIN]: {
    userId: string | null;
    username: string;
    email: string;
  };
  [BROWSER_KEY_SIGNED_IN]: boolean;
  [BROWSER_KEY_JWT]: string;
}

type sessionStorageItem = keyof SessionStorage;

const getValueForKeyInSessionStorage = <K extends sessionStorageItem>(
  key: K
): SessionStorage[K] | null => {
  if (typeof window !== "undefined") {
    const item = sessionStorage?.getItem(key);
    try {
      return item ? (JSON.parse(item) as SessionStorage[K]) : null;
    } catch (e) {
      return null;
    }
  }
  return null;
};

const removeFromSessionStorage = (key: sessionStorageItem): void => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(key);
  }
};

const storeInSessionStorage = <K extends sessionStorageItem>(
  key: K,
  item: SessionStorage[K]
): void => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(key, JSON.stringify(item));
  }
};

export {
  getValueForKeyInSessionStorage,
  removeFromSessionStorage,
  storeInSessionStorage,
};
