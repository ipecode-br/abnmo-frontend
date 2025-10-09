import { PatientsDocuments } from './patients-documents'

const PATIENT_SECTIONS = [
  {
    title: 'Laudos',
    documents: [
      {
        id: '1',
        name: 'Laudo_Cardiologico_2025.pdf',
        created_at: '2025-10-05',
        size: '783.4 KB',
        url: '/documents/Laudo_Cardiologico_2025.pdf',
      },
      {
        id: '2',
        name: 'Exame_de_Sangue_Completo.pdf',
        created_at: '2025-09-28',
        size: '1.2 MB',
        url: '/documents/Exame_de_Sangue_Completo.pdf',
      },
    ],
  },
  {
    title: 'Anexos',
    documents: [
      {
        id: '3',
        name: 'RG_Frente_Verso.pdf',
        created_at: '2025-01-15',
        size: '450.1 KB',
        url: '/documents/RG_Frente_Verso.pdf',
      },
      {
        id: '4',
        name: 'Comprovante_Residencia.pdf',
        created_at: '2025-08-01',
        size: '249.0 KB',
        url: '/documents/Comprovante_Residencia.pdf',
      },
    ],
  },
]

export default function Page() {
  return <PatientsDocuments sections={PATIENT_SECTIONS} />
}
