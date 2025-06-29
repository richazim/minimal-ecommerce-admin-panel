"use server"

import { z } from "zod"
import { notFound, redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { getProductById } from './getProductById';
import { uploadFile } from "./uploadFile"
import { createFileViewLink } from "./createFileViewLink"
import { updateProduct } from "./updateProduct"

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

export async function updateProductFromDB(
    id: string,
    prevState: unknown,
    formData: FormData
  ) {
    const result = editSchema.safeParse(Object.fromEntries(formData.entries()))
    if (result.success === false) {
      return result.error.formErrors.fieldErrors
    }
  
    const data = result.data

    const product = await getProductById(id);
  
    if (product == null) return notFound()
  
    const oldFilePath = product.filePath;
    let newUploadedFileViewLink;

    if (data.file != null && data.file.size > 0) {
      const newFilePathId = await uploadFile(data.file);
      newUploadedFileViewLink = await createFileViewLink(newFilePathId, "file");
    }
  
    const oldImagePath = product.imagePath;
    let newUploadedImageViewLink;

    if (data.image != null && data.image.size > 0) {
      const newImagePathId = await uploadFile(data.image);
      newUploadedImageViewLink = await createFileViewLink(newImagePathId, "image");
    }
  
    await updateProduct(
      id,
      data.name,
      data.description,
      data.priceInCents,
      newUploadedFileViewLink || oldFilePath,
      newUploadedImageViewLink || oldImagePath
    )
  
    revalidatePath("/")
    revalidatePath("/products")
  
    redirect("/admin/products")
  }