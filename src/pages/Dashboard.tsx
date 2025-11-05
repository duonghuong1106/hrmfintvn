import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Building2, DollarSign, TrendingUp, UserCheck } from "lucide-react";
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ['#3b82f6', '#ef4444', '#22c55e', '#f59e0b'];

const genderData = [
  { name: 'Nam', value: 156 },
  { name: 'Nữ', value: 124 },
  { name: 'Khác', value: 8 },
];

const departmentData = [
  { name: 'Kỹ thuật', employees: 78 },
  { name: 'Kinh doanh', employees: 45 },
  { name: 'Marketing', employees: 32 },
  { name: 'Nhân sự', employees: 15 },
  { name: 'Tài chính', employees: 28 },
  { name: 'Vận hành', employees: 42 },
];

const salaryData = [
  { month: 'T1', cost: 245000 },
  { month: 'T2', cost: 248000 },
  { month: 'T3', cost: 252000 },
  { month: 'T4', cost: 258000 },
  { month: 'T5', cost: 261000 },
  { month: 'T6', cost: 265000 },
];

const expiringContracts = [
  { id: 'C-2024-045', employee: 'Nguyễn Văn A', department: 'Kỹ thuật', endDate: '15/01/2025', daysLeft: 10 },
  { id: 'C-2024-078', employee: 'Trần Thị B', department: 'Kinh doanh', endDate: '22/01/2025', daysLeft: 17 },
  { id: 'C-2024-091', employee: 'Lê Văn C', department: 'Marketing', endDate: '28/01/2025', daysLeft: 23 },
  { id: 'C-2024-103', employee: 'Phạm Thị D', department: 'Tài chính', endDate: '05/02/2025', daysLeft: 31 },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Tổng quan</h1>
        <p className="text-muted-foreground mt-1">Chào mừng trở lại! Đây là tình hình tổ chức của bạn.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tổng nhân viên</CardTitle>
            <Users className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">288</div>
            <p className="text-xs text-muted-foreground mt-1">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +12 so với tháng trước
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Hợp đồng đang hiệu lực</CardTitle>
            <FileText className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">245</div>
            <p className="text-xs text-muted-foreground mt-1">85% tổng số nhân viên</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Phòng ban</CardTitle>
            <Building2 className="h-5 w-5 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">12</div>
            <p className="text-xs text-muted-foreground mt-1">6 văn phòng khu vực</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Lương hàng tháng</CardTitle>
            <DollarSign className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">6,2 tỷ VND</div>
            <p className="text-xs text-muted-foreground mt-1">+2,1% so với tháng trước</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Phân bổ theo giới tính</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Nhân viên theo phòng ban</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="employees" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Salary Trend and Expiring Contracts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Xu hướng chi phí lương (6 tháng)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salaryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="cost" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="Chi phí lương ($)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Hợp đồng sắp hết hạn
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {expiringContracts.map((contract) => (
                <div key={contract.id} className="border-l-2 border-orange-500 pl-3 py-2">
                  <p className="font-medium text-sm">{contract.employee}</p>
                  <p className="text-xs text-muted-foreground">{contract.department}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-muted-foreground">{contract.endDate}</p>
                    <span className="text-xs font-medium text-orange-600">{contract.daysLeft} ngày</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
