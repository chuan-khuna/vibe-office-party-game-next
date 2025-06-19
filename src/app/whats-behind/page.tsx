'use client'

import React, { useState } from 'react'
import { Slider } from '@/components/ui/slider'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function InputFile() {
  return (
    <div className="grid w-full max-w-sm items-center gap-3">
      <Label htmlFor="picture">Picture</Label>
      <Input id="picture" type="file" />
    </div>
  )
}

export function ImageWithGrid({
  imageBase64,
  numRows,
  numCols,
}: {
  imageBase64: string
  numRows: number
  numCols: number
}) {
  return (
    <div className="relative">
      {/* Use an img to get the actual dimensions */}
      <img
        src={imageBase64}
        className=" absolute"
        alt="Hidden reference image"
        onLoad={(e) => {
          const img = e.target as HTMLImageElement
          const container = img.parentElement
          if (container) {
            // Set container aspect ratio to match image
            container.style.aspectRatio = `${img.naturalWidth} / ${img.naturalHeight}`
          }
        }}
      />
      <div
        className="w-full h-0 rounded bg-cover bg-center"
        style={{
          backgroundImage: `url(${imageBase64})`,
        }}
      >
        <div
          className="absolute inset-0 grid"
          style={{
            gridTemplateRows: `repeat(${numRows}, 1fr)`,
            gridTemplateColumns: `repeat(${numCols}, 1fr)`,
          }}
        >
          {Array.from({ length: numRows * numCols }).map((_, index) => (
            <div
              key={index}
              className="border border-gray-400/50 hover:bg-black/10"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function WhatsBehind() {
  const sliderMax = 15
  const sliderMin = 3
  const sliderStep = 1

  const [numRows, setNumRows] = useState(5)
  const [numCols, setNumCols] = useState(5)
  const [imageBase64, setImageBase64] = useState('')

  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center">
        <h1 className="text-4xl font-bold tracking-tight">
          What&apos;s Behind
        </h1>

        {/* input group */}
        <div className="flex flex-col gap-4 items-center w-full max-w-md border p-4 rounded">
          <p>Number of Rows: {numRows}</p>
          <Slider
            defaultValue={[numRows]}
            max={sliderMax}
            min={sliderMin}
            step={sliderStep}
            onValueChange={setNumRows}
          />
          <p>Number of Columns: {numCols}</p>
          <Slider
            defaultValue={[numCols]}
            max={sliderMax}
            min={sliderMin}
            step={sliderStep}
            onValueChange={setNumCols}
          />

          <div className="flex flex-col gap-2 items-center w-full max-w-md">
            <InputFile />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => {
                const fileInput =
                  document.querySelector<HTMLInputElement>('input[type="file"]')
                if (fileInput?.files?.length) {
                  const file = fileInput.files[0]
                  const reader = new FileReader()
                  reader.onloadend = () => {
                    setImageBase64(reader.result as string)
                  }
                  reader.readAsDataURL(file)
                }
              }}
            >
              Upload Image
            </button>
          </div>
        </div>

        {/* display uploaded image */}
        {imageBase64 && (
          <div className="w-full">
            <ImageWithGrid
              imageBase64={imageBase64}
              numRows={numRows}
              numCols={numCols}
            />
          </div>
        )}
      </main>
    </div>
  )
}
