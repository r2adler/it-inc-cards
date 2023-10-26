import { FC } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field'
import { Typography } from '@/components/ui/typography'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './forgot-password.module.scss'

const emailSchema = z.object({
  email: z.string().email(),
})

export type FormValues = z.infer<typeof emailSchema>

type ForgotPasswordProps = {
  onSubmit?: any
}

export const ForgotPassword: FC<ForgotPasswordProps> = ({ onSubmit }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({ resolver: zodResolver(emailSchema) })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DevTool control={control} />

      <Card className={s.wrapper}>
        <Typography className={s.header} variant={'large'}>
          Forgot your password?
        </Typography>
        <ControlledTextField
          className={s.input}
          control={control}
          errorMessage={errors.email?.message}
          fullWidth
          label={'Email'}
          name={'email'}
        />
        <Typography className={s.description} variant={'body2'}>
          Enter your email address and we will send you further instructions
        </Typography>
        <Button className={s.button} fullWidth type={'submit'}>
          Send Instructions
        </Button>
        <Typography className={s.rememberPassword} variant={'body2'}>
          Did you remember your password?
        </Typography>
        <Button className={s.link} type={'button'} variant={'link'}>
          Try logging in
        </Button>
      </Card>
    </form>
  )
}