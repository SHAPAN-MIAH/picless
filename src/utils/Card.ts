import { ProviderType } from '../types/PaymentTypes'
// Providers - Patterns

// VISA: ^4[0-9]{12}(?:[0-9]{3})?$
// MasterCard: ^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$
// American Express: ^3[47][0-9]{13}$
// Diners: ^3(?:0[0-5]|[68][0-9])[0-9]{11}$
// Discover: ^6(?:011|5[0-9]{2})[0-9]{12}$
// JCB: ^(?:2131|1800|35\d{3})\d{11}$

export const validateCard = (cardNumber: string) => {
  if (/[^0-9-\s]+/.test(cardNumber)) return false

  let nCheck = 0
  let bEven = false
  cardNumber = cardNumber.replace(/\D/g, '')

  for (let n = cardNumber.length - 1; n >= 0; n--) {
    const cDigit = cardNumber.charAt(n)
    let nDigit = parseInt(cDigit, 10)

    if (bEven && (nDigit *= 2) > 9) nDigit -= 9

    nCheck += nDigit
    bEven = !bEven
  }

  return nCheck % 10 === 0
}

export const getCardProvider = (cardNumber: string): ProviderType | null => {
  const visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/
  const masterCardRegex = /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/
  const americanExpressRegex = /^3[47][0-9]{13}$/
  const dinnersRegex = /^6(?:011|5[0-9]{2})[0-9]{12}$/
  const discoverRegex = /^6(?:011|5[0-9]{2})[0-9]{12}$/
  const jcbRegex = /^(?:2131|1800|35\d{3})\d{11}$/

  if (visaRegex.test(cardNumber)) return 'VISA'
  if (masterCardRegex.test(cardNumber)) return 'MASTER_CARD'
  if (americanExpressRegex.test(cardNumber)) return 'AMERICAN_EXPRESS'
  if (dinnersRegex.test(cardNumber)) return 'DINNERS'
  if (discoverRegex.test(cardNumber)) return 'DISCOVER'
  if (jcbRegex.test(cardNumber)) return 'JCB'

  return null
}
