export interface Item {
  id: string;
  name: string;
  stockCount: number;
  threshold: number;
  costPrice: number;
  salePrice: number;
  arrivalDate: Date;
  supplierId: string;
  createdAt: Date;
  updatedAt: Date;
}

export const items: Item[] = [];