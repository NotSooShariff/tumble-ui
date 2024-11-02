import React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { 
  TwitterIcon, 
  FacebookIcon, 
  InstagramIcon, 
  GithubIcon 
} from 'lucide-react';

interface FooterProps {
  onSubscribe?: (email: string) => void;
}

const Footer: React.FC<FooterProps> = ({
  onSubscribe = () => {}
}) => {
  const [email, setEmail] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubscribe(email);
    setEmail('');
  };

  return (
    <footer className="border-t">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Company</h3>
            <a href="/" className="text-2xl font-bold">
              Logo
            </a>
            <p className="text-sm text-muted-foreground">
              Building the future of web interfaces, one component at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-sm hover:text-primary">About Us</a>
              </li>
              <li>
                <a href="/careers" className="text-sm hover:text-primary">Careers</a>
              </li>
              <li>
                <a href="/blog" className="text-sm hover:text-primary">Blog</a>
              </li>
              <li>
                <a href="/legal" className="text-sm hover:text-primary">Legal</a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Connect</h3>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon">
                <TwitterIcon className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <FacebookIcon className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <InstagramIcon className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <GithubIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Stay Updated</h3>
            <p className="text-sm text-muted-foreground">
              Subscribe to our newsletter for the latest updates.
            </p>
            <form onSubmit={handleSubmit} className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setEmail(e.target.value)}
                className="w-full"
              />
              <Button type="submit" className="w-full">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;