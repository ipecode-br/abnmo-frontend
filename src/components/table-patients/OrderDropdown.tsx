import { ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { BiSortAlt2 } from 'react-icons/bi'

type OrderDropdownProps = {
  sortBy: string
  onSortChange: (sortField: string) => void
}

export function OrderDropdown({ sortBy, onSortChange }: OrderDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  const options = ['Nome', 'Data de Entrada', 'Contato', 'Email', 'Status']

  // Sincroniza selectedOption com prop sortBy (controlado externamente)
  // Para que quando o sortBy mudar externamente, o componente reflita isso
  useEffect(() => {
    // Nada a fazer aqui, pois usa sortBy para checked
  }, [sortBy])

  const handleOptionSelect = (option: string) => {
    onSortChange(option)
    setIsOpen(false)
  }

  return (
    <div className='relative'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center gap-2 rounded border border-gray-300 px-3 py-2 text-sm hover:bg-gray-100'
        type='button'
        aria-haspopup='listbox'
        aria-expanded={isOpen}
        aria-label='Selecionar opção de ordenação'
      >
        <BiSortAlt2 size={16} className='text-gray-600' />
        Ordenar por
        <ChevronDown size={16} className='text-gray-600' />
      </button>

      {isOpen && (
        <div className='absolute right-0 z-10 mt-2 w-48 rounded-md border border-gray-200 bg-white shadow-lg'>
          <ul
            className='space-y-1 p-2 text-sm text-gray-700'
            role='listbox'
            aria-activedescendant={sortBy}
            tabIndex={-1}
          >
            {options.map((option) => (
              <li
                key={option}
                className={`flex cursor-pointer items-center gap-2 rounded px-2 py-1 hover:bg-gray-50 ${sortBy === option ? 'bg-gray-100 font-semibold' : ''}`}
                onClick={() => handleOptionSelect(option)}
                role='option'
                aria-selected={sortBy === option}
                id={option}
              >
                <input
                  type='radio'
                  checked={sortBy === option}
                  readOnly
                  tabIndex={-1}
                />
                <span>{option}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
