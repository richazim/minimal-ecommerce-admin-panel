import { storage } from "@/lib/appwrite/get_appwrite_client";
import { validateFileType } from "@/utils/file_type";
// import { ImageGravity } from "appwrite";

export const createFileViewLink = async function(fileStorageId: string, fileType: string){
    try{
        validateFileType(fileType);

        const fileUrl = storage.getFileView(
            process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
            fileStorageId
        )

        // if(fileType === "image"){
        //     fileUrl = storage.getFilePreview(
        //         process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
        //         fileStorageId,
        //         // 2000,
        //         // 2000,
        //         // ImageGravity.Top,
        //         // 100
        //     )
        // }else{
        //     fileUrl = storage.getFileView(
        //         process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
        //         fileStorageId
        //     )
        // }
        return fileUrl;
    }catch(err){
        throw err;
    }
}