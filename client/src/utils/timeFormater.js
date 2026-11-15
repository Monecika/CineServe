export const dateFormater = (time) => {
  return new Date(time).toLocaleDateString();
}

export const timeFormater = (time) => {
  return new Date(time).toLocaleTimeString('en-GB', {
    hour: '2-digit', minute: '2-digit',
  });
}

export const localDateTimeFormater = (time) => {
  const date = new Date(time)

  return new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  )
    .toISOString()
    .slice(0, 16)
}
