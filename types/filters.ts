export enum OrderByEnum {
  none = 'Sin ordenamiento',
  title_asc = 'Título ↑',
  title_desc = 'Título ↓',
  price_asc = 'Precio ↑',
  price_desc = 'Precio ↓'
}

export type OrderType = keyof typeof OrderByEnum;