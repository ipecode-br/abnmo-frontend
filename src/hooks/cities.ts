'use client'

import { useMemo } from 'react'

import type { SelectOptions } from '@/components/ui/select'
import { CITIES_BY_UF } from '@/constants/cities'
import type { UFType } from '@/constants/enums'

export function useCities(uf: UFType) {
  const cities = useMemo<SelectOptions>(() => {
    if (!uf || !(uf in CITIES_BY_UF)) {
      return []
    }

    const citiesList = CITIES_BY_UF[uf] || []

    return citiesList.map((city) => ({ label: city, value: city }))
  }, [uf])

  return cities
}
