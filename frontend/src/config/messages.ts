export const messages = {
  response: {
    error: {
      default: "Problema com o serviço!",
    },
  },
  validations: {
    passwordValidation: {
      lessThanTreeSequentialCharacterUpperCase:
        "Máximo de duas letras sequenciais maiúsculas",
      lessThanTreeSequentialCharacterLowerCase:
        "Máximo de duas letras sequenciais minusculas",
      minimumOneLetterLowerCase: "Precisa ter no mínimo uma letra minuscula",
      minimumOneLetterUpperCase: "Precisa ter no mínimo uma letra maiúscula",
      lessThanTreeSequentialDigits: "Máximo de três dígitos sequenciais",
      minimumOneSymbol: "Precisa ter no mínimo um Símbolo",
      minimumOneDigit: "Precisa ter no mínimo um dígito",
      isEqualPassword: "As senhas não são iguais",
    },
    isRequired: "Campo obrigatório",
    date: {
      validDate: "Selecione uma data valida",
    },
    string: {
      isNotMoreThanExpectedLength:
        "O tamanho do campo não é maior que o esperado",
      isMinThanExpectedLength: "O tamanho do campo é menor que o esperado",
      isMoreThanExpectedLength: "O tamanho do campo é maior que o esperado",
      isNotEqualLength: "O tamanho do campo é diferente que o esperado",
      isNotValidEmail: "E-mail inválido",
      isNotEqual: "Os campos não são iguais",
      isEmpty: "O campo está vazio",
      isMinThenEight: "O valor deve ser maior ou igual a 8 digitos",
      isMinThenThree: "O valor deve ser maior ou igual a 3 digitos",
      isMoreThenFifty: "O valor deve ser menor que 50 digitos",
      selectInvitedUser: "Selecione ao menos um usuário",
    },
  },
};
