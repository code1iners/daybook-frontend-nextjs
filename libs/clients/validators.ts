export const isPasswordValid = (text: string) =>
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(text);

export const isEmailValid = (text: string) =>
  /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi.test(text);

export const isFuture = (text: string) => new Date(text).getTime() < Date.now();
