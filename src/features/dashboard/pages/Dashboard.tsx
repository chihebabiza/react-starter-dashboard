import { WelcomeSection } from "@/features/dashboard/components/WelcomeSection";
import { StatCard } from "@/features/dashboard/components/StatCard";
import { RecentBooks } from "@/features/dashboard/components/RecentBooks";

export function DashboardPage() {
  return (
    <>
      <WelcomeSection />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Books"
          value="1,248"
          description="+12% from last month"
        />

        <StatCard
          title="Members"
          value="342"
          description="+8% from last month"
        />

        <StatCard title="Borrowed" value="186" description="14 due this week" />

        <StatCard
          title="Available"
          value="1,062"
          description="85% of total collection"
        />
      </div>

      <RecentBooks />
    </>
  );
}
