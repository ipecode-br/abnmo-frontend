import { convertObjectToOptions } from '@/helpers/convert-object-to-options'

export const DOCUMENT_TYPE = {
  laudo: 'Laudo',
  outros: 'Outros',
} as const

export type DocumentType = keyof typeof DOCUMENT_TYPE

export const DOCUMENTS_TUPLE = Object.keys(DOCUMENT_TYPE) as ['laudo', 'outros']
export const DOCUMENT_OPTIONS = convertObjectToOptions(DOCUMENT_TYPE)
