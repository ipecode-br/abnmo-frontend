import { NavButton } from '@/components/ui/nav-button'
import { ROUTES } from '@/constants/routes'

export default function PatientOverview() {
  return (
    <main className='container flex py-8'>
      <NavButton
        className='mx-auto'
        href={ROUTES.patient.screening.patientData}
      >
        Iniciar triagem
      </NavButton>
    </main>
  )
}
