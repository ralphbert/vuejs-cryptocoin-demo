function pad(val) {
  return val < 10 ? `0${val}` : val;
}

export function roundFilter(value, to = 4) {
  const mult = 10 ** to;
  return Math.round(value * mult) / mult;
}

export function dateFilter(value) {
  if (typeof value === 'object') {
    const month = pad(value.getMonth() + 1);
    const day = pad(value.getDate());
    const hours = pad(value.getHours());
    const minutes = pad(value.getMinutes());
    const seconds = pad(value.getSeconds());

    return `${value.getFullYear()}.${month}.${day}, ${hours}:${minutes}:${seconds}`;
  }

  return value;
}

export default {
  round: roundFilter,
  date: dateFilter,
};
