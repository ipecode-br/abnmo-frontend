import { useState } from 'react'

import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { useParams } from '@/hooks/params'

import { PATIENT_HISTORY_CATEGORY_LABELS } from './patient-history.constants'
import type {
  PatientHistoryCategory,
  PatientHistoryStatus,
} from './patient-history.types'

export default function PatientHistoryFilters() {
  const { updateParams } = useParams()
  const [selectedCategories, setSelectedCategories] = useState<
    PatientHistoryCategory[]
  >([])

  function toggleCategory(value: string) {
    const category = value as PatientHistoryCategory
    const updated = selectedCategories.includes(category)
      ? selectedCategories.filter((v) => v !== category)
      : [...selectedCategories, category]

    setSelectedCategories(updated)

    updateParams({
      set: [{ key: 'categories', value: updated.join(',') }],
    })
  }

  function handleStatusChange(value: string) {
    const status = value as PatientHistoryStatus
    updateParams({ set: [{ key: 'status', value: status }] })
  }

  return (
    <div className='flex flex-wrap gap-2'>
      <Input
        type='date'
        onChange={(e) =>
          updateParams({ set: [{ key: 'date', value: e.target.value }] })
        }
      />
      <Input
        type='date'
        onChange={(e) =>
          updateParams({ set: [{ key: 'startDate', value: e.target.value }] })
        }
      />
      <Input
        type='date'
        onChange={(e) =>
          updateParams({ set: [{ key: 'endDate', value: e.target.value }] })
        }
      />

      <Select
        placeholder='Categoria'
        options={Object.entries(PATIENT_HISTORY_CATEGORY_LABELS).map(
          ([value, label]) => ({ value, label }),
        )}
        onValueChange={toggleCategory}
      />

      <Select
        placeholder='Quadro'
        options={[
          { value: 'stable', label: 'Estável' },
          { value: 'crisis', label: 'Em surto' },
        ]}
        onValueChange={handleStatusChange}
      />
    </div>
  )
}
