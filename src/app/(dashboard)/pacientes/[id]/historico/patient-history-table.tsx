'use client'

import { AlertTriangle, Check, History, Pencil, Trash2, X } from 'lucide-react'
import React, { useState } from 'react'

import { DataTableHeader } from '@/components/data-table/header'
import { DataTableHeaderInfo } from '@/components/data-table/header/info'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Divider } from '@/components/ui/divider'
import { ExpandableText } from '@/components/ui/expandable-text'
import { Modal } from '@/components/ui/modal'
import { Select, SelectValue } from '@/components/ui/select'
import { SelectContent } from '@/components/ui/select/content'
import { SelectItem } from '@/components/ui/select/item'
import { SelectTrigger } from '@/components/ui/select/trigger'
import { PatientStatusEnum } from '@/constants/enums'
import { PATIENTS_MOCKS } from '@/utils/mock/patients'

export default function PatientHistoryTable() {
  const longText =
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem similique, eveniet ipsa quam quaerat suscipit dolorum, consequatur totam recusandae voluptatum perferendis placeat molestiae! Obcaecati officia consequatur voluptates, enim nemo dolorem! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem similique, eveniet ipsa quam quaerat suscipit dolorum, consequatur totam recusandae voluptatum perferendis placeat molestiae! Obcaecati officia consequatur voluptates, enim nemo dolorem!'

  const initialPatients = PATIENTS_MOCKS.map((p) => ({
    ...p,
    status: 'stable',
    created_at: new Date(p.created_at),
    notes: longText,
  }))

  const [patients, setPatients] = useState(initialPatients)
  const [editingRowId, setEditingRowId] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [editingNotes, setEditingNotes] = useState<string>('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(
    null,
  )

  const handleEditClick = (
    patientId: string,
    currentStatus: string,
    currentNotes: string,
  ) => {
    setEditingRowId(patientId)
    setSelectedStatus(currentStatus)
    setEditingNotes(currentNotes)
  }

  const handleCancelClick = () => {
    setEditingRowId(null)
    setSelectedStatus(null)
    setEditingNotes('')
  }

  const handleSaveClick = (patientId: string) => {
    if (!selectedStatus) return

    setPatients(
      patients.map((p) =>
        p.id === patientId
          ? {
              ...p,
              status: selectedStatus,
              notes: editingNotes,
            }
          : p,
      ),
    )
    handleCancelClick()
  }

  const handleDeleteClick = (patientId: string) => {
    setSelectedPatientId(patientId)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedPatientId(null)
  }

  const handleConfirmDelete = () => {
    if (selectedPatientId) {
      setPatients(patients.filter((p) => p.id !== selectedPatientId))
      handleCloseModal()
    }
  }

  return (
    <>
      <DataTableHeader>
        <DataTableHeaderInfo icon={<History />} title='Histórico do paciente' />
        <div className='ml-auto flex gap-2'>
          <Button variant='outline'>+ Inativar paciente</Button>
          <Button variant='default'>+ Encaminhar paciente</Button>
        </div>
      </DataTableHeader>

      <Card className='p-6'>
        <div className='mb-10 grid grid-cols-3 gap-4 rounded-lg border border-gray-300 px-5 py-4'>
          <p className='text-foreground-soft'>Data</p>
          <p className='text-foreground-soft'>Profissional</p>
          <p className='text-foreground-soft'>Quadro geral</p>
        </div>

        <div className='grid grid-cols-1'>
          {patients.length === 0 ? (
            <p className='text-foreground-soft text-center'>
              Nenhum histórico para esse paciente.
            </p>
          ) : (
            patients.map((patient) => {
              const isEditing = editingRowId === patient.id

              return (
                <React.Fragment key={patient.id}>
                  <div className='grid grid-cols-3 gap-6 px-3 py-6'>
                    {/* Seção de cabeçalho da tabela*/}
                    <div className='col-span-1'>
                      <p>{patient.created_at.toLocaleDateString('pt-BR')}</p>
                    </div>
                    <div className='col-span-1'>
                      <p>Dr. Fábio Barros</p>
                    </div>
                    <div className='col-span-1'>
                      {isEditing ? (
                        <Select
                          value={selectedStatus || ''}
                          onValueChange={setSelectedStatus}
                        >
                          <SelectTrigger
                            className={`w-full rounded-md border p-2 ${isEditing ? 'border-primary border-2' : ''}`}
                          >
                            <SelectValue placeholder='Selecione o status' />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(PatientStatusEnum).map(
                              ([key, value]) => (
                                <SelectItem key={key} value={key}>
                                  {value}
                                </SelectItem>
                              ),
                            )}
                          </SelectContent>
                        </Select>
                      ) : (
                        <p>
                          {
                            PatientStatusEnum[
                              patient.status as keyof typeof PatientStatusEnum
                            ]
                          }
                        </p>
                      )}
                    </div>

                    {/* Seção de observações e botões de ação */}
                    <div className='col-span-3 flex items-center'>
                      <div className='flex flex-grow flex-col gap-1 pr-6'>
                        <strong>Observações:</strong>
                        {isEditing ? (
                          <textarea
                            value={editingNotes}
                            onChange={(e) => setEditingNotes(e.target.value)}
                            className='border-primary text-foreground-soft min-h-20 w-full resize-y rounded-md border-2 p-2'
                          />
                        ) : (
                          <ExpandableText
                            text={patient.notes}
                            className='text-foreground-soft'
                          />
                        )}
                      </div>
                      <div className='ml-auto flex items-start justify-end gap-2'>
                        {isEditing ? (
                          <>
                            <Button
                              variant='ghost'
                              size='icon'
                              onClick={() => handleSaveClick(patient.id)}
                            >
                              <Check className='text-foreground-soft h-4 w-4' />
                            </Button>
                            <Button
                              variant='ghost'
                              size='icon'
                              onClick={handleCancelClick}
                            >
                              <X className='text-foreground-soft h-4 w-4' />
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              variant='ghost'
                              size='icon'
                              onClick={() =>
                                handleEditClick(
                                  patient.id,
                                  patient.status,
                                  patient.notes,
                                )
                              }
                            >
                              <Pencil className='text-foreground-soft h-4 w-4' />
                            </Button>
                            <Button
                              variant='ghost'
                              size='icon'
                              onClick={() => handleDeleteClick(patient.id)}
                            >
                              <Trash2 className='text-foreground-soft h-4 w-4' />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <Divider />
                </React.Fragment>
              )
            })
          )}
        </div>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onCloseAction={handleCloseModal}
        onConfirmAction={handleConfirmDelete}
        title='Deletar esse histórico?'
        description='Esta ação é irreversível e excluirá esse histórico permanentemente.'
        confirmText='Deletar'
        cancelText='Cancelar'
        icon={
          <div className='bg-error/10 flex-shrink-0 rounded-md p-2'>
            <AlertTriangle className='text-error h-6 w-6' />
          </div>
        }
      />
    </>
  )
}
