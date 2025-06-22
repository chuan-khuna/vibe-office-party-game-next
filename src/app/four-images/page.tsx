'use client'

import React, { useState, useEffect } from 'react'

import { ImageUploader } from '@/components/input/image-uploader'
import { ImagePreview } from '@/components/input/image-preview'

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function FourImages() {
  const MAX_IMAGES = 6

  const [imageBase64List, setImageBase64List] = useState<string[]>([])

  const handleUploadImage = (base64: string) => {
    if (imageBase64List.length < MAX_IMAGES) {
      setImageBase64List((prevList) => [...prevList, base64])
    } else {
      //  remove the oldest image if the limit is reached
      setImageBase64List((prevList) => {
        const newList = [...prevList.slice(1), base64]
        return newList
      })
    }
  }

  return (
    <div className="in-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <ImageUploader handleUploadImage={handleUploadImage} />
    </div>
  )
}
