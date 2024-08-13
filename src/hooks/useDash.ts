import { transactionsContext } from '../contexts/TransactionsContextProvider'
import { useMemo } from 'react'
import { useContextSelector } from 'use-context-selector'

export function useDash() {
  const transaction = useContextSelector(transactionsContext, (context) => {
    return context.transaction
  })

  const dash = useMemo(() => {
    return transaction.reduce(
      (acc, item) => {
        if (item.type === 'income') {
          acc.income += item.price
          acc.total += item.price
        } else {
          acc.outcome += item.price
          acc.total -= item.price
        }
        return acc
      },
      { income: 0, outcome: 0, total: 0 },
    )
  }, [transaction])

  return dash
}
