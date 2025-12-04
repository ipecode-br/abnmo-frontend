'use client'

import { useState } from 'react'

import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { useParams } from '@/hooks/params'

import { PATIENT_HISTORY_CATEGORY_LABELS } from './patient-history.constants'

export default function PatientHistoryFilters() {
  const { updateParams } = useParams()
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  function toggleCategory(value: string) {
    const updated = selectedCategories.includes(value)
      ? selectedCategories.filter((v) => v !== value)
      : [...selectedCategories, value]

    setSelectedCategories(updated)

    updateParams({
      set: [
        {
          key: 'categories',
          value: updated.join(','),
        },
      ],
    })
  }

  return (
    <div className='flex flex-wrap gap-2'>
      <Input
        type='date'
        onChange={(e) =>
          updateParams({
            set: [
              {
                key: 'date',
                value: e.target.value,
              },
            ],
          })
        }
      />

      <Input
        type='date'
        onChange={(e) =>
          updateParams({
            set: [
              {
                key: 'startDate',
                value: e.target.value,
              },
            ],
          })
        }
      />

      <Input
        type='date'
        onChange={(e) =>
          updateParams({
            set: [
              {
                key: 'endDate',
                value: e.target.value,
              },
            ],
          })
        }
      />

      <Select
        placeholder='Categoria'
        options={Object.entries(PATIENT_HISTORY_CATEGORY_LABELS).map(
          ([value, label]) => ({
            value,
            label,
          }),
        )}
        onChange={(value: string) => toggleCategory(value)}
      />

      <Select
        placeholder='Quadro'
        options={[
          { value: 'stable', label: 'Estável' },
          { value: 'crisis', label: 'Em surto' },
        ]}
        onChange={(value: string) =>
          updateParams({
            set: [
              {
                key: 'status',
                value,
              },
            ],
          })
        }
      />
    </div>
  )
}
