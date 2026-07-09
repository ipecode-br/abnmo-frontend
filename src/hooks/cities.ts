'use client'

import { useMemo } from 'react'

import type { SelectOption } from '@/components/ui-v2/select'
import { CITIES_BY_UF } from '@/constants/cities'
import type { BrazilState } from '@/enums/shared'

export function useCities(uf: BrazilState) {
  const cities = useMemo<SelectOption[]>(() => {
    if (!uf || !(uf in CITIES_BY_UF)) {
      return []
    }

    const citiesList = CITIES_BY_UF[uf] || []

    return citiesList.map((city) => ({ label: city, value: city }))
  }, [uf])

  return cities
}
