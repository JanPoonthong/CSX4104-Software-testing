import RateCalculation from '@/app/ui/rate-calculation'

export default function Home({ params }) {
  const { id } = params
  return (
    <main className="max-w-5xl mx-auto my-5 px-4 flex justify-center">
      <RateCalculation monitorId={id} />
    </main>
  )
}
