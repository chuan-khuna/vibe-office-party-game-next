import React, { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export function ImageUploader() {
  return (
    <div className="flex gap-4 w-lg">
      <div
        className="flex-1 border border-dashed border-gray-400 rounded p-4 flex flex-col items-center justify-center text-center min-h-[120px] hover:bg-gray-50 transition"
        tabIndex={0}
        style={{ outline: 'none' }}
        onPaste={(e) => {
          // handle paste event here if needed
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
              // handle file selection here if needed
            }}
          />
        </Label>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <Button
          type="button"
          className="w-full"
          onClick={() => {
            // handle upload to useState here
          }}
        >
          Upload
        </Button>
      </div>
    </div>
  )
}

// export const ImageInputBackUp: React.FC<{
//   onImageSelect: (base64: string) => void
//   onPaste: (event: React.ClipboardEvent<HTMLInputElement>) => void
//   imageBase64: string
// }> = ({ onImageSelect, onPaste, imageBase64 }) => {
//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0]
//     if (file) {
//       const reader = new FileReader()
//       reader.onloadend = () => {
//         onImageSelect(reader.result as string)
//       }
//       reader.readAsDataURL(file)
//     }
//   }

//   return (
//     <Label
//       htmlFor="image-upload"
//       className="cursor-pointer border border-dashed border-gray-400 rounded p-8 w-full text-center hover:bg-gray-50 transition"
//       tabIndex={0}
//       onPaste={onPaste}
//       style={{ outline: 'none' }}
//     >
//       <div className="mb-2">Click to select a file or paste an image here</div>
//       <Button
//         type="button"
//         onClick={() => {
//           const input = document.getElementById(
//             'image-upload'
//           ) as HTMLInputElement
//           input?.click()
//         }}
//       >
//         Select File
//       </Button>
//       <Input
//         id="image-upload"
//         type="file"
//         accept="image/*"
//         onChange={handleChange}
//         className="hidden"
//         tabIndex={-1}
//       />
//     </Label>
//   )
// }
