import db from "@/db/db"

// Avant: getUserData
// 🧠 Nouveau: fetchUserMetrics
export async function fetchUserMetrics() {
    const [userCount, orderData] = await Promise.all([
      db.user.count(),
      db.order.aggregate({
        _sum: { pricePaidInCents: true },
      }),
    ])
  
    return {
      userCount,
      averageValuePerUser:
        userCount === 0
          ? 0
          : (orderData._sum.pricePaidInCents || 0) / userCount / 100,
    }
  }