"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useActionState, useState } from "react"
import { useFormStatus } from "react-dom"
import Image from "next/image"
import { Product } from "@/generated/prisma"
import { addProductToDB } from "../../actions/queries/products/addProductToDB"
import { formatCurrency } from "@/format"
import { updateProductFromDB } from "@/actions/queries/products/updateProductFromDB"

export function ProductForm({ product } : { product?: Product | null }) {
  const [errorState, action] = useActionState(
    product == null ? addProductToDB : updateProductFromDB.bind(null, product.id),
    {}
  )
  
  const [priceInCents, setPriceInCents] = useState<number | undefined>(
    product?.priceInCents
  )
  
  return (
    <form action={action} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          required
          defaultValue={product?.name || ""}
        />
        {errorState.name && <div className="text-destructive">{errorState.name}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="priceInCents">Price In Cents</Label>
        <Input
          type="number"
          id="priceInCents"
          name="priceInCents"
          required
          value={priceInCents?.toString() ?? ""}
          onChange={e =>
            setPriceInCents(e.target.value === "" ? undefined : Number(e.target.value))
          }
        />
        <div className="text-muted-foreground">
          {formatCurrency((priceInCents || 0) / 100)}
        </div>
        {errorState.priceInCents && (
          <div className="text-destructive">{errorState.priceInCents}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          required
          defaultValue={product?.description}
        />
        {errorState.description && (
          <div className="text-destructive">{errorState.description}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="file">File</Label>
        <Input type="file" id="file" name="file" required={product == null} />
        {product != null && (
          <div className="text-muted-foreground">{product.filePath}</div>
        )}
        {errorState.file && <div className="text-destructive">{errorState.file}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="image">Image</Label>
        <Input type="file" id="image" name="image" required={product == null} />
        {product != null && (
          <Image
            src={product.imagePath}
            height="400"
            width="400"
            alt="Product Image"
          />
        )}
        {errorState.image && <div className="text-destructive">{errorState.image}</div>}
      </div>
      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  )
}
