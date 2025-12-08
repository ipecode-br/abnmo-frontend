'use client'

import { Camera, CornerUpRight } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'

import type {
  PatientHistoryCategory,
  PatientHistoryStatus,
} from './patient-history.types'
import { PatientHistoryFilters } from './patient-history-filters'
import PatientHistoryListTable, {
  MOCK_HISTORY,
} from './patient-history-list-table'

export default function Page() {
  const [filters, setFilters] = useState<{
    searchName: string
    statusFilter: 'all' | PatientHistoryStatus
    categoryFilter: '' | PatientHistoryCategory
    sortOption: string
  }>({
    searchName: '',
    statusFilter: 'all',
    categoryFilter: '',
    sortOption: 'date_desc',
  })

  const [profileImage, setProfileImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const PROFILE_IMAGE_KEY = 'profileImage'

  useEffect(() => {
    const savedImage = localStorage.getItem(PROFILE_IMAGE_KEY)
    if (savedImage) setProfileImage(savedImage)
  }, [])

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setProfileImage(reader.result)
        localStorage.setItem(PROFILE_IMAGE_KEY, reader.result)
      }
    }
    reader.readAsDataURL(file)
  }

  const profileName = 'Sonia Amorim'
  const totalAttendances = MOCK_HISTORY.length
  const patientId = '1'

  return (
    <main className='container mx-auto px-4 py-6'>
      <div className='mb-6 flex flex-col gap-3'>
        <h1 className='text-[16px] font-normal'>Histórico de atendimentos</h1>
        <div className='mb-3 h-[1px] w-full bg-gray-200' />
        <div className='flex flex-col gap-2'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div
                className='relative flex h-12 w-12 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gray-200'
                onClick={handleImageClick}
              >
                {profileImage && (
                  <Image
                    src={profileImage}
                    alt={profileName}
                    fill
                    className='object-cover'
                  />
                )}
                <div className='absolute right-0 bottom-0 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow'>
                  <Camera className='h-3 w-3 text-gray-700' />
                </div>
                <input
                  type='file'
                  accept='image/*'
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  className='hidden'
                />
              </div>
              <span className='text-[20px] font-medium'>{profileName}</span>
            </div>
            <Button className='flex items-center gap-1 px-3 py-1 text-[14px]'>
              <CornerUpRight size={16} /> Encaminhar paciente
            </Button>
          </div>
          <span className='mt-1 text-[16px] text-gray-500'>
            <strong className='text-black'>{totalAttendances}</strong>{' '}
            atendimentos realizados
          </span>
        </div>
      </div>

      <PatientHistoryFilters onFilterChange={setFilters} />
      <PatientHistoryListTable patientId={patientId} filters={filters} />
    </main>
  )
}
