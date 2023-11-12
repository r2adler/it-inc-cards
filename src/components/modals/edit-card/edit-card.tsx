import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field'
import { Select } from '@/components/ui/select'
import { CardsResponse } from '@/services'
import { ImageUploader } from '@/utils/imageUploader'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogClose } from '@radix-ui/react-dialog'
import { z } from 'zod'

import s from './edit-card.module.scss'

import { SelectVideo, answerAndQuestionSchema } from '..'

const addNewCardSchema = z.object({
  answer: answerAndQuestionSchema,
  answerImg: z.any(),
  answerVideo: z.string().url(),
  question: answerAndQuestionSchema,
  questionImg: z.any(),
  questionVideo: z.string().url(),
})

export type AddCardsFormValues = z.infer<typeof addNewCardSchema>

type AddNewCardProps = {
  card?: CardsResponse
  onSubmit?: any
  variant: 'add' | 'edit'
}

export const EditCard = ({ card, onSubmit, variant }: AddNewCardProps) => {
  const [selectValue, setSelectValue] = useState<string>('Text')
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm<AddCardsFormValues>({
    resolver: zodResolver(addNewCardSchema),
    values: {
      answer: card?.answer || '',
      answerVideo: card?.answerVideo || '',
      question: card?.question || '',
      questionVideo: card?.questionVideo || '',
    },
  })

  const options = [
    { id: '1', value: 'Text' },
    { id: '2', value: 'Image' },
    { id: '3', value: 'Video' },
  ]
  const textButton = variant === 'add' ? 'Add New Card' : 'Save Changes'

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {selectValue === 'Image' && (
        <div className={s.uploaderContainer}>
          <ImageUploader
            imageKey={'questionImg'}
            initialImageURL={card?.questionImg}
            label={'Choose question image'}
            register={register}
            setValue={setValue}
          />
          <ImageUploader
            imageKey={'answerImg'}
            initialImageURL={card?.answerImg}
            label={'Choose answer image'}
            register={register}
            setValue={setValue}
          />
          <Button
            className={s.backButton}
            onClick={() => setSelectValue('Text')}
            variant={'secondary'}
          >
            back
          </Button>
        </div>
      )}

      {selectValue === 'Text' && (
        <>
          <div className={s.wrapperForm}>
            <Select
              className={s.select}
              classNameViewport={s.viewport}
              defaultValue={'Text'}
              fullWidth
              label={'Choose a question format'}
              onChangeValue={value => {
                setSelectValue(value)
              }}
              options={options}
              value={selectValue}
            />
            <ControlledTextField
              control={control}
              errorMessage={errors.question?.message}
              fullWidth
              label={'Question'}
              name={'question'}
            />
            <ControlledTextField
              control={control}
              errorMessage={errors.answer?.message}
              fullWidth
              label={'Answer'}
              name={'answer'}
            />
          </div>
          <div className={s.buttons}>
            <Button type={'button'} variant={'secondary'}>
              <DialogClose>Cancel</DialogClose>
            </Button>
            <Button type={'submit'} variant={'primary'}>
              {textButton}
            </Button>
          </div>
        </>
      )}
      {selectValue === 'Video' && (
        <SelectVideo control={control} errors={errors} setSelectValue={setSelectValue} />
      )}
    </form>
  )
}
