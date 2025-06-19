import { Headset, X } from 'lucide-react'

export function HelpCard() {
  return (
    <div className='bg-background-soft relative mt-[82px] flex flex-col gap-3 rounded-2xl p-4'>
      <div className='flex flex-row items-center gap-[10px]'>
        <Headset size={20} />
        <p className='font-medium tracking-tighter text-[#2D3138]'>
          Precisa de ajuda?
        </p>
      </div>
      <button className='text-foreground-soft absolute top-3 right-4 cursor-pointer bg-transparent shadow-none hover:bg-transparent'>
        <X size={20} />
      </button>
      <p className='text-sm leading-tight font-normal tracking-[-0.6px] text-[#7B7B7B]'>
        Entre em contato com a nossa equipe para obter suporte.
      </p>
    </div>
  )
}
