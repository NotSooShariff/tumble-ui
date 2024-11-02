import React from 'react';
import { Button } from '../ui/button';
import { MoonIcon, SunIcon, MenuIcon } from 'lucide-react';

const Header = ({
  onMenuClick = () => {},
  onThemeToggle = () => {},
  isDarkMode = false
}) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={onMenuClick}>
          <MenuIcon className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        
        <div className="flex flex-1 items-center justify-between">
          <nav className="flex items-center space-x-6">
            <a href="/" className="font-bold text-xl">
              Logo
            </a>
            <div className="hidden md:flex space-x-6">
              <a href="/features" className="text-sm font-medium transition-colors hover:text-primary">
                Features
              </a>
              <a href="/products" className="text-sm font-medium transition-colors hover:text-primary">
                Products
              </a>
              <a href="/about" className="text-sm font-medium transition-colors hover:text-primary">
                About
              </a>
            </div>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={onThemeToggle}>
              {isDarkMode ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
            
            <Button variant="outline" size="sm">
              Sign In
            </Button>
            <Button size="sm">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;