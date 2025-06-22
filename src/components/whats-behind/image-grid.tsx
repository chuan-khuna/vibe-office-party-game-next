import React from 'react'

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
    <div className="relative w-full max-w-[1000px] mx-auto">
      <img
        src={imageBase64}
        className="absolute w-full h-auto"
        alt="Hidden reference image"
        onLoad={(e) => {
          const img = e.target as HTMLImageElement
          const container = img.parentElement
          if (container) {
            container.style.aspectRatio = `${img.naturalWidth} / ${img.naturalHeight}`
          }
        }}
      />
      <div
        className="w-full h-0 rounded bg-cover bg-center"
        style={{ backgroundImage: `url(${imageBase64})` }}
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
                className={`border border-white/10  ${
                  state[`${row}_${col}`] ? 'bg-black/100' : ''
                }`}
                onClick={() => handleToggleCellState(row, col)}
              >
                {state[`${row}_${col}`] && (
                  <span className="text-white text-m font-mono flex justify-center items-center h-full select-none">
                    {row + 1},{col + 1}
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
