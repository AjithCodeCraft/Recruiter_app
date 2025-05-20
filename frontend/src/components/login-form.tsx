import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
  
      </div>
      <div className="grid gap-3">
        <div className="grid gap-4">
          {/* <Label htmlFor="email">Email</Label> */}
          <Input id="email" type="email" placeholder="Enter Your Email Addres" required />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            {/* <Label htmlFor="password" >Password</Label> */}
          
          </div>
          <Input id="password"placeholder="Passowrd" type="password" required />
        </div>
       <Button 
        type="submit" 
         className="w-full bg-[#005ca9] hover:bg-[#004a8a] text-white transition-colors duration-200"
        >
       Login
       </Button>
    
    
      </div>
      <div className="text-center text-sm">
        Not a customer? Create your account{" "}
        <a href="register" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  )
}
