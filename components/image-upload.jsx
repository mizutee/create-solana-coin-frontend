"use client"
import { Upload, X } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function ImageUpload({ value, onChange }) {
  const handleUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size must be less than 5MB")
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        onChange(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemove = () => {
    onChange("")
  }

  return (
    (<div className="space-y-4">
      <div className="flex items-center gap-4">
        <div
          className="relative aspect-square w-24 rounded-lg overflow-hidden border-2 border-solana-purple/20">
          {value ? (
            <Image
              src={value || "/placeholder.svg"}
              alt="Token image"
              fill
              className="object-cover" />
          ) : (
            <div
              className="w-full h-full bg-gradient-to-br from-solana-purple/5 to-solana-green/5 flex items-center justify-center">
              <Upload className="h-6 w-6 text-muted-foreground" />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="border-solana-purple/20"
            onClick={() => document.getElementById("image-upload")?.click()}>
            Choose Image
          </Button>
          {value && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="border-destructive/20 text-destructive hover:text-destructive"
              onClick={handleRemove}>
              <X className="h-4 w-4 mr-2" />
              Remove
            </Button>
          )}
        </div>
      </div>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="hidden" />
      <p className="text-xs text-muted-foreground">
        Recommended: 500x500px. Max size: 5MB. Supported formats: PNG, JPG, GIF
      </p>
    </div>)
  );
}

