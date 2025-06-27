import db from "@/db/db"

export async function fetchProductAvailabilityCounts() {
    const [activeCount, inactiveCount] = await Promise.all([
      db.product.count({ where: { isAvailableForPurchase: true } }),
      db.product.count({ where: { isAvailableForPurchase: false } }),
    ])
  
    return { activeCount, inactiveCount }
  }
  