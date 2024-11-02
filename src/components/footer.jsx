import React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { 
  TwitterIcon, 
  FacebookIcon, 
  InstagramIcon, 
  GithubIcon 
} from 'lucide-react';

const Footer = ({
  onSubscribe = () => {}
}) => {
  const [email, setEmail] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubscribe(email);
    setEmail('');
  };

  return (
    <footer className="border-t">
      <div className="container px-4 py-12 mx