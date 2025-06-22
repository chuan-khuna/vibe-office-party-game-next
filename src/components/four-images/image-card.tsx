import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Button } from '@/components/ui/button'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import Image from 'next/image'

export const ImageCard = ({
  base64,
  isHidden,
  idx,
  onToggleVisibility,
}: {
  base64: string
  isHidden: boolean
  idx: number
  onToggleVisibility: (idx: number) => void
}) => {
  return (
    <Card key={idx}>
      <CardContent>
        <div
          className="relative cursor-pointer"
          onClick={() => onToggleVisibility(idx)}
        >
          <img
            src={base64}
            alt={`Uploaded ${idx + 1}`}
            className="max-w-full h-auto rounded mx-auto"
            // style={{ filter: isHidden ? 'blur(16px)' : 'none' }}
          />
          {isHidden && (
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center rounded">
              <span className="text-white text-lg font-semibold select-none">
                {idx + 1}
              </span>
            </div>
          )}
        </div>
      </CardContent>

      {/* <div className="flex justify-center">
        <Button variant="outline">View Full Image</Button>
      </div> */}

      {/* if image isn't hidden show button to view full image size*/}
      {!isHidden && (
        <CardFooter>
          <Dialog modal>
            <DialogTrigger asChild>
              <div className="flex justify-center">
                <Button variant="outline">View Full Image</Button>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-[1200px] w-full max-h-[90vh] overflow-auto">
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  <img
                    src={base64}
                    alt={`Uploaded ${idx + 1}`}
                    className="max-w-full h-auto rounded mx-auto"
                  />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </CardFooter>
      )}
    </Card>
  )
}
