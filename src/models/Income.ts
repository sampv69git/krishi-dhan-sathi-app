
export interface Income {
  id: string;
  userId: string;
  cropId: string;
  amount: number;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  buyer: string;
  date: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
