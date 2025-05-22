'use client';

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "@/api/axios";
import { setCookie } from "@/lib/cookies";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [authError, setAuthError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));

    if (authError) setAuthError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError('');

    try {
      const params = new URLSearchParams();
      params.append('username', formData.email);
      params.append('password', formData.password);

      const response = await api.post('/auth/login', params.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      if (response.data.access_token) {
        setCookie('access_token', response.data.access_token, 1); 
        toast.success('Login successful!');
        navigate('/home');
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        setAuthError('Incorrect username or password');
      } else {
        toast.error(error.response?.data?.detail || 'Login failed');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form 
      className={cn("flex flex-col gap-6", className)} 
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
      </div>
      
      <div className="grid gap-3">
        <div className="grid gap-4">
          <Input 
            id="email" 
            type="email" 
            placeholder="Enter Your Email Address" 
            required
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>
        
        <div className="grid gap-3">
          <Input 
            id="password"
            placeholder="Password" 
            type="password" 
            required
            value={formData.password}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

        {authError && (
          <div className="text-red-500 text-sm text-center">
            {authError}
          </div>
        )}
        
        <Button 
          type="submit" 
          className="w-full bg-[#005ca9] hover:bg-[#004a8a] text-white transition-colors duration-200"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </div>
      
      <div className="text-center text-sm">
        Not a customer? Create your account{" "}
        <a href="register" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  );
}