import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-[1fr_1fr]">
        
     <div className="relative hidden bg-muted lg:block object-scale-down">
  <img
    src="/Rectangle_126.png"
    alt="Login Background"
    className="absolute h-full w-full object-cover object-center"
    />  
</div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
        
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}