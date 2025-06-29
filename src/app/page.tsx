import { formatCurrency } from "@/format"
import { fetchTotalSalesMetrics } from "../actions/queries/orders/fetchTotalSalesMetrics"
import { fetchProductAvailabilityCounts } from "../actions/queries/products/fetchProductAvailabilityCounts"
import { fetchUserMetrics } from "../actions/queries/users/fetchUserMetrics"
import { formatNumber } from "../utils/format"
import { DashboardCard } from "@/components/Card/DashboardCard"


export default async function HomePage() {
  const [salesData, userData, productData] = await Promise.all([
    fetchTotalSalesMetrics(),
    fetchUserMetrics(),
    fetchProductAvailabilityCounts(),
  ])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <DashboardCard
        title="Sales"
        subtitle={`${formatNumber(salesData.numberOfSales)} Orders`}
        body={formatCurrency(salesData.amount)}
      />
      <DashboardCard
        title="Customers"
        subtitle={`${formatCurrency(
          userData.averageValuePerUser
        )} Average Value`}
        body={formatNumber(userData.userCount)}
      />
      <DashboardCard
        title="Active Products"
        subtitle={`${formatNumber(productData.inactiveCount)} Inactive`}
        body={formatNumber(productData.activeCount)}
      />
    </div>
  )
}
