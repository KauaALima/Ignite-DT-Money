import { Modal } from './Modal'
import LogoImg from '../assets/LogoImg.svg'
import * as Dialog from '@radix-ui/react-dialog'

export function Header() {
  return (
    <header className="bg-gray-900 pt-10 pb-[120px]">
      <div className="w-full max-w-[1120px] my-0 mx-auto flex justify-between items-center">
        <img src={LogoImg} alt="" />
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button className="font-bold text-white py-3 px-5 bg-green-500 rounded-md border-0 duration-150 hover:bg-green-300">
              Nova transação
            </button>
          </Dialog.Trigger>

          <Modal />
        </Dialog.Root>
      </div>
    </header>
  )
}
