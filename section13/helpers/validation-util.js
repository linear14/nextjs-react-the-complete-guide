const createError = (errorMessage) => ({ isValid: false, errorMessage });
const passValidation = { isValid: true };

export const checkEmail = (email) => {
  if (!email) {
    return createError("값이 비어있습니다.");
  } else if (!email.includes("@")) {
    return createError("이메일 형식이 맞지 않습니다.");
  }
  return passValidation;
};

export const checkPassword = (password) => {
  if (!password) {
    return createError("값이 비어있습니다.");
  } else if (password.trim().length < 8) {
    return createError("비밀번호는 최소 8자리 이상이어야 합니다.");
  }
  return passValidation;
};
