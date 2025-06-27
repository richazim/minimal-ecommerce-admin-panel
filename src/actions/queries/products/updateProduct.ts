"use server"

import db from "@/db/db"
import { z } from "zod"
import fs from "fs/promises"
import { notFound, redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { extractFilenameFromPath } from "@/lib/utils/filename"

const fileSchema = z.instanceof(File, { message: "Required" })
const imageSchema = fileSchema.refine(
  file => file.size === 0 || file.type.startsWith("image/")
)

const addSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  priceInCents: z.coerce.number().int().min(1),
  file: fileSchema.refine(file => file.size > 0, "Required"),
  image: imageSchema.refine(file => file.size > 0, "Required"),
})
const editSchema = addSchema.extend({
    file: fileSchema.optional(),
    image: imageSchema.optional(),
  })

export async function updateProduct(
    id: string,
    prevState: unknown,
    formData: FormData
  ) {
    const result = editSchema.safeParse(Object.fromEntries(formData.entries()))
    if (result.success === false) {
      return result.error.formErrors.fieldErrors
    }
  
    const data = result.data
    const product = await db.product.findUnique({ where: { id } })
  
    if (product == null) return notFound()
  
    let filePathEndpoint = product.filePath
    if (data.file != null && data.file.size > 0) {
      // const realFilePath = extractFilenameFromPath(product.filePath)
      // await fs.unlink(realFilePath)
      const fullFilePath = `src/uploads/${extractFilenameFromPath(product.filePath)}`
      await fs.unlink(fullFilePath)

      const filename = `${crypto.randomUUID()}-${data.file.name}`;
      // filePath = `products/${crypto.randomUUID()}-${data.file.name}`
      // await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()))
      filePathEndpoint = `/api/uploads/${filename}`;
      const filePath = `src/uploads/${filename}`
      await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()))
    }
  
    let imagePathEndpoint = product.imagePath
    if (data.image != null && data.image.size > 0) {
      const fullImagePath = `src/uploads/${extractFilenameFromPath(product.imagePath)}`
      await fs.unlink(fullImagePath)

      const imageName = `${crypto.randomUUID()}-${data.image.name}`;
      imagePathEndpoint = `/api/uploads/${imageName}`;
      const imagePath = `src/uploads/${imageName}`
      await fs.writeFile(
        imagePath,
        Buffer.from(await data.image.arrayBuffer())
      )
    }
  
    await db.product.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        priceInCents: data.priceInCents,
        filePath: filePathEndpoint,
        imagePath: imagePathEndpoint,
      },
    })
  
    revalidatePath("/")
    revalidatePath("/products")
  
    redirect("/admin/products")
  }