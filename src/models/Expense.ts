
export interface Expense {
  id: string;
  userId: string;
  cropId?: string;
  type: 'seed' | 'fertilizer' | 'pesticide' | 'labor' | 'equipment' | 'others';
  amount: number;
  description: string;
  date: Date;
  receipt?: string; // URL to uploaded receipt image
  createdAt: Date;
  updatedAt: Date;
}
