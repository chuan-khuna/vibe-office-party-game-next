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
  const [dragActive, setDragActive] = useState(false)

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64 = reader.result as string
        setImageBase64(base64)
        // handleUploadImage(base64)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleFile(file)
    }
  }

  const handlePaste = (
    event:
      | React.ClipboardEvent<HTMLInputElement>
      | React.ClipboardEvent<HTMLDivElement>
  ) => {
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

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]
      handleFile(file)
    }
  }

  return (
    <div className="flex flex-col gap-4 w-lg max-w-md mx-auto">
      <div
        className={`border border-dashed border-gray-400 rounded p-4 flex flex-col items-center justify-center text-center min-h-[120px] hover:bg-gray-50 transition ${
          dragActive ? 'bg-blue-100 border-blue-400' : ''
        }`}
        tabIndex={0}
        style={{ outline: 'none' }}
        onPaste={(e) => {
          e.preventDefault()
          handlePaste(e)
        }}
        onDragOver={handleDragOver}
        onDragEnter={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="mb-2">Paste, drag & drop, or select an image</div>
        <Label htmlFor="image-upload" className="w-full flex justify-center">
          <Button
            type="button"
            className="w-full"
            variant="outline"
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
            onChange={handleFileChange}
          />
        </Label>
      </div>
      <Button
        type="button"
        className="w-full mt-4"
        onClick={() => {
          if (imageBase64) {
            handleUploadImage(imageBase64)
          }
        }}
      >
        Upload
      </Button>
    </div>
  )
}
