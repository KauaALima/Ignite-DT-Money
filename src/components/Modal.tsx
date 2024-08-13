import * as Dialog from '@radix-ui/react-dialog'
import * as RadioGroup from '@radix-ui/react-radio-group'
import * as z from 'zod'
import { X, CircleArrowUp, CircleArrowDown } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContextSelector } from 'use-context-selector'
import { transactionsContext } from '../contexts/TransactionsContextProvider'

const ModalFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
})

type ModalFormData = z.infer<typeof ModalFormSchema>

export function Modal() {
  const createTransction = useContextSelector(
    transactionsContext,
    (context) => {
      return context.createTransction
    },
  )

  const ModalForm = useForm<ModalFormData>({
    resolver: zodResolver(ModalFormSchema),
  })

  const {
    register,
    handleSubmit,
    control,
    reset,
    // formState: { isSubmitting },
  } = ModalForm

  async function handleModalForm(data: ModalFormData) {
    const { description, category, price, type } = data

    await createTransction({ description, category, price, type })

    reset()
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed w-screen h-screen inset-0 bg-black/75" />
      <Dialog.Content className="min-w-[32rem] p-12 fixed top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 bg-gray-800">
        <Dialog.Close className="fixed text-gray-500 top-6 right-6 leading-[0px]">
          <X size={24} />
        </Dialog.Close>
        <Dialog.Title className="text-2xl font-bold text-gray-100">
          Nova transação
        </Dialog.Title>

        <form
          onSubmit={handleSubmit(handleModalForm)}
          action=""
          className="flex flex-col gap-4 mt-8"
        >
          <input
            type="text"
            placeholder="Descrição"
            className="border-0 bg-gray-900 rounded-md p-4"
            {...register('description')}
          />
          <input
            type="number"
            placeholder="Preço"
            className="border-0 bg-gray-900 rounded-md p-4"
            {...register('price', { valueAsNumber: true })}
          />
          <input
            type="text"
            placeholder="Categoria"
            className="border-0 bg-gray-900 rounded-md p-4"
            {...register('category')}
          />

          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <RadioGroup.Root
                  className="grid grid-cols-2 gap-4"
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <RadioGroup.Item
                    value="income"
                    className="flex justify-center items-center gap-2 bg-gray-700 rounded-md group data-[state='checked']:bg-green-700 data-[state='checked']:text-white"
                  >
                    <CircleArrowUp
                      size={24}
                      className="text-green-300 group-data-[state='checked']:text-white"
                    />
                    Entrada
                  </RadioGroup.Item>
                  <RadioGroup.Item
                    value="outcome"
                    className="flex p-4 justify-center items-center gap-2 bg-gray-700 rounded-md group data-[state='checked']:bg-red-700 data-[state='checked']:text-white "
                  >
                    <CircleArrowDown
                      size={24}
                      className="text-red-700 group-data-[state='checked']:text-white"
                    />
                    Saida
                  </RadioGroup.Item>
                </RadioGroup.Root>
              )
            }}
          />

          <button className="p-4 bg-green-500 font-bold text-white rounded-md duration-150 [&:not(:disabled)]:hover:bg-green-300 disabled:opacity-60 disabled:cursor-not-allowed">
            Cadastrar
          </button>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
