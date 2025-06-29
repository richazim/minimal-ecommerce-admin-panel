import db from "@/db/db";
import { prettyPrint } from "@/utils/prettyPrint";

export const createProduct = async (
  name: string,
  description: string,
  priceInCents: number,
  filePath: string,
  imagePath: string
) => {

  try {
    const product = await db.product.create({
      data: {
        isAvailableForPurchase: false,
        name: name,
        description: description,
        priceInCents: priceInCents,
        filePath: filePath,
        imagePath: imagePath,
      },
    });
    return product;
  } catch (error) {
    prettyPrint(error);
    throw new Error("Failed to create product in database");
  }
  
};
