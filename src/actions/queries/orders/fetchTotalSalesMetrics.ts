import db from "@/db/db"

export async function fetchTotalSalesMetrics() {
    const data = await db.order.aggregate({
      _sum: { pricePaidInCents: true },
      _count: true,
    })
  
    return {
      amount: (data._sum.pricePaidInCents || 0) / 100,
      numberOfSales: data._count,
    }
  }