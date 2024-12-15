function getFormattedDate(dateString) {
  const date = new Date(Date.parse(dateString));

  return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
}

export {getFormattedDate}
