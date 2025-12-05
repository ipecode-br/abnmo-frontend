import React, { useState } from 'react'

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ patientName, responsible, specialty, date, status, notes })
    closeModal()
  }

  return (
    <>
      <button
        onClick={openModal}
        className='bg-primary text-primary-foreground hover:bg-primary-soft rounded-lg px-4 py-2 font-medium transition'
      >
        Novo Atendimento
      </button>

      {isOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
          <div
            className='bg-opacity-30 fixed inset-0 bg-black'
            onClick={closeModal}
          />

          <div className='bg-card animate-fade-in z-10 w-full max-w-md scale-100 transform rounded-2xl p-6 shadow-xl transition-transform'>
            <h3 className='text-foreground mb-4 text-lg font-semibold'>
              Novo Atendimento
            </h3>

            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <label className='text-foreground mb-1 block text-sm font-medium'>
                  Nome do paciente *
                </label>
                <input
                  type='text'
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className='border-border focus:ring-primary w-full rounded-lg border p-2 text-sm focus:ring-2 focus:outline-none'
                  required
                />
              </div>

              <div className='flex gap-4'>
                <div className='flex-1'>
                  <label className='text-foreground mb-1 block text-sm font-medium'>
                    Profissional responsável *
                  </label>
                  <input
                    type='text'
                    value={responsible}
                    onChange={(e) => setResponsible(e.target.value)}
                    className='border-border focus:ring-primary w-full rounded-lg border p-2 text-sm focus:ring-2 focus:outline-none'
                    required
                  />
                </div>

                <div className='flex-1'>
                  <label className='text-foreground mb-1 block text-sm font-medium'>
                    Especialidade médica *
                  </label>
                  <input
                    type='text'
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    className='border-border focus:ring-primary w-full rounded-lg border p-2 text-sm focus:ring-2 focus:outline-none'
                    required
                  />
                </div>
              </div>

              <div>
                <label className='text-foreground mb-1 block text-sm font-medium'>
                  Data do atendimento *
                </label>
                <input
                  type='date'
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className='border-border focus:ring-primary w-full rounded-lg border p-2 text-sm focus:ring-2 focus:outline-none'
                  required
                />
              </div>

              <div>
                <label className='text-foreground mb-1 block text-sm font-medium'>
                  Quadro geral
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className='border-border focus:ring-primary w-full rounded-lg border p-2 text-sm focus:ring-2 focus:outline-none'
                >
                  <option value=''>Selecionar</option>
                  <option value='leve'>Leve</option>
                  <option value='moderado'>Moderado</option>
                  <option value='grave'>Grave</option>
                </select>
              </div>

              <div>
                <label className='text-foreground mb-1 block text-sm font-medium'>
                  Observações
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  maxLength={200}
                  rows={4}
                  className='border-border focus:ring-primary w-full rounded-lg border p-2 text-sm focus:ring-2 focus:outline-none'
                  placeholder='Insira observações sobre o paciente'
                />
                <p className='text-foreground-soft mt-1 text-xs'>
                  {notes.length}/200
                </p>
              </div>

              <div className='mt-4 flex justify-end gap-2'>
                <button
                  type='button'
                  onClick={closeModal}
                  className='border-border rounded-lg border px-4 py-2 text-sm transition hover:bg-gray-100'
                >
                  Cancelar
                </button>
                <button
                  type='submit'
                  className='bg-primary text-primary-foreground hover:bg-primary-soft rounded-lg px-4 py-2 font-medium transition'
                >
                  Cadastrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
