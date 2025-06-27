"use server"

import db from "@/db/db"
import { revalidatePath } from "next/cache"

export async function toggleProductAvailability(
    id: string,
    isAvailableForPurchase: boolean
  ) {
    await db.product.update({ where: { id }, data: { isAvailableForPurchase } })
  
    revalidatePath("/")
    revalidatePath("/products")
  }