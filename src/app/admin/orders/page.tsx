import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import db from "@/db/db";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { formatCurrency } from "@/format";
import { DeleteOrderDropdownItem } from "@/components/Order/DeleteOrderDropdownItem";

function getOrders() {
  return db.order.findMany({
    select: {
      id: true,
      pricePaidInCents: true,
      product: { select: { name: true } },
      user: { select: { email: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export default async function OrdersPage() {
  const orders = await getOrders();

  return (
    <>
      <PageHeader>Sales</PageHeader>
      {orders.length === 0 ? (
        <p>No sales found</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Price Paid</TableHead>
              <TableHead className="w-0">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.product.name}</TableCell>
                <TableCell>{order.user.email}</TableCell>
                <TableCell>
                  {formatCurrency(order.pricePaidInCents / 100)}
                </TableCell>
                <TableCell className="text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreVertical />
                      <span className="sr-only">Actions</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DeleteOrderDropdownItem id={order.id} />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}
