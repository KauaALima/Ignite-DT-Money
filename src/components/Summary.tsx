import { twMerge } from 'tailwind-merge'
import { SearchForm } from './SearchForm'
import { transactionsContext } from '../contexts/TransactionsContextProvider'
import { numberFormatter, dateFormatter } from '../utils/Formater'
import { useContextSelector } from 'use-context-selector'

export function Summary() {
  const transaction = useContextSelector(transactionsContext, (context) => {
    return context.transaction
  })

  return (
    <div className="w-full max-w-[1120px] mt-16 mb-0 mx-auto ">
      <SearchForm />
      <table className="w-full border-separate border-spacing-y-2 py-6 px-0">
        <tbody>
          {transaction.map((item) => {
            return (
              <tr key={item.id}>
                <td width="50%" className="bg-gray-700 py-5 px-8">
                  {item.description}
                </td>
                <td
                  className={twMerge(
                    'bg-gray-700 py-5 px-8',
                    item.type === 'income' ? 'text-green-300' : 'text-red-600',
                  )}
                >
                  {item.type === 'outcome' && '- '}
                  {numberFormatter.format(item.price)}
                </td>
                <td className="bg-gray-700 py-5 px-8">Venda</td>
                <td className="bg-gray-700 py-5 px-8">
                  {dateFormatter.format(new Date(item.createdAt))}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
