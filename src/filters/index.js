export function roundFilter(value) {
  return Math.round(value * 10000) / 10000;
}

export default {
  round: roundFilter,
};
