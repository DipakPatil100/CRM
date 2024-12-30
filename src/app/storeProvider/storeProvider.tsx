'use client'
import { makeStore,AppStore } from '@/lib/store'
import { useRef } from 'react'
import { Provider } from 'react-redux'

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore | null>(null)
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
    // storeRef.current.dispatch(add("product"))
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}