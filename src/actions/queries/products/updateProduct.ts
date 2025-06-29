import db from "@/db/db";
import { prettyPrint } from "@/utils/prettyPrint";

export const updateProduct = async (
    id: string,
    name: string,
    description: string,
    priceInCents: number,
    filePath: string,
    imagePath: string
) => {
    try {
        const product = await db.product.update({
            where: { id },
            data: {
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
        throw new Error("Failed to update product in database");
    }
}