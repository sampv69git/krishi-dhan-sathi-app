import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowUpCircle, ArrowDownCircle, TrendingUp, Leaf, ShoppingBag, IndianRupee } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { crops, expenses, incomes, getTotalExpenses, getTotalIncome, getProfit } = useData();
  const navigate = useNavigate();

  const totalExpenses = getTotalExpenses();
  const totalIncome = getTotalIncome();
  const totalProfit = getProfit();

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-krishi-green">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome back, {user?.displayName || 'Farmer'}!
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-krishi-green-light to-krishi-green text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Total Profit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹{totalProfit.toLocaleString()}</div>
            <p className="text-green-100 text-sm mt-1">Financial summary</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <ArrowUpCircle className="mr-2 h-5 w-5 text-green-500" />
              Total Income
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹{totalIncome.toLocaleString()}</div>
            <p className="text-gray-500 text-sm mt-1">{incomes.length} transactions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <ArrowDownCircle className="mr-2 h-5 w-5 text-red-500" />
              Total Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹{totalExpenses.toLocaleString()}</div>
            <p className="text-gray-500 text-sm mt-1">{expenses.length} transactions</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold flex items-center">
              <Leaf className="mr-2 h-5 w-5 text-krishi-green" />
              Active Crops
            </h2>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/crops')}
            >
              View All
            </Button>
          </div>
          
          {crops.length === 0 ? (
            <Card>
              <CardContent className="py-8">
                <div className="text-center">
                  <Leaf className="mx-auto h-12 w-12 text-gray-300" />
                  <h3 className="mt-4 text-lg font-medium">No crops added yet</h3>
                  <p className="mt-1 text-gray-500">Add your first crop to start tracking</p>
                  <Button 
                    className="mt-4 bg-krishi-green hover:bg-krishi-green-dark"
                    onClick={() => navigate('/crops/add')}
                  >
                    Add New Crop
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {crops.slice(0, 3).map((crop) => (
                <Card key={crop.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-lg">{crop.name}</h3>
                        <p className="text-gray-500 text-sm">
                          {crop.area} {crop.areaUnit} • {crop.season}
                        </p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => navigate(`/crops/${crop.id}`)}
                      >
                        Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {crops.length > 3 && (
                <div className="text-center pt-2">
                  <Button 
                    variant="link" 
                    className="text-krishi-green"
                    onClick={() => navigate('/crops')}
                  >
                    View {crops.length - 3} more crops
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold flex items-center">
              <IndianRupee className="mr-2 h-5 w-5 text-krishi-green" />
              Recent Transactions
            </h2>
            <div className="space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/expenses')}
              >
                Expenses
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/income')}
              >
                Income
              </Button>
            </div>
          </div>
          
          {expenses.length === 0 && incomes.length === 0 ? (
            <Card>
              <CardContent className="py-8">
                <div className="text-center">
                  <ShoppingBag className="mx-auto h-12 w-12 text-gray-300" />
                  <h3 className="mt-4 text-lg font-medium">No transactions yet</h3>
                  <p className="mt-1 text-gray-500">Record your income and expenses</p>
                  <div className="mt-4 space-x-3">
                    <Button 
                      className="bg-krishi-green hover:bg-krishi-green-dark"
                      onClick={() => navigate('/expenses/add')}
                    >
                      Add Expense
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => navigate('/income/add')}
                    >
                      Add Income
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-0">
                <ul className="divide-y">
                  {[...expenses, ...incomes]
                    .sort((a, b) => b.date.getTime() - a.date.getTime())
                    .slice(0, 5)
                    .map((transaction) => {
                      const isExpense = 'type' in transaction;
                      const amount = isExpense ? -transaction.amount : transaction.amount;
                      
                      return (
                        <li key={transaction.id} className="flex items-center p-4 hover:bg-gray-50">
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${
                            isExpense ? 'bg-red-100 text-red-500' : 'bg-green-100 text-green-500'
                          }`}>
                            {isExpense ? (
                              <ArrowDownCircle className="h-5 w-5" />
                            ) : (
                              <ArrowUpCircle className="h-5 w-5" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">
                              {isExpense 
                                ? `${transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)} Expense` 
                                : 'Crop Sale'}
                            </p>
                            <p className="text-sm text-gray-500">
                              {transaction.date.toLocaleDateString()}
                            </p>
                          </div>
                          <div className={`font-medium ${
                            isExpense ? 'text-red-600' : 'text-green-600'
                          }`}>
                            {isExpense ? '-' : '+'}₹{Math.abs(amount).toLocaleString()}
                          </div>
                        </li>
                      );
                    })}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <Leaf className="mr-2 h-5 w-5 text-krishi-green" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Button 
            className="h-auto py-4 bg-krishi-green hover:bg-krishi-green-dark flex flex-col items-center"
            onClick={() => navigate('/crops/add')}
          >
            <Leaf className="h-6 w-6 mb-2" />
            <span>Add Crop</span>
          </Button>
          <Button 
            className="h-auto py-4 bg-krishi-green hover:bg-krishi-green-dark flex flex-col items-center"
            onClick={() => navigate('/expenses/add')}
          >
            <ArrowDownCircle className="h-6 w-6 mb-2" />
            <span>Log Expense</span>
          </Button>
          <Button 
            className="h-auto py-4 bg-krishi-green hover:bg-krishi-green-dark flex flex-col items-center"
            onClick={() => navigate('/income/add')}
          >
            <ArrowUpCircle className="h-6 w-6 mb-2" />
            <span>Record Income</span>
          </Button>
          <Button 
            className="h-auto py-4 bg-krishi-green hover:bg-krishi-green-dark flex flex-col items-center"
            onClick={() => navigate('/reports')}
          >
            <TrendingUp className="h-6 w-6 mb-2" />
            <span>View Reports</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
