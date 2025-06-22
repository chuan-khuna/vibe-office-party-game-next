import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

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
            style={{ filter: isHidden ? 'blur(16px)' : 'none' }}
          />
          {isHidden && (
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center rounded">
              <span className="text-white text-lg font-semibold">
                {idx + 1}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
