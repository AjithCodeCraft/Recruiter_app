// components/register-form.tsx
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from '../api/axios';

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await api.post("/auth/register/admin", {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password,
      });
      toast.success("Registration successful!");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-4", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center mb-4">
        <h1 className="text-2xl font-bold">Create your account</h1>
      </div>

      <div className="flex flex-col gap-4">
        <Input
          id="firstName"
          placeholder="First Name"
          required
          className="py-5"
          value={formData.firstName}
          onChange={handleChange}
          disabled={isLoading}
        />

        <Input
          id="lastName"
          placeholder="Last Name"
          required
          className="py-5"
          value={formData.lastName}
          onChange={handleChange}
          disabled={isLoading}
        />

        <Input
          id="email"
          type="email"
          placeholder="Email Address"
          required
          className="py-5"
          value={formData.email}
          onChange={handleChange}
          disabled={isLoading}
        />

        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
            className="py-5"
            value={formData.password}
            onChange={handleChange}
            disabled={isLoading}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isLoading}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>

        <div className="text-xs text-gray-500 mt-2">
          By creating an account, you agree to our Terms and Conditions
        </div>

        <Button
          type="submit"
          className="w-full bg-[#005ca9] hover:bg-[#004a8a] text-white py-5 text-md"
          disabled={isLoading}
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>
      </div>

      <div className="text-center text-sm mt-4">
        Already have an account?{" "}
        <a
          href="/login"
          className="underline underline-offset-4 hover:text-[#005ca9]"
        >
          Sign in
        </a>
      </div>
    </form>
  );
}