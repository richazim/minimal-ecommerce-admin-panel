"use server"

import db from "@/db/db"
import fs from "fs/promises"
import { notFound } from "next/navigation"
import { revalidatePath } from "next/cache"
import { extractFilenameFromPath } from "@/utils/filename"


export async function deleteProduct(id: string) {
    const product = await db.product.delete({ where: { id } })
  
    if (product == null) return notFound()

    const fullFilePath = `src/uploads/${extractFilenameFromPath(product.filePath)}`
    const fullImageFilePath = `src/uploads/${extractFilenameFromPath(product.imagePath)}`

    await fs.unlink(fullFilePath)
    await fs.unlink(fullImageFilePath)
  
    revalidatePath("/")
    revalidatePath("/products")
  }