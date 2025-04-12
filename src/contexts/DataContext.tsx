
import React, { createContext, useContext, useState } from 'react';
import { Crop } from '../models/Crop';
import { Expense } from '../models/Expense';
import { Income } from '../models/Income';
import { useAuth } from './AuthContext';

interface DataContextType {
  crops: Crop[];
  expenses: Expense[];
  incomes: Income[];
  addCrop: (crop: Omit<Crop, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => Promise<Crop>;
  addExpense: (expense: Omit<Expense, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => Promise<Expense>;
  addIncome: (income: Omit<Income, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => Promise<Income>;
  getTotalExpenses: (cropId?: string) => number;
  getTotalIncome: (cropId?: string) => number;
  getProfit: (cropId?: string) => number;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [crops, setCrops] = useState<Crop[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [incomes, setIncomes] = useState<Income[]>([]);

  // Add a new crop
  const addCrop = async (cropData: Omit<Crop, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<Crop> => {
    if (!user) throw new Error('User must be logged in');
    
    const newCrop: Crop = {
      id: Date.now().toString(),
      userId: user.id,
      ...cropData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setCrops((prevCrops) => [...prevCrops, newCrop]);
    return newCrop;
  };

  // Add a new expense
  const addExpense = async (expenseData: Omit<Expense, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<Expense> => {
    if (!user) throw new Error('User must be logged in');
    
    const newExpense: Expense = {
      id: Date.now().toString(),
      userId: user.id,
      ...expenseData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
    return newExpense;
  };

  // Add a new income
  const addIncome = async (incomeData: Omit<Income, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<Income> => {
    if (!user) throw new Error('User must be logged in');
    
    const newIncome: Income = {
      id: Date.now().toString(),
      userId: user.id,
      ...incomeData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setIncomes((prevIncomes) => [...prevIncomes, newIncome]);
    return newIncome;
  };

  // Calculate total expenses
  const getTotalExpenses = (cropId?: string): number => {
    return expenses
      .filter((expense) => !cropId || expense.cropId === cropId)
      .reduce((total, expense) => total + expense.amount, 0);
  };

  // Calculate total income
  const getTotalIncome = (cropId?: string): number => {
    return incomes
      .filter((income) => !cropId || income.cropId === cropId)
      .reduce((total, income) => total + income.amount, 0);
  };

  // Calculate profit
  const getProfit = (cropId?: string): number => {
    return getTotalIncome(cropId) - getTotalExpenses(cropId);
  };

  const value = {
    crops,
    expenses,
    incomes,
    addCrop,
    addExpense,
    addIncome,
    getTotalExpenses,
    getTotalIncome,
    getProfit,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
