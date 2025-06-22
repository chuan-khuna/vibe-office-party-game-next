import React, { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export function ImageUploader({
  handleUploadImage = (base64: string) => {
    console.log('Image uploaded:', base64)
  },
}) {
  const [imageBase64, setImageBase64] = useState('')

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64 = reader.result as string
        setImageBase64(base64)
        // handleUploadImage(base64)
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const items = event.clipboardData?.items
    if (items) {
      for (const item of items) {
        if (item.type.startsWith('image/')) {
          const file = item.getAsFile()
          if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
              const base64 = reader.result as string
              setImageBase64(base64)
              handleUploadImage(base64)
            }
            reader.readAsDataURL(file)
          }
        }
      }
    }
  }

  return (
    <div className="flex gap-4 w-lg">
      <div
        className="flex-1 border border-dashed border-gray-400 rounded p-4 flex flex-col items-center justify-center text-center min-h-[120px] hover:bg-gray-50 transition"
        tabIndex={0}
        style={{ outline: 'none' }}
        onPaste={(e) => {
          e.preventDefault()
          handlePaste(e)
        }}
      >
        <div className="mb-2">Paste an image here</div>
        <Label htmlFor="image-upload" className="w-full flex justify-center">
          <Button
            type="button"
            className="w-full"
            onClick={() => {
              const input = document.getElementById(
                'image-upload'
              ) as HTMLInputElement
              input?.click()
            }}
          >
            Select File
          </Button>
          <Input
            id="image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            tabIndex={-1}
            onChange={(e) => {
              handleFileChange(e)
            }}
          />
        </Label>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <Button
          type="button"
          className="w-full"
          onClick={() => {
            if (imageBase64) {
              handleUploadImage(imageBase64)
            }
          }}
        >
          Upload
        </Button>
      </div>
    </div>
  )
}
