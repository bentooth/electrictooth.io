export function getDate() {
  let utcDate = new Date(Date.now())
  return utcDate.toUTCString()
}

export function financial(x) {
  return Number.parseFloat(x).toFixed(4);
}