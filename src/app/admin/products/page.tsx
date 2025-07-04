import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PageHeader } from "@/components/PageHeader"
import { ProductsTable } from "@/components/Table/ProductsTable"

export default function AdminProductsPage() {
  return (
    <>
      <div className="flex justify-between items-center gap-4">
        <PageHeader>Products</PageHeader>
        <Button asChild>
          <Link href="/admin/products/new">Add Product</Link>
        </Button>
      </div>
      <ProductsTable />
    </>
  )
}

