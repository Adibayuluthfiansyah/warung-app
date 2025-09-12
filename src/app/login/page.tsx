'use client'
import React from 'react'
import { LoginForm } from '@/components/login-form'

const LoginPage = () => {
  return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
        ANAKIN SHOP
        </a>
        <LoginForm />
      </div>
    </div>
  )
}


export default LoginPage