
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Camera, ArrowLeft, ArrowDownCircle } from 'lucide-react';

const AddExpense: React.FC = () => {
  const { crops, addExpense } = useData();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [cropId, setCropId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await addExpense({
        type: type as any,
        amount: parseFloat(amount),
        description,
        date: new Date(date),
        cropId: cropId || undefined,
      });
      
      toast({
        title: 'Expense Added',
        description: `₹${amount} expense has been added successfully.`,
      });
      
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to add expense. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <Button 
        variant="ghost" 
        className="mb-6 flex items-center" 
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      
      <Card>
        <CardHeader>
          <div className="flex items-center mb-2">
            <ArrowDownCircle className="h-6 w-6 text-red-500 mr-2" />
            <CardTitle>Add Expense</CardTitle>
          </div>
          <CardDescription>
            Record a new expense for your farming operations
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="type" className="text-sm font-medium">
                  Expense Type
                </label>
                <Select value={type} onValueChange={setType} required>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="seed">Seeds/Plants</SelectItem>
                    <SelectItem value="fertilizer">Fertilizers</SelectItem>
                    <SelectItem value="pesticide">Pesticides</SelectItem>
                    <SelectItem value="labor">Labor/Wages</SelectItem>
                    <SelectItem value="equipment">Equipment/Machinery</SelectItem>
                    <SelectItem value="others">Others</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="amount" className="text-sm font-medium">
                  Amount (₹)
                </label>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  min="0.01"
                  step="0.01"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g., Purchased 5kg DAP fertilizer"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="date" className="text-sm font-medium">
                  Date
                </label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="cropId" className="text-sm font-medium">
                  Associated Crop (Optional)
                </label>
                <Select value={cropId} onValueChange={setCropId}>
                  <SelectTrigger id="cropId">
                    <SelectValue placeholder="Select crop" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">No specific crop</SelectItem>
                    {crops.map((crop) => (
                      <SelectItem key={crop.id} value={crop.id}>
                        {crop.name} ({crop.area} {crop.areaUnit})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="mt-4">
              <Button 
                type="button" 
                variant="outline" 
                className="w-full flex items-center justify-center"
                onClick={() => {
                  toast({
                    title: 'Feature Coming Soon',
                    description: 'Bill scanning feature will be available in the next update!',
                  });
                }}
              >
                <Camera className="mr-2 h-5 w-5" />
                Scan Bill (Coming Soon)
              </Button>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Upload a photo of your bill to auto-fill expense details
              </p>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-krishi-green hover:bg-krishi-green-dark"
              disabled={isLoading}
            >
              {isLoading ? 'Adding...' : 'Add Expense'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AddExpense;
