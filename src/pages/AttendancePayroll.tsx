import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Calendar } from "lucide-react";
import { toast } from "sonner";

// Mock data
const months = [
  { value: "2024-01", label: "Tháng 1/2024" },
  { value: "2024-02", label: "Tháng 2/2024" },
  { value: "2024-03", label: "Tháng 3/2024" },
  { value: "2024-04", label: "Tháng 4/2024" },
  { value: "2024-05", label: "Tháng 5/2024" },
  { value: "2024-06", label: "Tháng 6/2024" },
];

const attendanceData = [
  {
    id: "1",
    employeeId: "NV001",
    employeeName: "Nguyễn Văn An",
    department: "Kỹ thuật",
    workingDays: 22,
    lateDays: 1,
    absenceDays: 0,
    overtimeHours: 8,
    records: [
      { date: "01/06", checkIn: "08:00", checkOut: "17:30" },
      { date: "02/06", checkIn: "08:15", checkOut: "17:45" },
      { date: "03/06", checkIn: "08:05", checkOut: "17:30" },
      { date: "04/06", checkIn: "08:00", checkOut: "17:30" },
      { date: "05/06", checkIn: "08:10", checkOut: "17:30" },
    ],
  },
  {
    id: "2",
    employeeId: "NV002",
    employeeName: "Trần Thị Bình",
    department: "Kinh doanh",
    workingDays: 21,
    lateDays: 0,
    absenceDays: 1,
    overtimeHours: 4,
    records: [
      { date: "01/06", checkIn: "08:00", checkOut: "17:30" },
      { date: "02/06", checkIn: "08:00", checkOut: "17:30" },
      { date: "03/06", checkIn: "Nghỉ", checkOut: "-" },
      { date: "04/06", checkIn: "08:00", checkOut: "17:30" },
      { date: "05/06", checkIn: "08:00", checkOut: "17:30" },
    ],
  },
  {
    id: "3",
    employeeId: "NV003",
    employeeName: "Lê Văn Cường",
    department: "Marketing",
    workingDays: 22,
    lateDays: 2,
    absenceDays: 0,
    overtimeHours: 12,
    records: [
      { date: "01/06", checkIn: "08:00", checkOut: "17:30" },
      { date: "02/06", checkIn: "08:20", checkOut: "17:30" },
      { date: "03/06", checkIn: "08:00", checkOut: "17:30" },
      { date: "04/06", checkIn: "08:25", checkOut: "17:30" },
      { date: "05/06", checkIn: "08:00", checkOut: "19:00" },
    ],
  },
];

const payrollData = [
  {
    id: "1",
    employeeId: "NV001",
    employeeName: "Nguyễn Văn An",
    department: "Kỹ thuật",
    baseSalary: 15000000,
    allowances: {
      position: 2000000,
      transport: 500000,
      meal: 1000000,
    },
    deductions: {
      tax: 1800000,
      insurance: 1050000,
      late: 50000,
    },
    bonus: 1000000,
    overtime: 800000,
  },
  {
    id: "2",
    employeeId: "NV002",
    employeeName: "Trần Thị Bình",
    department: "Kinh doanh",
    baseSalary: 12000000,
    allowances: {
      position: 1500000,
      transport: 500000,
      meal: 1000000,
    },
    deductions: {
      tax: 1350000,
      insurance: 840000,
      late: 0,
    },
    bonus: 2000000,
    overtime: 400000,
  },
  {
    id: "3",
    employeeId: "NV003",
    employeeName: "Lê Văn Cường",
    department: "Marketing",
    baseSalary: 13000000,
    allowances: {
      position: 1800000,
      transport: 500000,
      meal: 1000000,
    },
    deductions: {
      tax: 1560000,
      insurance: 910000,
      late: 100000,
    },
    bonus: 1500000,
    overtime: 1200000,
  },
];

