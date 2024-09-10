import MonitorCard from '@/app/ui/monitor-card'
import ProvinceSelector from './ui/province-selector'
import DatePicker from './ui/data-picker'

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto my-5 px-4">
      <div className="flex gap-5 my-3 items-center">
        <ProvinceSelector />
        <DatePicker labelName={'Start date'} />
        <DatePicker labelName={'End date'} />
      </div>
      <MonitorCard />
    </main>
  )
}
