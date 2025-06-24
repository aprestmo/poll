export const NumberFormat = (value: number) =>
  value >= 10000 ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : value.toString()
