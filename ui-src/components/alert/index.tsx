import React, { FC } from 'react'
import InformationCircleIcon from '@heroicons/react/24/outline/InformationCircleIcon'

interface AlertProps {
  type: 'success' | 'danger'
  title?: string
  message: string
}

export const AlertDanger: FC<Omit<AlertProps, "type">> = ({ title, message }) => {
  return (
    <div className="flex bg-red-100 rounded-lg p-4 mb-4 text-sm text-red-700" role="alert">
      <InformationCircleIcon className="inline mr-3" fill="currentColor"/>
      <div>
        { title && (
          <span className="font-medium">{title}</span>
        )}
         {message}
      </div>
    </div>
  )
}
