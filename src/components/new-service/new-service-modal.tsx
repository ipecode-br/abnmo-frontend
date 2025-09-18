'use client'

import React, { useState } from 'react'

import { Button } from '../../components/ui/button'
import { Modal } from '../../components/ui/modal'

export default function NewServiceModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [patientName, setPatientName] = useState('')
  const [responsible, setResponsible] = useState('')
  const [specialty, setSpecialty] = useState('')
  const [date, setDate] = useState('')
  const [status, setStatus] = useState('')
  const [notes, setNotes] = useState('')

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  const handleConfirm = () => {
    closeModal()
  }

  return (
    <>
      <form className='space-y-4'>
        <div>
          <label className='mb-1 block text-sm font-medium'>
            Nome do paciente *
          </label>
          <input
            type='text'
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className='w-full rounded-lg border p-2 text-sm'
            required
          />
        </div>

        <div className='flex gap-4'>
          <div className='flex-1'>
            <label className='mb-1 block text-sm font-medium'>
              Profissional responsável *
            </label>
            <input
              type='text'
              value={responsible}
              onChange={(e) => setResponsible(e.target.value)}
              className='w-full rounded-lg border p-2 text-sm'
              required
            />
          </div>

          <div className='flex-1'>
            <label className='mb-1 block text-sm font-medium'>
              Especialidade médica *
            </label>
            <input
              type='text'
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className='w-full rounded-lg border p-2 text-sm'
              required
            />
          </div>
        </div>

        <div>
          <label className='mb-1 block text-sm font-medium'>
            Data do atendimento *
          </label>
          <input
            type='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className='w-full rounded-lg border p-2 text-sm'
            required
          />
        </div>

        <div>
          <label className='mb-1 block text-sm font-medium'>Quadro geral</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className='w-full rounded-lg border p-2 text-sm'
          >
            <option value=''>Selecionar</option>
            <option value='leve'>Leve</option>
            <option value='moderado'>Moderado</option>
            <option value='grave'>Grave</option>
          </select>
        </div>

        <div>
          <label className='mb-1 block text-sm font-medium'>Observações</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            maxLength={200}
            rows={4}
            className='w-full rounded-lg border p-2 text-sm'
            placeholder='Insira observações sobre o paciente'
          />
          <p className='mt-1 text-xs text-gray-500'>{notes.length}/200</p>
        </div>

        <Button variant='default' onClick={openModal}>
          Cadastrar
        </Button>
      </form>

      <Modal
        isOpen={isOpen}
        title='Confirmar cadastro'
        description='Deseja realmente cadastrar este atendimento?'
        onCloseAction={closeModal}
        onConfirmAction={handleConfirm}
        cancelText='Cancelar'
        confirmText='Confirmar'
      />
    </>
  )
}
