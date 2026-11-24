export function formatPrice(value: string | number): string {
  return `${Number(value).toLocaleString('ru-RU')} so'm`
}



export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('ru-RU')
}