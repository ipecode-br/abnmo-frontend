'use client'

import { PaperclipIcon, PlusIcon, Trash2Icon } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContainer,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { NavLink } from '@/components/ui/nav-link'
import type { PatientDocument } from '@/types/patients'
import { formatDate } from '@/utils/formatters/format-date'

interface PatientDocumentsProps {
  sections: {
    title: string
    documents: PatientDocument[]
  }[]
}

export function PatientDocuments({
  sections,
}: Readonly<PatientDocumentsProps>) {
  const [isEditing, setIsEditing] = useState(false)

  function handleConfirmDelete(id: string) {
    if (!id) return

    console.log(id)
  }

  return (
    <>
      {sections.map((section) => (
        <section key={section.title}>
          <div className='mb-4 flex items-center justify-between'>
            <h2 className='text-xl font-semibold'>{section.title}</h2>
            <Button size='icon' className='size-8'>
              <PlusIcon />
            </Button>
          </div>

          <div className='divide-border divide-y'>
            {section.documents.map((doc) => (
              <div
                key={doc.name}
                className='text-foreground-soft flex min-h-14 items-center gap-2 py-2'
              >
                <PaperclipIcon size={16} />
                <NavLink
                  href=''
                  download
                  className='text-primary'
                  title={`Baixar ${doc.name}`}
                >
                  {doc.name}
                </NavLink>

                <span className='ml-auto text-sm'>
                  {formatDate(doc.created_at)}
                </span>

                <span className='min-w-24 text-right text-sm'>{doc.size}</span>

                {isEditing && (
                  <Dialog>
                    <DialogTrigger
                      size='icon'
                      variant='ghost'
                      className='text-foreground-soft ml-2 size-8'
                    >
                      <Trash2Icon />
                    </DialogTrigger>

                    <DialogContainer>
                      <DialogHeader>
                        <DialogTitle>Excluir documento?</DialogTitle>
                        <DialogDescription>
                          Confirme a exclusão do documento{' '}
                          <strong>{doc.name}</strong>
                        </DialogDescription>
                      </DialogHeader>

                      <DialogFooter>
                        <Button
                          className='flex-1'
                          variant='destructive'
                          onClick={() => handleConfirmDelete(doc.id)}
                        >
                          Excluir documento
                        </Button>
                        <DialogClose className='flex-1'>Cancelar</DialogClose>
                      </DialogFooter>
                    </DialogContainer>
                  </Dialog>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}

      <Button
        variant='outline'
        className='self-end'
        onClick={() => setIsEditing(!isEditing)}
      >
        {isEditing ? 'Concluir edição' : 'Editar'}
      </Button>
    </>
  )
}
