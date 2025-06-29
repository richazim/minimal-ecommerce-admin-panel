import db from "@/db/db"
import { notFound } from "next/navigation"
import { NextRequest, NextResponse } from "next/server"
import fs from "fs/promises"
import { extractFilenameFromPath } from "@/utils/filename"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
    const id = (await params).id
    const product = await db.product.findUnique({
        where: { id },
        select: { filePath: true, name: true },
    })

    if (product == null) return notFound()

    const realFileName = extractFilenameFromPath(product.filePath);
    const realFilePath = `src/uploads/${realFileName}`;

    const { size } = await fs.stat(realFilePath)
    const file = await fs.readFile(realFilePath)
    const extension = realFileName.split(".").pop()

    return new NextResponse(file, {
        headers: {
        "Content-Disposition": `attachment; filename="${product.name}.${extension}"`,
        "Content-Length": size.toString(),
        },
    })
}
