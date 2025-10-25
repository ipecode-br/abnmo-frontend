'use client'

import { useState } from 'react'

import { Pagination } from '@/components/pagination'
import { FileIcon } from '@/components/ui/icons'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import {
  DocumentStatusTag,
  StatusTagType,
} from '../../../../components/tags/document-status'

type DocumentType = {
  id: number
  formName: string
  sendDate: string
  status: 'aguardando aprovação' | 'aprovado' | 'recusado'
}
const sentsDocumentsMock: DocumentType[] = [
  {
    id: 1,
    formName: 'Formulário de Catalogação',
    sendDate: '16/10/2025',
    status: 'aguardando aprovação',
  },
  {
    id: 2,
    formName: 'Exame Diagnóstico NMO',
    sendDate: '14/10/2025',
    status: 'aprovado',
  },
  {
    id: 3,
    formName: 'Anexo Laudo Médico',
    sendDate: '10/10/2025',
    status: 'recusado',
  },
  {
    id: 4,
    formName: 'Formulário de Catalogação',
    sendDate: '08/10/2025',
    status: 'aprovado',
  },
  {
    id: 5,
    formName: 'Exame Diagnóstico NMO',
    sendDate: '05/10/2025',
    status: 'aguardando aprovação',
  },
  {
    id: 6,
    formName: 'Anexo Laudo Médico',
    sendDate: '01/10/2025',
    status: 'aprovado',
  },
  {
    id: 7,
    formName: 'Formulário de Avaliação Inicial',
    sendDate: '30/09/2025',
    status: 'recusado',
  },
  {
    id: 8,
    formName: 'Formulário de Catalogação',
    sendDate: '28/09/2025',
    status: 'aguardando aprovação',
  },
  {
    id: 9,
    formName: 'Exame Diagnóstico NMO',
    sendDate: '25/09/2025',
    status: 'aprovado',
  },
  {
    id: 10,
    formName: 'Anexo Laudo Médico',
    sendDate: '20/09/2025',
    status: 'aguardando aprovação',
  },
  {
    id: 11,
    formName: 'Formulário de Avaliação Inicial',
    sendDate: '15/09/2025',
    status: 'aprovado',
  },
]

export const DOCUMENT_STATUS_MAP: Record<string, StatusTagType> = {
  aprovado: 'approved',
  recusado: 'rejected',
  'aguardando aprovação': 'waiting',
}

export function SentTable() {
  const [stableTotal] = useState(20)
  const isDocumentsEmpty = sentsDocumentsMock.length === 0

  return (
    <>
      <Table>
        <TableHeader className='bg-background-soft'>
          <TableRow>
            <TableHead className='border-none'>Nome do formulário</TableHead>
            <TableHead className='border-none'>Data de envio</TableHead>
            <TableHead className='border-none'>Status</TableHead>
          </TableRow>
        </TableHeader>

        {isDocumentsEmpty && (
          <TableBody>
            <TableRow>
              <TableCell colSpan={6} className='border-0 px-0 py-0'>
                <div className='border-border mt-3 rounded-lg border px-2.5 py-2'>
                  Você não enviou nenhum formulário até o momento.
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        )}
        <TableBody>
          {sentsDocumentsMock?.map((sent) => (
            <TableRow key={sent.id}>
              <TableCell className='flex items-center gap-1.5 py-2'>
                <span className='text-disabled/50'>
                  <FileIcon size={32} strokeWidth={0.5} />
                </span>
                <span>{sent.formName}</span>
              </TableCell>
              <TableCell className='py-2'>{sent.sendDate}</TableCell>
              <TableCell className='py-2'>
                <DocumentStatusTag status={DOCUMENT_STATUS_MAP[sent.status]} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {!isDocumentsEmpty && (
        <div className='mt-7'>
          <Pagination totalItems={stableTotal} />
        </div>
      )}
    </>
  )
}
