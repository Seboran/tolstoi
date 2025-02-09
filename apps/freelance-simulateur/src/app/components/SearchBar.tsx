import { Search } from 'lucide-react'
import React from 'react'

export function SearchBar() {
  return (
    <div className="max-w-xl mx-auto relative mb-16">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder="Rechercher"
        className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
      />
    </div>
  )
}
