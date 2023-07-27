export function validateFatecEmail(email) {
  const emailRegex = /^[a-z0-9.]+@fatec.sp.gov.br$/;
  return emailRegex.test(email);
}
