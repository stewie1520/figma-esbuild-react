import React, { FC } from "react";
import { PuffLoader } from "react-spinners";

type ButtonProps = {
  loading?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const ButtonPrimary: FC<ButtonProps> = ({ loading, children, ...props }) => {
  return (
    <button
      type="submit"
      className="mt-2 bg-blue-500 flex flex-row gap-2 text-white hover:bg-blue-400 disabled:bg-slate-600 justify-center items-center"
      disabled={loading}
      {...props}
    >
      {loading && (<PuffLoader size={14} color="white" />)}
      {children}
    </button>
  )
}