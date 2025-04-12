
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

const Login: React.FC = () => {
  const { login, loginWithPhone } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('email');
  
  // Email login state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Phone login state
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password);
      toast({
        title: 'Login Successful',
        description: 'Welcome back to KrishiLakshya!',
      });
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      toast({
        title: 'Login Failed',
        description: 'Please check your credentials and try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendVerificationCode = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send an OTP via Firebase Auth
    toast({
      title: 'OTP Sent',
      description: `Verification code sent to ${phoneNumber}`,
    });
    setCodeSent(true);
  };

  const handlePhoneLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await loginWithPhone(phoneNumber, verificationCode);
      toast({
        title: 'Login Successful',
        description: 'Welcome back to KrishiLakshya!',
      });
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      toast({
        title: 'Login Failed',
        description: 'Please check your verification code and try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-krishi-green">KrishiLakshya</h1>
          <p className="text-gray-600 mt-2">Financial tracking for farmers</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Sign in to your account to access your farm data
            </CardDescription>
          </CardHeader>
          
          <Tabs defaultValue="email" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="phone">Phone</TabsTrigger>
            </TabsList>
            
            <CardContent className="pt-6">
              <TabsContent value="email">
                <form onSubmit={handleEmailLogin}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="farmer@example.com"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label htmlFor="password" className="text-sm font-medium">
                          Password
                        </label>
                        <Link to="/auth/forgot-password" className="text-sm text-krishi-green hover:underline">
                          Forgot Password?
                        </Link>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full bg-krishi-green hover:bg-krishi-green-dark" disabled={isLoading}>
                      {isLoading ? 'Signing in...' : 'Sign In'}
                    </Button>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="phone">
                {!codeSent ? (
                  <form onSubmit={handleSendVerificationCode}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium">
                          Phone Number
                        </label>
                        <Input
                          id="phone"
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="+91 9876543210"
                          required
                        />
                      </div>
                      
                      <Button type="submit" className="w-full bg-krishi-green hover:bg-krishi-green-dark">
                        Send Verification Code
                      </Button>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handlePhoneLogin}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="verificationCode" className="text-sm font-medium">
                          Verification Code
                        </label>
                        <Input
                          id="verificationCode"
                          type="text"
                          value={verificationCode}
                          onChange={(e) => setVerificationCode(e.target.value)}
                          placeholder="123456"
                          required
                        />
                      </div>
                      
                      <Button type="submit" className="w-full bg-krishi-green hover:bg-krishi-green-dark" disabled={isLoading}>
                        {isLoading ? 'Verifying...' : 'Verify & Sign In'}
                      </Button>
                      
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() => setCodeSent(false)}
                      >
                        Change Phone Number
                      </Button>
                    </div>
                  </form>
                )}
              </TabsContent>
            </CardContent>
          </Tabs>
          
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm text-gray-500">
              Don't have an account?{' '}
              <Link to="/auth/register" className="text-krishi-green hover:underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
