export function phoneValidator(phone) {
  const re = /7(?:(?:[12][0-9])|(?:0[0-8])|(?:9[0-2]))[0-9]{6}/
  if (!phone) return "Phone can't be empty."
  if (!re.test(phone)) return 'Ooops! We need a valid phone number.'
  return ''
}
