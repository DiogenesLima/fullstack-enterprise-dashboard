export const useFormatters = () => {
  const { locale } = useI18n()

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat(locale.value === 'pt' ? 'pt-BR' : locale.value === 'es' ? 'es-ES' : 'en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(new Date(date))
  }

  return {
    formatDate
  }
}