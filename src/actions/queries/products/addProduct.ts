"use server"

import db from "@/db/db"
import { z } from "zod"
import fs from "fs/promises"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

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
  
  export async function addProduct(prevState: unknown, formData: FormData) {
    const result = addSchema.safeParse(Object.fromEntries(formData.entries()))
    
    if (result.success === false) {
      return result.error.formErrors.fieldErrors
    }
  
    const data = result.data
  
    // await fs.mkdir("products", { recursive: true })
    const filename = `${crypto.randomUUID()}-${data.file.name}`;
    const filePath = `src/uploads/${filename}`;
    const filePathEndpoint = `/api/uploads/${filename}`;
    await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()))
  
    // await fs.mkdir("public/products", { recursive: true })
    const imageName = `${crypto.randomUUID()}-${data.image.name}`;
    const imagePath = `src/uploads/${imageName}`
    const imagePathEndpoint = `/api/uploads/${imageName}`
    await fs.writeFile(
      `${imagePath}`,
      Buffer.from(await data.image.arrayBuffer())
    )
  
    const product = await db.product.create({
      data: {
        isAvailableForPurchase: false,
        name: data.name,
        description: data.description,
        priceInCents: data.priceInCents,
        filePath: filePathEndpoint,
        imagePath: imagePathEndpoint,
      },
    })

    console.log(product)
  
    revalidatePath("/")
    revalidatePath("/products")
  
    redirect("/admin/products")
  }