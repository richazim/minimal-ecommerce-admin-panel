import db from "@/db/db"
import { prettyPrint } from "@/utils/prettyPrint";

export const getProductById = async (id: string) => {
    try{
        return await db.product.findUnique({
            where: { id },
        })
    }catch(error){
        prettyPrint(error)
        throw new Error("Trying to get a product with id: " + id + " from database but failed");
    }
}