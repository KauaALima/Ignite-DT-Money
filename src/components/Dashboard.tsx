import { CircleArrowUp, CircleArrowDown, DollarSign } from 'lucide-react'
import { numberFormatter } from '../utils/Formater'
import { useDash } from '../hooks/useDash'

export function Dashboard() {
  const dash = useDash()

  return (
    <section className="w-full max-w-[1120px] my-0 mx-auto grid grid-cols-3 gap-8 -mt-20">
      <div className="bg-gray-600 py-8 px-6 rounded-md">
        <header className="flex justify-between items-start mb-3">
          <p>Entradas</p>
          <CircleArrowUp size={32} color="#00B37E" />
        </header>

        <strong className="font-bold text-[32px] text-gray-100">
          {numberFormatter.format(dash.income)}
        </strong>
      </div>

      <div className="bg-gray-600 py-8 px-6 rounded-md">
        <header className="flex justify-between items-start mb-3">
          <p>Saidas</p>
          <CircleArrowDown size={32} color="#F75A68" />
        </header>

        <strong className="font-bold text-[32px] text-gray-100">
          {numberFormatter.format(dash.outcome)}
        </strong>
      </div>

      <div className="bg-green-700 py-8 px-6 rounded-md">
        <header className="flex justify-between items-start mb-3">
          <p>Total</p>
          <DollarSign size={32} color="white" />
        </header>

        <strong className="font-bold text-[32px] text-gray-100">
          {numberFormatter.format(dash.total)}
        </strong>
      </div>
    </section>
  )
}
