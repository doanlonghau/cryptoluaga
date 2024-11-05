'use client'

import { FC } from 'react'
import Button, { ButtonProps } from './Button'

export interface ButtonPrimaryProps extends ButtonProps {}

const ButtonPrimary: FC<ButtonPrimaryProps> = props => {
	return <Button {...props} pattern="primary" />
}

export default ButtonPrimary
