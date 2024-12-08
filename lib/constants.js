export const USER_ROLES = {
  ANONYMOUS: "anonymous",
  FREE: "free",
  PRO: "pro",
};

export const FEATURES = {
  BASIC: {
    MAX_PALETTES: 3,
    MAX_TYPOGRAPHY_SETTINGS: 1,
    CAN_EXPORT: false,
    CAN_SAVE: false,
  },
  PRO: {
    MAX_PALETTES: Infinity,
    MAX_TYPOGRAPHY_SETTINGS: Infinity,
    CAN_EXPORT: true,
    CAN_SAVE: true,
  },
};

export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: "Invalid login credentials",
  EMAIL_IN_USE: "Email already registered",
  WEAK_PASSWORD: "Password should be at least 6 characters",
};

export const ROUTES = {
  HOME: "/",
  LOGIN: "/auth/login",
  SIGNUP: "/auth/signup",
  WORKSPACE: "/workspace",
  PROFILE: "/profile",
  PRICING: "/pricing",
};
