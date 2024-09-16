import MonitorBook from '@/app/ui/monitor-book'

export default function Home({ params }) {
  const { id } = params
  return (
    <main className="max-w-5xl mx-auto my-5 px-4 flex justify-center">
      <MonitorBook monitorId={id} />
    </main>
  )
}
