import React from 'react'

export function CustomShadCnFileInput() {
  const [fileName, setFileName] = React.useState('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
    }
  }

  return (
    <div className="relative w-fit group">
      <input
        id="picture"
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />
      <label
        htmlFor="picture"
        className="cursor-pointer bg-gray-100 border border-gray-300 rounded px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
      >
        {fileName ? 'Hover here to show file path' : 'Choose a file'}
      </label>
      {fileName && (
        <div className="absolute left-0 mt-1 w-max bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          {fileName}
        </div>
      )}
    </div>
  )
}

export function FileUploadInput({ setImageFn }: { setImageFn: (image: string) => void }) {
  return (
    <div className="flex w-full max-w-sm items-center gap-2">
      <CustomShadCnFileInput />
      <button
        type="submit"
        className="border rounded px-4 py-2"
        onClick={() => {
          const fileInput = document.querySelector<HTMLInputElement>('input[type="file"]')
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
      </button>
    </div>
  )
}

export function ImageWithGrid({ imageBase64, numRows, numCols, state, toggleFn: handleToggleCellState }: {
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
                className={`border border-white/10  ${state[`${row}_${col}`] ? 'bg-black/100' : ''}`}
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
