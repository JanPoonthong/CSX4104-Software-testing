'use client'
import Image from 'next/image'

export default function SearchBar() {
  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const searchTerm = formData.get('search')
  }

  return (
    <form className="relative" onSubmit={handleSubmit}>
      <input
        type="text"
        className="border border-slate-400 p-2 pr-9 rounded-lg w-[203.75px] focus:ring focus:outline-none focus:ring-blue-300"
        name="search"
      />
      <button type="submit">
        <Image
          className="absolute top-1/2 right-2 -translate-y-2/4"
          src="/icons/search.svg"
          alt="Search Icon"
          width={20}
          height={20}
        />
      </button>
    </form>
  )
}
