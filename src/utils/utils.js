export const formatDate = (date) => {
  const formattedDate = Intl.DateTimeFormat('en', {
    year: 'numeric',
    day: '2-digit',
    month: 'long',
  }).format(date)
  return formattedDate
}
