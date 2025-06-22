'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ImageUploader } from '@/components/input/image-uploader'
import { ImageCard } from '@/components/four-images/image-card'
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
  const [imageBase64List, setImageBase64List] = useState<
    { base64: string; isHidden: boolean }[]
  >([])

  const handleUploadImage = (base64: string) => {
    setImageBase64List((prevList) => [
      ...prevList,
      {
        base64,
        isHidden: true,
      },
    ])
  }

  const handleToggleImageVisibility = (index: number) => {
    setImageBase64List((prevList) =>
      prevList.map((item, idx) =>
        idx === index ? { ...item, isHidden: !item.isHidden } : item
      )
    )
  }

  const handleResetImages = () => {
    setImageBase64List([])
  }

  const handleDeleteImage = (index: number) => {
    setImageBase64List((prevList) => prevList.filter((_, idx) => idx !== index))
  }

  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] flex flex-col items-center">
      <Button onClick={handleResetImages}>Reset Game</Button>
      <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-8">
        {imageBase64List.map((data, idx) => (
          <ImageCard
            key={idx}
            base64={data.base64}
            isHidden={data.isHidden}
            idx={idx}
            handleToggleVisibility={handleToggleImageVisibility}
            handleDeleteFunc={handleDeleteImage}
          />
        ))}
        {/* Last card: input uploader */}
        <Card>
          <CardContent>
            <ImageUploader handleUploadImage={handleUploadImage} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
