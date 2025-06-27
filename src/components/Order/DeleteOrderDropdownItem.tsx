"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { deleteOrder } from "../../actions/queries/orders/deleteOrder"

export function DeleteOrderDropdownItem({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  return (
    <DropdownMenuItem
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await deleteOrder(id)
          router.refresh()
        })
      }
    >
      Delete
    </DropdownMenuItem>
  )
}