export default function AttendancePayroll() {
  const [selectedMonth, setSelectedMonth] = useState("2024-06");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const calculateTotalAllowances = (allowances: any): number => {
    return Object.values(allowances).reduce<number>((sum, val) => sum + (val as number), 0);
  };

  const calculateTotalDeductions = (deductions: any): number => {
    return Object.values(deductions).reduce<number>((sum, val) => sum + (val as number), 0);
  };

  const calculateNetSalary = (employee: any) => {
    const totalAllowances = calculateTotalAllowances(employee.allowances);
    const totalDeductions = calculateTotalDeductions(employee.deductions);
    return (
      employee.baseSalary +
      totalAllowances +
      employee.bonus +
      employee.overtime -
      totalDeductions
    );
  };

  const handleExportPDF = (type: string) => {
    toast.success(`Đang xuất ${type} ra file PDF...`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Chấm công & Lương</h1>
        <p className="text-muted-foreground mt-2">
          Quản lý chấm công và tính lương cho nhân viên
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Chọn tháng" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month.value} value={month.value}>
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="attendance" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="attendance">Bảng chấm công</TabsTrigger>
          <TabsTrigger value="payroll">Bảng lương</TabsTrigger>
        </TabsList>

        <TabsContent value="attendance" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Bảng chấm công tháng {selectedMonth}</CardTitle>
                  <CardDescription>
                    Theo dõi giờ vào/ra và tổng hợp công của nhân viên
                  </CardDescription>
                </div>
                <Button onClick={() => handleExportPDF("bảng chấm công")}>
                  <Download className="h-4 w-4 mr-2" />
                  Xuất PDF
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {attendanceData.map((employee) => (
                  <div key={employee.id} className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-foreground">
                            {employee.employeeName}
                          </h3>
                          <Badge variant="outline">{employee.employeeId}</Badge>
                          <Badge variant="secondary">{employee.department}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Công: {employee.workingDays} ngày</span>
                          <span>Đi muộn: {employee.lateDays} lần</span>
                          <span>Vắng: {employee.absenceDays} ngày</span>
                          <span>Tăng ca: {employee.overtimeHours}h</span>
                        </div>
                      </div>
                    </div>

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Ngày</TableHead>
                          <TableHead>Giờ vào</TableHead>
                          <TableHead>Giờ ra</TableHead>
                          <TableHead>Trạng thái</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {employee.records.map((record, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{record.date}</TableCell>
                            <TableCell>{record.checkIn}</TableCell>
                            <TableCell>{record.checkOut}</TableCell>
                            <TableCell>
                              {record.checkIn === "Nghỉ" ? (
                                <Badge variant="secondary">Nghỉ</Badge>
                              ) : record.checkIn > "08:15" ? (
                                <Badge variant="destructive">Muộn</Badge>
                              ) : (
                                <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                                  Đúng giờ
                                </Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payroll" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Bảng lương tháng {selectedMonth}</CardTitle>
                  <CardDescription>
                    Chi tiết lương cơ bản, phụ cấp, khấu trừ và tổng thu nhập
                  </CardDescription>
                </div>
                <Button onClick={() => handleExportPDF("bảng lương")}>
                  <Download className="h-4 w-4 mr-2" />
                  Xuất PDF
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mã NV</TableHead>
                    <TableHead>Họ tên</TableHead>
                    <TableHead>Phòng ban</TableHead>
                    <TableHead className="text-right">Lương cơ bản</TableHead>
                    <TableHead className="text-right">Phụ cấp</TableHead>
                    <TableHead className="text-right">Thưởng</TableHead>
                    <TableHead className="text-right">Tăng ca</TableHead>
                    <TableHead className="text-right">Khấu trừ</TableHead>
                    <TableHead className="text-right">Thực lãnh</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payrollData.map((employee) => {
                    const totalAllowances = calculateTotalAllowances(employee.allowances);
                    const totalDeductions = calculateTotalDeductions(employee.deductions);
                    const netSalary = calculateNetSalary(employee);

                    return (
                      <TableRow key={employee.id}>
                        <TableCell className="font-medium">{employee.employeeId}</TableCell>
                        <TableCell>{employee.employeeName}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{employee.department}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(employee.baseSalary)}
                        </TableCell>
                        <TableCell className="text-right text-green-600">
                          +{formatCurrency(totalAllowances)}
                        </TableCell>
                        <TableCell className="text-right text-green-600">
                          +{formatCurrency(employee.bonus)}
                        </TableCell>
                        <TableCell className="text-right text-green-600">
                          +{formatCurrency(employee.overtime)}
                        </TableCell>
                        <TableCell className="text-right text-red-600">
                          -{formatCurrency(totalDeductions)}
                        </TableCell>
                        <TableCell className="text-right font-semibold text-primary">
                          {formatCurrency(netSalary)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>

              <div className="mt-6 space-y-4">
                <h3 className="font-semibold text-foreground">Chi tiết phụ cấp và khấu trừ</h3>
                {payrollData.map((employee) => (
                  <Card key={employee.id} className="border-muted">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">
                        {employee.employeeName} ({employee.employeeId})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-sm text-green-600 mb-2">
                            Phụ cấp
                          </h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Chức vụ:</span>
                              <span>{formatCurrency(employee.allowances.position)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Đi lại:</span>
                              <span>{formatCurrency(employee.allowances.transport)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Ăn trưa:</span>
                              <span>{formatCurrency(employee.allowances.meal)}</span>
                            </div>
                            <div className="flex justify-between font-medium pt-1 border-t">
                              <span>Tổng:</span>
                              <span className="text-green-600">
                                {formatCurrency(calculateTotalAllowances(employee.allowances))}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm text-red-600 mb-2">
                            Khấu trừ
                          </h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Thuế TNCN:</span>
                              <span>{formatCurrency(employee.deductions.tax)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Bảo hiểm:</span>
                              <span>{formatCurrency(employee.deductions.insurance)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Đi muộn:</span>
                              <span>{formatCurrency(employee.deductions.late)}</span>
                            </div>
                            <div className="flex justify-between font-medium pt-1 border-t">
                              <span>Tổng:</span>
                              <span className="text-red-600">
                                {formatCurrency(calculateTotalDeductions(employee.deductions))}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
