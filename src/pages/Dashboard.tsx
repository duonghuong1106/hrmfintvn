import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, FileText, Building2, DollarSign, TrendingUp, Printer } from "lucide-react";
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
  { name: 'Giải pháp', employees: 42 },
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
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  /**
   * Handles printing the dashboard report
   * Creates a new window with formatted report content and triggers print dialog
   */
  const handlePrintReport = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("Không thể mở cửa sổ in. Vui lòng kiểm tra cài đặt trình duyệt.");
      return;
    }

    const dateRange = fromDate && toDate 
      ? `Từ ${new Date(fromDate).toLocaleDateString("vi-VN")} đến ${new Date(toDate).toLocaleDateString("vi-VN")}`
      : "Tất cả thời gian";

    const tableContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Báo cáo tổng quan</title>
          <style>
            @media print {
              @page {
                margin: 1cm;
              }
            }
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
            }
            h1 {
              text-align: center;
              margin-bottom: 10px;
            }
            .subtitle {
              text-align: center;
              color: #666;
              margin-bottom: 10px;
            }
            .date-range {
              text-align: center;
              color: #666;
              margin-bottom: 30px;
              font-size: 14px;
            }
            .stats-grid {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              gap: 15px;
              margin-bottom: 30px;
            }
            .stat-card {
              border: 1px solid #ddd;
              border-left: 4px solid #3b82f6;
              padding: 15px;
              border-radius: 4px;
            }
            .stat-title {
              font-size: 12px;
              color: #666;
              margin-bottom: 8px;
            }
            .stat-value {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 5px;
            }
            .stat-change {
              font-size: 11px;
              color: #666;
            }
            .print-date {
              text-align: right;
              margin-bottom: 20px;
              color: #666;
              font-size: 12px;
            }
            .section-title {
              font-size: 18px;
              font-weight: bold;
              margin-top: 30px;
              margin-bottom: 15px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 10px;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="print-date">Ngày in: ${new Date().toLocaleDateString("vi-VN")}</div>
          <h1>Báo cáo tổng quan</h1>
          <div class="subtitle">Chào mừng trở lại! Đây là tình hình tổ chức của bạn.</div>
          <div class="date-range">${dateRange}</div>
          
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-title">Tổng nhân viên</div>
              <div class="stat-value">138</div>
              <div class="stat-change">+12 so với tháng trước</div>
            </div>
            <div class="stat-card">
              <div class="stat-title">Hợp đồng đang hiệu lực</div>
              <div class="stat-value">118</div>
              <div class="stat-change">85% tổng số nhân viên</div>
            </div>
            <div class="stat-card">
              <div class="stat-title">Phòng ban</div>
              <div class="stat-value">5</div>
              <div class="stat-change">6 văn phòng khu vực</div>
            </div>
            <div class="stat-card">
              <div class="stat-title">Lương hàng tháng</div>
              <div class="stat-value">6,2 tỷ VND</div>
              <div class="stat-change">+2,1% so với tháng trước</div>
            </div>
          </div>

          <div class="section-title">Phân bổ theo giới tính</div>
          <table>
            <thead>
              <tr>
                <th>Giới tính</th>
                <th>Số lượng</th>
                <th>Tỷ lệ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Nam</td>
                <td>156</td>
                <td>54%</td>
              </tr>
              <tr>
                <td>Nữ</td>
                <td>124</td>
                <td>43%</td>
              </tr>
              <tr>
                <td>Khác</td>
                <td>8</td>
                <td>3%</td>
              </tr>
            </tbody>
          </table>

          <div class="section-title">Nhân viên theo phòng ban</div>
          <table>
            <thead>
              <tr>
                <th>Phòng ban</th>
                <th>Số nhân viên</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Kỹ thuật</td><td>78</td></tr>
              <tr><td>Kinh doanh</td><td>45</td></tr>
              <tr><td>Marketing</td><td>32</td></tr>
              <tr><td>Nhân sự</td><td>15</td></tr>
              <tr><td>Tài chính</td><td>28</td></tr>
              <tr><td>Giải pháp</td><td>42</td></tr>
            </tbody>
          </table>

          <div class="section-title">Hợp đồng sắp hết hạn</div>
          <table>
            <thead>
              <tr>
                <th>Nhân viên</th>
                <th>Phòng ban</th>
                <th>Ngày hết hạn</th>
                <th>Còn lại</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Nguyễn Văn A</td>
                <td>Kỹ thuật</td>
                <td>15/01/2025</td>
                <td>10 ngày</td>
              </tr>
              <tr>
                <td>Trần Thị B</td>
                <td>Kinh doanh</td>
                <td>22/01/2025</td>
                <td>17 ngày</td>
              </tr>
              <tr>
                <td>Lê Văn C</td>
                <td>Marketing</td>
                <td>28/01/2025</td>
                <td>23 ngày</td>
              </tr>
              <tr>
                <td>Phạm Thị D</td>
                <td>Tài chính</td>
                <td>05/02/2025</td>
                <td>31 ngày</td>
              </tr>
            </tbody>
          </table>
        </body>
      </html>
    `;

    printWindow.document.write(tableContent);
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.print();
    };
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tổng quan</h1>
          <p className="text-muted-foreground mt-1">Chào mừng trở lại! Đây là tình hình tổ chức của bạn.</p>
        </div>
        <Button variant="outline" onClick={handlePrintReport}>
          <Printer className="h-4 w-4 mr-2" />
          In báo cáo
        </Button>
      </div>

      {/* Date Range Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <Label htmlFor="fromDate">Từ ngày</Label>
              <Input
                id="fromDate"
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="toDate">Đến ngày</Label>
              <Input
                id="toDate"
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="mt-1"
                min={fromDate}
              />
            </div>
          </div>
        </CardContent>
      </Card>

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
