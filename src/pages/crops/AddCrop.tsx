import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, Leaf } from 'lucide-react';

const AddCrop: React.FC = () => {
  const { addCrop } = useData();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [name, setName] = useState('');
  const [area, setArea] = useState('');
  const [areaUnit, setAreaUnit] = useState('acres');
  const [plantingDate, setPlantingDate] = useState('');
  const [season, setSeason] = useState('');
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const newCrop = await addCrop({
        name,
        area: parseFloat(area),
        areaUnit,
        plantingDate: new Date(plantingDate),
        season,
        status: 'active',
        notes,
      });
      
      toast({
        title: 'Crop Added',
        description: `${name} has been added successfully.`,
      });
      
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to add crop. Please try again.',
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
            <Leaf className="h-6 w-6 text-krishi-green mr-2" />
            <CardTitle>Add New Crop</CardTitle>
          </div>
          <CardDescription>
            Enter the details of your crop to start tracking expenses and income
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Crop Name
              </label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Rice, Wheat, Cotton"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="area" className="text-sm font-medium">
                  Area
                </label>
                <Input
                  id="area"
                  type="number"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="0.00"
                  min="0.01"
                  step="0.01"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="areaUnit" className="text-sm font-medium">
                  Unit
                </label>
                <Select value={areaUnit} onValueChange={setAreaUnit}>
                  <SelectTrigger id="areaUnit">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="acres">Acres</SelectItem>
                    <SelectItem value="hectares">Hectares</SelectItem>
                    <SelectItem value="bigha">Bigha</SelectItem>
                    <SelectItem value="katha">Katha</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="plantingDate" className="text-sm font-medium">
                Planting Date
              </label>
              <Input
                id="plantingDate"
                type="date"
                value={plantingDate}
                onChange={(e) => setPlantingDate(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="season" className="text-sm font-medium">
                Season
              </label>
              <Select value={season} onValueChange={setSeason} required>
                <SelectTrigger id="season">
                  <SelectValue placeholder="Select season" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kharif">Kharif (Monsoon)</SelectItem>
                  <SelectItem value="rabi">Rabi (Winter)</SelectItem>
                  <SelectItem value="zaid">Zaid (Summer)</SelectItem>
                  <SelectItem value="annual">Annual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="notes" className="text-sm font-medium">
                Notes (Optional)
              </label>
              <Input
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any additional details about the crop"
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
              disabled={isLoading}
            >
              {isLoading ? 'Adding...' : 'Add Crop'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AddCrop;
