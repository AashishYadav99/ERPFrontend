// import React, { useEffect, useState } from "react";
// import StatsCard from "../../components/StatsCard";
// import Chart from "./Chart"; // Create a new Chart component

// const Dashboard = () => {
//   const [stats, setStats] = useState([]);

//   // Static data for demonstration
//   const staticStats = [
//     {
//       id: 1,
//       icon: "📦",
//       title: "Orders",
//       value: "31",
//       subtitle: "+55% than last week",
//       data: [10, 20, 30, 40, 50, 60, 70],
//     },
//     {
//       id: 2,
//       icon: "📊",
//       title: "Invoices",
//       value: "42",
//       subtitle: "+3% than last month",
//       data: [15, 25, 35, 45, 55, 65, 75],
//     },
//     {
//       id: 3,
//       icon: "🏪",
//       title: "Customers",
//       value: "34k",
//       subtitle: "+1% than yesterday",
//       data: [5, 15, 25, 35, 45, 55, 65],
//     },
//     {
//       id: 4,
//       icon: "➕",
//       title: "Items",
//       value: "2",
//       subtitle: "Just updated",
//       data: [20, 30, 40, 50, 60, 70, 80],
//     },
//   ];

//   useEffect(() => {
//     setStats(staticStats);
//   }, []);

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//       {stats.map((stat) => (
//         <StatsCard
//           key={stat.id}
//           icon={stat.icon}
//           title={stat.title}
//           value={stat.value}
//           subtitle={stat.subtitle}
//           chart={<Chart data={stat.data} />}
//         />
//       ))}
//     </div>
//   );
// };

// export default Dashboard;
