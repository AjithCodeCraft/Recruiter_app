// app/register/page.tsx
import { RegisterForm } from "@/components/register-form"

export default function RegisterPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-[1fr_1fr]">
      {/* Image column - left side */}
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/Rectangle_126.png"
          alt="Registration Background"
          className="absolute h-full w-full object-cover object-center"
        />
      </div>

      {/* Registration form column - right side */}
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          {/* Optional header/logo content */}
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  )
}