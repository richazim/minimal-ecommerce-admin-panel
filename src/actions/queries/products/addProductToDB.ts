"use server"

import { z } from "zod"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { uploadFile } from "./uploadFile"
import { createFileViewLink } from "./createFileViewLink"
import { createProduct } from "./createProduct"

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
  
  export async function addProductToDB(prevState: unknown, formData: FormData) {
    const result = addSchema.safeParse(Object.fromEntries(formData.entries()))
    
    if (result.success === false) {
      return result.error.formErrors.fieldErrors // Les erreurs retournées en tant que nouveau état error
    }
  
    const data = result.data
  
    const uploadedImageId = await uploadFile(data.image);
    const uploadedFileId = await uploadFile(data.file);

    const uploadedImagePreviewLink = await createFileViewLink(uploadedImageId, "image");
    const uploadedFileViewLink = await createFileViewLink(uploadedFileId, "file");

    createProduct(
      data.name,
      data.description,
      data.priceInCents,
      uploadedFileViewLink,
      uploadedImagePreviewLink
    )
  
    revalidatePath("/")
  
    redirect("/admin/products")
  }