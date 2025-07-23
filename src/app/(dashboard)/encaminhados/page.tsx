import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Encaminhados',
}

export default function ForwardedPage() {
  return (
    <div>
      <h1>page content forwarded here</h1>
    </div>
  )
}
