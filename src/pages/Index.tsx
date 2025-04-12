import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Leaf } from 'lucide-react';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-green-50 px-4">
      <div className="max-w-3xl text-center">
        <div className="mb-8 inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
          <Leaf className="h-8 w-8 text-krishi-green" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Welcome to <span className="text-krishi-green">KrishiLakshya</span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          The complete financial tracking system for farmers. Track expenses, monitor income, and increase your profits.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <Button 
            className="bg-krishi-green hover:bg-krishi-green-dark text-lg px-8 py-6 h-auto"
            onClick={() => navigate('/auth/login')}
          >
            Login to Your Account
          </Button>
          
          <Button 
            variant="outline" 
            className="text-lg px-8 py-6 h-auto"
            onClick={() => navigate('/auth/register')}
          >
            Create New Account
          </Button>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-2">Track Expenses</h3>
            <p className="text-gray-600">Record all your farming expenses with ease and keep your budget under control.</p>
          </div>
          
          <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-2">Monitor Income</h3>
            <p className="text-gray-600">Log all your sales and income to understand your revenue streams better.</p>
          </div>
          
          <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-2">Analyze Profits</h3>
            <p className="text-gray-600">Get detailed reports and insights to maximize your farm's profitability.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
