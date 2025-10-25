import {
  CircleAlertIcon,
  CircleCheckIcon,
  ClipboardListIcon,
  ClipboardTypeIcon,
  ContactRoundIcon,
  FilesIcon,
  HomeIcon,
  UsersRoundIcon,
} from '@/components/ui/icons'

import { ROUTES } from '../routes'
import type { Breadcrumbs } from '.'

export const PATIENT_BREADCRUMBS: Breadcrumbs = {
  paciente: {
    icon: HomeIcon,
    name: 'Início',
    path: ROUTES.patient.main,
  },
  documentos: {
    icon: FilesIcon,
    name: 'Documentos',
    path: ROUTES.patient.documents.pending,
  },
  pendentes: {
    icon: CircleAlertIcon,
    name: 'Pendentes',
    path: ROUTES.patient.documents.pending,
  },
  enviados: {
    icon: CircleCheckIcon,
    name: 'Enviados',
    path: ROUTES.patient.documents.pending,
  },
  triagem: {
    icon: ClipboardTypeIcon,
    name: 'Triagem',
    path: ROUTES.patient.screening.patientData,
  },
  'seus-dados': {
    icon: ContactRoundIcon,
    name: 'Seus dados',
    path: ROUTES.patient.screening.patientData,
  },
  'laudo-medico': {
    icon: ClipboardListIcon,
    name: 'Laudo médico',
    path: ROUTES.patient.screening.medicalReport,
  },
  'rede-de-apoio': {
    icon: UsersRoundIcon,
    name: 'Rede de apoio',
    path: ROUTES.patient.screening.supportNetwork,
  },
}
