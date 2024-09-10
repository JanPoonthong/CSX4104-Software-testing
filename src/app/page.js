import MonitorCard from '@/app/ui/monitor-card'
import ProvinceSelector from './ui/province-selector'
import DatePicker from './ui/data-picker'
import SearchBar from './ui/search-bar'

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto my-5 px-4">
      <div className="flex justify-between my-3 items-center">
        <div className='flex gap-5 '>
          <ProvinceSelector />
          <DatePicker title={'Start date'} />
          <DatePicker title={'End date'} />
        </div>
        <div>
          <SearchBar />
        </div>
      </div>
      <MonitorCard />
    </main>
  )
}
