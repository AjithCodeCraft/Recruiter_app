'use client';

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from '@/context/AuthContext';


export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [authError, setAuthError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));

    if (authError) setAuthError('');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError('');

    try {
      await login(formData.email, formData.password);
      toast.success('Login successful!');
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
          <div className="relative">
            <Input 
              id="password"
              placeholder="Password" 
              type={showPassword ? "text" : "password"} 
              required
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
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