import React from "react";
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, LineChart, Line, AreaChart, Area, Tooltip, Legend, ResponsiveContainer } from "recharts";

const dummyData = {
  categories: [
    { name: "Electronics", value: 30 },
    { name: "Clothing", value: 20 },
    { name: "Home & Kitchen", value: 25 },
    { name: "Books", value: 15 },
    { name: "Other", value: 10 },
  ],
  brands: [
    { name: "Brand A", count: 50 },
    { name: "Brand B", count: 30 },
    { name: "Brand C", count: 40 },
    { name: "Brand D", count: 20 },
  ],  
  users: [
    { month: "Jan", count: 100 },
    { month: "Feb", count: 120 },
    { month: "Mar", count: 150 },
    { month: "Apr", count: 180 },
    { month: "May", count: 220 },
  ],
  orders: [
    { month: "Jan", count: 200 },
    { month: "Feb", count: 250 },
    { month: "Mar", count: 300 },
    { month: "Apr", count: 350 },
    { month: "May", count: 400 },
  ],
  totals: {
    categories: 5,
    brands: 4,
    users: 500,
    orders: 1200,
  },
};

const AdminDashboard = () => {
  return (
    <div className="p-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {/* Stats Cards */}
      {Object.entries(dummyData.totals).map(([key, value]) => (
        <div key={key} className="bg-white shadow-md p-4 rounded-lg text-center">
          <h3 className="text-lg font-semibold capitalize">{key}</h3>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      ))}

      {/* Charts */}
      <div className="col-span-2 bg-white shadow-md p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Category Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={dummyData.categories} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="col-span-2 bg-white shadow-md p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Brand Statistics</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dummyData.brands}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="col-span-2 bg-white shadow-md p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">User Growth</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dummyData.users}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="col-span-2 bg-white shadow-md p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Order Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={dummyData.orders}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="count" stroke="#82ca9d" fill="#82ca9d" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;
