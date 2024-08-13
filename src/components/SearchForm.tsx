import { Search } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { transactionsContext } from '../contexts/TransactionsContextProvider'
import { useContextSelector } from 'use-context-selector'

const SearchFormSchema = z.object({
  querry: z.string(),
})

type SearchFormData = z.infer<typeof SearchFormSchema>

export function SearchForm() {
  const fetchTransiton = useContextSelector(transactionsContext, (context) => {
    return context.fetchTransiton
  })

  const SearchForm = useForm<SearchFormData>({
    resolver: zodResolver(SearchFormSchema),
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = SearchForm

  async function handleSearchInput(data: SearchFormData) {
    await fetchTransiton(data.querry)
  }

  return (
    <form onSubmit={handleSubmit(handleSearchInput)} className="flex gap-4">
      <input
        type="text"
        placeholder="Busque uma transação"
        className="flex-1 bg-gray-900 border-0 p-4 rounded-md placeholder:text-gray-500"
        {...register('querry')}
      />
      <button
        className="flex cursor-pointer font-bold text-green-300 items-center bg-transparent border-0 ring-1 ring-green-300 rounded-md gap-3 duration-150 py-3 px-8 [&:not(:disabled)]:hover:bg-green-500  [&:not(:disabled)]:hover:text-white disabled:opacity-60 disabled:cursor-not-allowed"
        disabled={isSubmitting}
      >
        <Search />
        Buscar
      </button>
    </form>
  )
}
