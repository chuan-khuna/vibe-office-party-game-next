'use client'

import React, { useState, useEffect } from 'react'

import { ImageUploader } from '@/components/input/image-uploader'

export default function FourImages() {
  const [imageBase64, setImageBase64] = useState('')

  return (
    <div className="in-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <ImageUploader />
    </div>
  )
}
