'use client'

import React, { useState, useEffect } from 'react'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ImageWithGrid } from '@/components/whats-behind/image-grid'
import { ImageUploader } from '@/components/input/image-uploader'

export default function WhatsBehind() {
  const sliderMax = 15
  const sliderMin = 3
  const sliderStep = 1

  const [numRows, setNumRows] = useState(5)
  const [numCols, setNumCols] = useState(5)
  const [imageBase64, setImageBase64] = useState('')

  const [gridState, setGridState] = useState<Record<string, boolean>>({})

  const generateDefaultGameStates = () => {
    const states: Record<string, boolean> = {}
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        states[`${row}_${col}`] = true
      }
    }
    setGridState(states)
  }

  useEffect(() => {
    generateDefaultGameStates()
  }, [numRows, numCols])

  const handleToggleCellState = (row: number, col: number) => {
    setGridState((prevStates = {}) => {
      const key = `${row}_${col}`
      return {
        ...prevStates,
        [key]: !prevStates[key],
      }
    })
  }

  const handleShowAll = () => {
    const newStates: Record<string, boolean> = {}
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        newStates[`${row}_${col}`] = false
      }
    }
    setGridState(newStates)
  }

  const handleHideAll = () => {
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
        <div className="flex flex-col gap-4 items-center w-full max-w-md border p-4 rounded">
          <p>Number of Rows: {numRows}</p>
          <Slider
            defaultValue={[numRows]}
            max={sliderMax}
            min={sliderMin}
            step={sliderStep}
            onValueChange={(val) => setNumRows(val[0])}
          />
          <p>Number of Columns: {numCols}</p>
          <Slider
            defaultValue={[numCols]}
            max={sliderMax}
            min={sliderMin}
            step={sliderStep}
            onValueChange={(val) => setNumCols(val[0])}
          />
          <div className="flex flex-col gap-2 items-center w-full max-w-md">
            <ImageUploader handleUploadImage={setImageBase64} />
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
