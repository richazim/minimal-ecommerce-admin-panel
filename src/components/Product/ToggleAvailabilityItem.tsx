"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { toggleProductAvailability } from "../../actions/queries/products/toggleProductAvailability"

export function ToggleProductAvailabilityItem({
  id,
  isAvailableForPurchase,
}: {
  id: string
  isAvailableForPurchase: boolean
}) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  return (
    <DropdownMenuItem
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await toggleProductAvailability(id, !isAvailableForPurchase)
          router.refresh()
        })
      }}
    >
      {isAvailableForPurchase ? "Deactivate" : "Activate"}
    </DropdownMenuItem>
  )
}
