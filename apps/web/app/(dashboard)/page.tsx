import { redirect } from 'next/navigation'
import React from 'react'

const Index = () => {
  redirect("/system/menu")
  return null
}

export default Index