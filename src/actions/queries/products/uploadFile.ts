import { storage } from "@/lib/appwrite/get_appwrite_client";
import { prettyPrint } from "@/utils/prettyPrint";
import { ID } from "appwrite";

export const uploadFile = async (file: File): Promise<string> => {
    try{
        const uploadedFile = await storage.createFile(
            process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
            ID.unique(),
            file
        );
    
        return uploadedFile.$id
    }catch(error){
        prettyPrint(error)
        throw new Error("Failed to upload file");
    }
}