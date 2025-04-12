import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { LayoutDashboard, Leaf, ArrowDownCircle, ArrowUpCircle, LogOut, BarChart3, User, Menu, X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useToast } from '@/components/ui/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

const NAV_ITEMS = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: 'Crops',
    href: '/crops',
    icon: <Leaf className="h-5 w-5" />,
  },
  {
    title: 'Expenses',
    href: '/expenses',
    icon: <ArrowDownCircle className="h-5 w-5" />,
  },
  {
    title: 'Income',
    href: '/income',
    icon: <ArrowUpCircle className="h-5 w-5" />,
  },
  {
    title: 'Reports',
    href: '/reports',
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    title: 'Profile',
    href: '/profile',
    icon: <User className="h-5 w-5" />,
  },
];

const Layout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  if (!user) {
    navigate('/auth/login');
    return null;
  }

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: 'Logged Out',
        description: 'You have been successfully logged out.',
      });
      navigate('/auth/login');
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to log out. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const renderNavItems = () => (
    <div className="space-y-1">
      {NAV_ITEMS.map((item) => {
        const isActive = location.pathname === item.href || location.pathname.startsWith(`${item.href}/`);
        return (
          <Button
            key={item.href}
            variant={isActive ? 'default' : 'ghost'}
            className={`w-full justify-start ${
              isActive ? 'bg-krishi-green text-white' : 'text-gray-700'
            }`}
            onClick={() => {
              navigate(item.href);
              if (isMobile) {
                setMobileMenuOpen(false);
              }
            }}
          >
            <span className="mr-2">{item.icon}</span>
            {item.title}
          </Button>
        );
      })}
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          <div className="flex flex-col flex-grow bg-white border-r">
            <div className="p-4">
              <h1 className="font-bold text-xl text-krishi-green">KrishiLakshya</h1>
              <p className="text-sm text-gray-500">Farm Financial Tracker</p>
            </div>
            
            <Separator />
            
            <ScrollArea className="flex-1 px-3 py-4">
              {renderNavItems()}
            </ScrollArea>
            
            <div className="p-4">
              <Button
                variant="outline"
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-5 w-5" />
                Log Out
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Header & Menu */}
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 bg-white border-b z-10 p-4 flex items-center justify-between">
          <h1 className="font-bold text-xl text-krishi-green">KrishiLakshya</h1>
          
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
              <div className="flex flex-col h-full">
                <div className="p-4 flex items-center justify-between">
                  <h2 className="font-bold text-xl text-krishi-green">KrishiLakshya</h2>
                  <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                
                <Separator />
                
                <ScrollArea className="flex-1 px-3 py-4">
                  {renderNavItems()}
                </ScrollArea>
                
                <div className="p-4">
                  <Button
                    variant="outline"
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-5 w-5" />
                    Log Out
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      )}

      {/* Main Content */}
      <div className={`flex-1 ${!isMobile ? 'md:ml-64' : 'mt-16'}`}>
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
