import React from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'
import { twMerge } from "tailwind-merge";
import { AuthApi } from "../../api/auth";
import { AlertDanger } from "../../components";

type LoginForm = { account: string, password: string }
const loginSchema = Yup.object().shape({
  account: Yup.string().required(),
  password: Yup.string().required(),
});

const errorClass = 'border-red-500'

export const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: yupResolver(loginSchema)
  });
  const [loginFailed, setLoginFailed] = React.useState('')

  const onSubmit = async (payload: LoginForm) => {
    try {
      const { token } = await AuthApi.loginFake(payload.account, payload.password)
      parent.postMessage({ pluginMessage: { type: 'auth:received-token', data: token } }, '*')
    } catch (error: any) {
      console.log(error)
      setLoginFailed(error.message)
    }    
  }


  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <h1 className="mt-2 font-bold text-lg">🔒 Sign in</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-2 w-[360px] justify-start">
        {loginFailed && (
          <AlertDanger message={loginFailed}/>
        )}

        <input placeholder="Your account" {...register("account")} className={twMerge(errors.account && errorClass)}/>
        {errors.account && <span className="text-red-500 text-xs">This field is required</span>}

        <input placeholder="Your password" type="password" {...register("password")} className={twMerge('mt-2', errors.password && errorClass)}/>
        {errors.password && <span className="text-red-500 text-xs">This field is required</span>}

        <button type="submit" className="mt-2 bg-blue-500 text-white hover:bg-blue-400">Continue</button>
      </form>
    </div>
  )
}