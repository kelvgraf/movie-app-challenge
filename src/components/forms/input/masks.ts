export default {
  cep(value: string) {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1')
  },
  cpf(value: string) {
    return value
      .replace(/[^\d]/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1')
  },
  date(value: string) {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\/\d{4})\d+?$/, '$1')
  },
  phone(value: string) {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
      .replace(/(-\d{4})\d+?$/, '$1')
  },
  number(value: string) {
    return value.replace(/[^\d]/g, '')
  },
  qtd(value: string) {
    value = value.replace(/[^\d,]/g, '')

    if (value.startsWith('0') && !value.startsWith('0,')) {
      value = value.slice(1)
    }

    const firstCommaIndex = value.indexOf(',')
    if (firstCommaIndex !== -1) {
      const beforeComma = value.slice(0, firstCommaIndex).slice(0, 12)
      const afterComma = value
        .slice(firstCommaIndex + 1)
        .replace(/,/g, '')
        .slice(0, 3)

      value = `${beforeComma},${afterComma}`
    } else {
      value = value.slice(0, 12)
    }

    return value
  }
}
