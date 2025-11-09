import { subDays } from 'date-fns'

import { DocumentType } from '@/constants/documents'

interface PatientPendingRequirement {
  id: string
  patientName: string
  documentType: DocumentType
  createdAt: Date | string
}

export const mockPendingRequirements: PatientPendingRequirement[] = [
  {
    id: '1',
    patientName: 'Maria Silva',
    documentType: 'laudo',
    createdAt: subDays(new Date(), 1),
  },
  {
    id: '2',
    patientName: 'João Santos',
    documentType: 'laudo',
    createdAt: subDays(new Date(), 4),
  },
  {
    id: '3',
    patientName: 'Ana Oliveira',
    documentType: 'laudo',
    createdAt: subDays(new Date(), 8),
  },
  {
    id: '4',
    patientName: 'Carlos Pereira',
    documentType: 'laudo',
    createdAt: subDays(new Date(), 2),
  },
  {
    id: '5',
    patientName: 'Beatriz Costa',
    documentType: 'laudo',
    createdAt: subDays(new Date(), 5),
  },
  {
    id: '6',
    patientName: 'Fernando Almeida',
    documentType: 'laudo',
    createdAt: subDays(new Date(), 9),
  },
  {
    id: '7',
    patientName: 'Gabriela Rocha',
    documentType: 'laudo',
    createdAt: subDays(new Date(), 0),
  },
  {
    id: '8',
    patientName: 'Roberto Lima',
    documentType: 'laudo',
    createdAt: subDays(new Date(), 6),
  },
  {
    id: '9',
    patientName: 'Isabela Martins',
    documentType: 'laudo',
    createdAt: subDays(new Date(), 10),
  },
]
