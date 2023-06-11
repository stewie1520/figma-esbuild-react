import React from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'
import {} from '@heroicons/react/24/outline/CircleStackIcon'
import { twMerge } from "tailwind-merge";
import { AuthApi } from "../../api/auth";
import { AlertDanger, ButtonPrimary } from "../../components";

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
  const [loading, setLoading] = React.useState(false)

  const onSubmit = async (payload: LoginForm) => {
    try {
      setLoading(true)
      const { token } = await AuthApi.loginFake(payload.account, payload.password)
      parent.postMessage({ pluginMessage: { type: 'auth:received-token', data: token } }, '*')
    } catch (error: any) {
      console.log(error)
      setLoginFailed(error.message)
    } finally {
      setLoading(false)
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

        <ButtonPrimary loading={loading}>
          Continue
        </ButtonPrimary>
      </form>
    </div>
  )
}