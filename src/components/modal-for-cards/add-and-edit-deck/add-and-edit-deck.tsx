import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { ControlledCheckBox } from '@/components/ui/controlled/controlled-check-box'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogClose } from '@radix-ui/react-dialog'
import { z } from 'zod'

import s from './add-and-edit-deck.module.scss'

import { namePackSchema, privateCheckboxSchema } from '../validation-schemas'

const addNewDeckSchema = z.object({
  image: z.any(),
  isPrivate: privateCheckboxSchema,
  name: namePackSchema,
})

export type CreateDeckFormValues = z.infer<typeof addNewDeckSchema>

type AddNewDeckProps = {
  cover?: File | undefined
  createDeck?: any
  isPrivate?: boolean
  name?: string
  onSubmit?: any
  variant?: 'add' | 'edit'
}

export const AddAndEditDeck = ({
  isPrivate = false,
  name = '',
  onSubmit,
  variant,
}: AddNewDeckProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<CreateDeckFormValues>({
    resolver: zodResolver(addNewDeckSchema),
    values: {
      image: null,
      isPrivate: isPrivate,
      name: name,
    },
  })
  const textButton = variant === 'add' ? 'Add New Deck' : 'Edit Deck'

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('image')} type={'file'} />
        <div className={s.wrapperForm}>
          <ControlledTextField
            control={control}
            errorMessage={errors.name?.message}
            fullWidth
            label={'Name deck'}
            name={'name'}
          />
          <ControlledCheckBox control={control} label={'Private deck'} name={'isPrivate'} />
        </div>
        <div className={s.buttons}>
          <DialogClose>
            <Button type={'button'} variant={'secondary'}>
              Cancel
            </Button>
          </DialogClose>
          <Button type={'submit'} variant={'primary'}>
            {textButton}
          </Button>
        </div>
      </form>
    </>
  )
}
