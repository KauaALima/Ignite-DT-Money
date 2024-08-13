import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { createContext } from 'use-context-selector'
import { api } from '../lib/api'

interface Trasactions {
  id: number
  description: string
  type: string
  category: string
  price: number
  createdAt: string
}

interface NewTransaction {
  description: string
  type: 'income' | 'outcome'
  category: string
  price: number
}

interface transactionsContextType {
  transaction: Trasactions[]
  fetchTransiton: (querry?: string) => Promise<void>
  createTransction: (data: NewTransaction) => Promise<void>
}

export const transactionsContext = createContext({} as transactionsContextType)

interface TransactionsContextProviderProps {
  children: ReactNode
}

export function TransactionsContextProvider({
  children,
}: TransactionsContextProviderProps) {
  const [transaction, setTransaction] = useState<Trasactions[]>([])

  const fetchTransiton = useCallback(async (querry?: string) => {
    const response = await api.get('Transactions', {
      params: {
        _sort: 'createdAt',
        __order: 'desc',
        q: querry,
      },
    })
    setTransaction(response.data)
  }, [])

  const createTransction = async (data: NewTransaction) => {
    const { description, category, price, type } = data

    const response = await api.post('Transactions', {
      description,
      category,
      price,
      type,
      createdAt: new Date(),
    })

    setTransaction((state) => [response.data, ...state])
  }

  useEffect(() => {
    fetchTransiton()
  }, [fetchTransiton])
  return (
    <transactionsContext.Provider
      value={{ transaction, fetchTransiton, createTransction }}
    >
      {children}
    </transactionsContext.Provider>
  )
}
