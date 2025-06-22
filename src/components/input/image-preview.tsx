import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { Button } from '@/components/ui/button'

export function ImagePreview({ imageBase64 }: { imageBase64: string }) {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <Button variant="outline">Preview Image</Button>
      </HoverCardTrigger>
      <HoverCardContent>
        {imageBase64 ? (
          <img
            src={imageBase64}
            alt="Uploaded"
            className="max-w-full h-auto rounded mx-auto"
          />
        ) : (
          'No image uploaded'
        )}
      </HoverCardContent>
    </HoverCard>
  )
}
