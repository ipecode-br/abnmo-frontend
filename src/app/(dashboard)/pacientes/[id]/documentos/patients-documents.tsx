'use client'

import { CircleXIcon, Paperclip, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { DialogClose } from '@/components/ui/dialog/close'
import { DialogContainer } from '@/components/ui/dialog/container'
import { DialogDescription } from '@/components/ui/dialog/description'
import { DialogFooter } from '@/components/ui/dialog/footer'
import { DialogHeader } from '@/components/ui/dialog/header'
import { DialogTitle } from '@/components/ui/dialog/title'
import { DialogTrigger } from '@/components/ui/dialog/trigger'

type Document = {
  id: string
  name: string
  url: string
  created_at: string
  size: string
}

interface PatientsDocumentsProps {
  sections: {
    title: string
    documents: Document[]
  }[]
}

export function PatientsDocuments({
  sections,
}: Readonly<PatientsDocumentsProps>) {
  const [isEditing, setIsEditing] = useState(false)

  function handleConfirmDelete(id: string) {
    if (!id) return

    console.log(id)
  }

  return (
    <section className='space-y-10'>
      {sections ? (
        sections.map((section) => (
          <section key={section.title}>
            <div className='mb-4 flex items-center justify-between'>
              <h2 className='text-xl font-semibold text-gray-800'>
                {section.title}
              </h2>
              <Button size='icon' className='size-8'>
                <Plus />
              </Button>
            </div>

            <div className='flex flex-col space-y-6'>
              {section.documents.map((doc) => (
                <div
                  key={doc.name}
                  className='flex items-center justify-between border-b border-gray-200 pb-2'
                >
                  <div className='flex items-center space-x-1'>
                    <Paperclip size={16} className='text-gray-500' />
                    <a
                      download
                      className='text-primary underline'
                      title={`Baixar ${doc.name}`}
                    >
                      {doc.name}
                    </a>
                  </div>

                  <div className='flex items-center space-x-3'>
                    <span className='text-sm text-gray-500'>
                      {new Date(doc.created_at).toLocaleDateString('pt-BR')}
                    </span>

                    <span className='text-sm text-gray-500'>{doc.size}</span>

                    {isEditing && (
                      <Dialog>
                        <DialogTrigger
                          size='icon'
                          variant='ghost'
                          className='size-8'
                        >
                          <Trash2 />
                        </DialogTrigger>

                        <DialogContainer>
                          <DialogHeader
                            icon={CircleXIcon}
                            iconClassName='text-error bg-error/10'
                          >
                            <DialogTitle>Excluir documento?</DialogTitle>
                            <DialogDescription>
                              Confirme a exclusão do documento{' '}
                              <strong>{doc.name}</strong>
                            </DialogDescription>
                          </DialogHeader>

                          <DialogFooter className='flex'>
                            <Button
                              className='flex-1'
                              type='button'
                              variant='destructive'
                              onClick={() => handleConfirmDelete(doc.id)}
                            >
                              Excluir documento
                            </Button>

                            <DialogClose className='flex-1'>
                              Cancelar
                            </DialogClose>
                          </DialogFooter>
                        </DialogContainer>
                      </Dialog>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))
      ) : (
        <p className='text-gray-500'>Nenhum documento encontrado.</p>
      )}

      <div className='mt-4 flex justify-end'>
        <Button variant='outline' onClick={() => setIsEditing((prev) => !prev)}>
          {isEditing ? 'Concluir edição' : 'Editar'}
        </Button>
      </div>
    </section>
  )
}
