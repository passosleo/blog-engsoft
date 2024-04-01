export function calculateCheckDigit(digits: string, factor: number): number {
  const sum = digits
    .split("")
    .reduce((acc, digit, index) => acc + parseInt(digit) * (factor - index), 0);
  const remainder = (sum * 10) % 11;
  return remainder === 10 ? 0 : remainder;
}

export function validateCPF(cpf: string): boolean {
  const cpfNormalized = cpf.replace(/[^\d]+/g, "");
  if (cpfNormalized.length !== 11 || /^(.)\1+$/.test(cpfNormalized)) {
    return false;
  }
  const checkDigit1 = calculateCheckDigit(cpfNormalized.slice(0, 9), 10);
  if (checkDigit1 !== parseInt(cpfNormalized[9])) {
    return false;
  }
  const checkDigit2 = calculateCheckDigit(cpfNormalized.slice(0, 10), 11);
  if (checkDigit2 !== parseInt(cpfNormalized[10])) {
    return false;
  }
  return true;
}

export function validateBrazilianPhoneNumber(phoneNumber: string): boolean {
  const phoneRegex =
    /^([1-9][0-9]{0,2})?([1-9][0-9])?([1-9][0-9]{3,4})([0-9]{4})$/;
  const clearPhoneNumber = phoneNumber.replace(/[^\d]+/g, "");
  return phoneRegex.test(clearPhoneNumber);
}

export function maskPhoneNumber(phoneNumber: string): string {
  const maskedPhoneNumber = phoneNumber.replace(
    /^(\d{2})(\d{5})(\d{4})$/,
    "$1 $2-$3"
  );
  return maskedPhoneNumber;
}
