
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, ArrowUpCircle } from 'lucide-react';

const AddIncome: React.FC = () => {
  const { crops, addIncome } = useData();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [cropId, setCropId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('kg');
  const [pricePerUnit, setPricePerUnit] = useState('');
  const [buyer, setBuyer] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Derived value
  const amount = quantity && pricePerUnit ? parseFloat(quantity) * parseFloat(pricePerUnit) : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cropId) {
      toast({
        title: 'Error',
        description: 'Please select a crop.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      await addIncome({
        cropId,
        amount,
        quantity: parseFloat(quantity),
        unit,
        pricePerUnit: parseFloat(pricePerUnit),
        buyer,
        date: new Date(date),
        notes,
      });
      
      toast({
        title: 'Income Added',
        description: `₹${amount} income has been recorded successfully.`,
      });
      
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to add income. Please try again.',
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
            <ArrowUpCircle className="h-6 w-6 text-green-500 mr-2" />
            <CardTitle>Record Income</CardTitle>
          </div>
          <CardDescription>
            Record income received from selling your crops
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="cropId" className="text-sm font-medium">
                Crop
              </label>
              <Select value={cropId} onValueChange={setCropId} required>
                <SelectTrigger id="cropId">
                  <SelectValue placeholder="Select crop" />
                </SelectTrigger>
                <SelectContent>
                  {crops.length > 0 ? (
                    crops.map((crop) => (
                      <SelectItem key={crop.id} value={crop.id}>
                        {crop.name} ({crop.area} {crop.areaUnit})
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="" disabled>
                      No crops available. Add a crop first.
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="quantity" className="text-sm font-medium">
                  Quantity
                </label>
                <Input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="0.00"
                  min="0.01"
                  step="0.01"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="unit" className="text-sm font-medium">
                  Unit
                </label>
                <Select value={unit} onValueChange={setUnit}>
                  <SelectTrigger id="unit">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">Kilogram (kg)</SelectItem>
                    <SelectItem value="quintal">Quintal</SelectItem>
                    <SelectItem value="ton">Ton</SelectItem>
                    <SelectItem value="pieces">Pieces</SelectItem>
                    <SelectItem value="dozen">Dozen</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="pricePerUnit" className="text-sm font-medium">
                Price per {unit} (₹)
              </label>
              <Input
                id="pricePerUnit"
                type="number"
                value={pricePerUnit}
                onChange={(e) => setPricePerUnit(e.target.value)}
                placeholder="0.00"
                min="0.01"
                step="0.01"
                required
              />
            </div>
            
            <div className="p-3 bg-gray-50 rounded-md">
              <p className="text-sm font-medium">Total Amount</p>
              <p className="text-2xl font-bold text-green-600">₹{amount.toFixed(2)}</p>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="buyer" className="text-sm font-medium">
                Buyer
              </label>
              <Input
                id="buyer"
                value={buyer}
                onChange={(e) => setBuyer(e.target.value)}
                placeholder="e.g., Local Mandi, Trader Name"
                required
              />
            </div>
            
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
              <label htmlFor="notes" className="text-sm font-medium">
                Notes (Optional)
              </label>
              <Input
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any additional details about the sale"
              />
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
              disabled={isLoading || !cropId || !quantity || !pricePerUnit}
            >
              {isLoading ? 'Recording...' : 'Record Income'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AddIncome;
