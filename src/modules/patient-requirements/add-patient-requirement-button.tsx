'use client'

import { PlusIcon } from 'lucide-react'
import React, { useState } from 'react'

import type { ButtonProps } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog/index'
import { DialogTrigger } from '@/components/ui/dialog/trigger'

import { PatientRequirementModal } from './requirement-modal'

export function AddPatientRequirementButton(props: Readonly<ButtonProps>) {
  const [isPatientRequirementOpen, setIsPatientRequirementOpen] =
    useState(false)

  return (
    <Dialog
      open={isPatientRequirementOpen}
      onOpenChange={setIsPatientRequirementOpen}
    >
      <DialogTrigger {...props}>
        <PlusIcon />
        Nova solicitação
      </DialogTrigger>

      {isPatientRequirementOpen && (
        <PatientRequirementModal onOpenChange={setIsPatientRequirementOpen} />
      )}
    </Dialog>
  )
}
