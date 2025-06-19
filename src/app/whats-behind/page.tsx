'use client'

import React, { useState, useEffect } from 'react'
import { Slider } from '@/components/ui/slider'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export function CustomShadCnFileInput() {
  const [fileName, setFileName] = useState('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
    }
  }

  return (
    <div className="relative w-fit group">
      {/* Hidden actual input */}
      <Input
        id="picture"
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Styled label acts as visible trigger */}
      <label
        htmlFor="picture"
        className="cursor-pointer bg-gray-100 border border-gray-300 rounded px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
      >
        {fileName ? 'Hover here to show file path' : 'Choose a file'}
      </label>

      {/* Tooltip on hover to show filename */}
      {fileName && (
        <div className="absolute left-0 mt-1 w-max bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          {fileName}
        </div>
      )}
    </div>
  )
}

export function FileUploadInput({
  setImageFn,
}: {
  setImageFn: (image: string) => void
}) {
  return (
    <div className="flex w-full max-w-sm items-center gap-2">
      <CustomShadCnFileInput />
      <Button
        type="submit"
        variant="outline"
        onClick={() => {
          const fileInput =
            document.querySelector<HTMLInputElement>('input[type="file"]')
          if (fileInput?.files?.length) {
            const file = fileInput.files[0]
            const reader = new FileReader()
            reader.onloadend = () => {
              setImageFn(reader.result as string)
            }
            reader.readAsDataURL(file)
          }
        }}
      >
        Upload
      </Button>
    </div>
  )
}

export function ImageWithGrid({
  imageBase64,
  numRows,
  numCols,
  state,
  toggleFn: handleToggleCellState,
}: {
  imageBase64: string
  numRows: number
  numCols: number
  state: Record<string, boolean>
  toggleFn: (row: number, col: number) => void
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
          {Array.from({ length: numRows }).map((_, row) =>
            Array.from({ length: numCols }).map((_, col) => (
              <div
                key={`${row}_${col}`}
                className={`border border-white/50  ${
                  state[`${row}_${col}`] ? 'bg-black/100' : ''
                }`}
                onClick={() => {
                  handleToggleCellState(row, col)
                }}
              >
                {state[`${row}_${col}`] && (
                  <span className="text-white text-m font-mono flex justify-center items-center h-full select-none">
                    {row},{col}
                  </span>
                )}
              </div>
            ))
          )}
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

  const [gridState, setGridState] = useState<Record<string, boolean>>()

  const generateDefaultGameStates = () => {
    // object with key `row_col` and the value boolean indicating whether the background image is hidden or not
    const states: Record<string, boolean> = {}
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        // is the cell at `row_col` hidden or not?
        states[`${row}_${col}`] = true
      }
    }
    setGridState(states)
  }

  React.useEffect(() => {
    generateDefaultGameStates()
  }, [numRows, numCols])

  const handleToggleCellState = (row: number, col: number) => {
    console.log(`Toggling cell at row ${row}, col ${col}`)
    if (!gridState) return
    const key = `${row}_${col}`
    setGridState((prevStates) => ({
      ...prevStates,
      [key]: !prevStates[key], // Toggle the state
    }))
  }

  const handleShowAll = () => {
    if (!gridState) return
    const newStates: Record<string, boolean> = {}
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        newStates[`${row}_${col}`] = false
      }
    }
    setGridState(newStates)
  }

  const handleHideAll = () => {
    if (!gridState) return
    const newStates: Record<string, boolean> = {}
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        newStates[`${row}_${col}`] = true
      }
    }
    setGridState(newStates)
  }

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
            <FileUploadInput setImageFn={setImageBase64} />
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onDoubleClick={handleShowAll}
              disabled={!imageBase64}
            >
              Show All
            </Button>
            <Button
              variant="outline"
              onClick={handleHideAll}
              disabled={!imageBase64}
            >
              Hide All
            </Button>
          </div>
        </div>

        {/* display uploaded image */}
        {imageBase64 && (
          <div className="w-full">
            <ImageWithGrid
              imageBase64={imageBase64}
              numRows={numRows}
              numCols={numCols}
              state={gridState}
              toggleFn={handleToggleCellState}
            />
          </div>
        )}
      </main>
    </div>
  )
}
