import { fileTypesConfig } from "@/config/fileTypesConfig"

export const validateFileType = (fileType: string) => {
    const isValid = fileTypesConfig.allowed.includes(fileType)

    if(!isValid) {
        throw new Error("Invalid file type")
    }
}