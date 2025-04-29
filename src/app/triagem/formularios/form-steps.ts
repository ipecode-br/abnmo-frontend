import { ROUTES } from '@/constants/routes'

export const STEPS = [
  {
    label: 'Seus dados',
    info: 'Preencha os campos para prosseguir para a próxima etapa.',
    path: ROUTES.screening.forms.patientData,
  },
  {
    label: 'Laudo Médico',
    info: 'Preencha os campos e anexe os documentos necessários.',
    path: ROUTES.screening.forms.medicalReport,
  },
  {
    label: 'Rede de apoio',
    info: 'Informe os dados de contato necessários.',
    path: ROUTES.screening.forms.supportNetwork,
  },
]
