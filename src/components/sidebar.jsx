import React from 'react';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import {
  HomeIcon,
  SettingsIcon,
  UserIcon,
  FileTextIcon,
  HelpCircleIcon,
  XIcon
} from 'lucide-react';

const Sidebar = ({
  isOpen = true,
  onClose = () => {}
}) => {
  return (
    <div
      className={`fixed top-0 left-0 z-40 h-screen w-64 transform transition-transform duration-200 ease-in-out bg-background border-r ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex h-16 items-center justify-between px-4 border-b">
        <span className="font-bold text-lg">Dashboard</span>
        <Button variant="ghost" size="icon" onClick={onClose} className="md:hidden">
          <XIcon className="h-5 w-5" />
        </Button>
      </div>
      
      <ScrollArea className="h-[calc(100vh-4rem)] p-4">
        <nav className="space-y-2">
          <Button variant="ghost" className="w-full justify-start">
            <HomeIcon className="mr-2 h-4 w-4" />
            Home
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <UserIcon className="mr-2 h-4 w-4" />
            Profile
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <FileTextIcon className="mr-2 h-4 w-4" />
            Documents
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <SettingsIcon className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <HelpCircleIcon className="mr-2 h-4 w-4" />
            Help
          </Button>
        </nav>
        
        <div className="mt-6 pt-6 border-t">
          <div className="px-2 py-4 rounded-lg bg-muted">
            <h4 className="font-medium mb-2">Need help?</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Check our documentation or contact support.
            </p>
            <Button size="sm" className="w-full">
              View Documentation
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Sidebar;