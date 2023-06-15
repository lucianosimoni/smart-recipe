//🟢 -- MISSING -- 🟢//
export function missingBody(res) {
  return res.status(400).json({
    error: {
      code: "MISSING_BODY",
      message: "req body is missing arguments.",
    },
  });
}
export function missingQuery(res) {
  return res.status(400).json({
    error: {
      code: "MISSING_QUERY",
      message: "URL queries are missing arguments.",
    },
  });
}
export function missingParams(res) {
  return res.status(400).json({
    error: {
      code: "MISSING_PARAMS",
      message: "URL params are missing arguments.",
    },
  });
}
export function missingAuth(res) {
  return res.status(401).json({
    error: { code: "MISSING_AUTH", message: "Authorization header missing" },
  });
}
export function missingToken(res) {
  return res.status(401).json({
    error: { code: "MISSING_TOKEN", message: "Bearer token missing" },
  });
}

// 🟢 -- INVALID -- 🟢 //
export function invalidAuth(res) {
  return res.status(401).json({
    error: { code: "INVALID_AUTH", message: "Authorization header is invalid" },
  });
}
export function invalidPasswordLength(res) {
  return res.status(400).json({
    error: {
      code: "INVALID_PASSWORD_LENGTH",
      message: "Password must be at least 6 characters long.",
    },
  });
}
export function invalidEmailOrPassword(res) {
  return res.status(401).json({
    error: {
      code: "INVALID_EMAIL_PASSWORD",
      message: "Email or Password is invalid",
    },
  });
}
export function userIdNotFound(res) {
  return res.status(404).json({
    error: {
      code: "ID_NOT_FOUND",
      message: "User ID does not exist",
    },
  });
}
export function userEmailNotFound(res) {
  return res.status(404).json({
    error: {
      code: "EMAIL_NOT_FOUND",
      message: "User Email does not exist",
    },
  });
}

// 🟢 -- CONFLICT -- 🟢 //
export function usernameInUse(res) {
  return res.status(409).json({
    error: {
      code: "USERNAME_IN_USE",
      message: "Username is already in use",
    },
  });
}
export function emailInUse(res) {
  return res.status(409).json({
    error: {
      code: "EMAIL_IN_USE",
      message: "Email is already in use",
    },
  });
}
