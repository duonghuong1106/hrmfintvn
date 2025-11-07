import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Calendar, Plus, Edit } from "lucide-react";
import { toast } from "sonner";
import { AttendanceDialog } from "@/components/attendance/AttendanceDialog";
import { mockAttendanceData, mockPayrollData, getEmployeeById } from "@/data/mockData";

// Mock data
const months = [
  { value: "2024-01", label: "Tháng 1/2024" },
  { value: "2024-02", label: "Tháng 2/2024" },
  { value: "2024-03", label: "Tháng 3/2024" },
  { value: "2024-04", label: "Tháng 4/2024" },
  { value: "2024-05", label: "Tháng 5/2024" },
  { value: "2024-06", label: "Tháng 6/2024" },
];

export default function AttendancePayroll() {
  const [selectedMonth, setSelectedMonth] = useState("2024-06");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [editingRecord, setEditingRecord] = useState<any>(null);

  const handleAddAttendance = () => {
    setDialogMode("create");
    setEditingRecord(null);
    setDialogOpen(true);
  };

  const handleEditAttendance = (employee: any, record: any) => {
    setDialogMode("edit");
    setEditingRecord({
      employeeId: employee.employeeId,
      date: record.date,
      checkIn: record.checkIn === "Nghỉ" ? "" : record.checkIn,
      checkOut: record.checkOut === "-" ? "" : record.checkOut,
      isAbsent: record.checkIn === "Nghỉ",
      overtimeHours: "",
    });
    setDialogOpen(true);
  };

  const handleSubmitAttendance = (data: any) => {
    console.log("Attendance data:", data);
    // Logic để cập nhật dữ liệu chấm công
  };

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
                <div className="flex gap-2">
                  <Button onClick={handleAddAttendance}>
                    <Plus className="h-4 w-4 mr-2" />
                    Thêm chấm công
                  </Button>
                  <Button variant="outline" onClick={() => handleExportPDF("bảng chấm công")}>
                    <Download className="h-4 w-4 mr-2" />
                    Xuất PDF
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mockAttendanceData.map((attendance) => {
                  const employee = getEmployeeById(attendance.employeeId);
                  if (!employee) return null;
                  return (
                    <div key={attendance.id} className="space-y-3">
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold text-foreground">
                              {employee.name}
                            </h3>
                            <Badge variant="outline">{attendance.employeeId}</Badge>
                            <Badge variant="secondary">{employee.department}</Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Công: {attendance.workingDays} ngày</span>
                            <span>Đi muộn: {attendance.lateDays} lần</span>
                            <span>Vắng: {attendance.absenceDays} ngày</span>
                            <span>Tăng ca: {attendance.overtimeHours}h</span>
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
                          <TableHead className="w-[80px]">Thao tác</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {attendance.records.map((record, index) => (
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
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditAttendance({ 
                                  employeeId: attendance.employeeId,
                                  employeeName: employee.name 
                                }, record)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  );
                })}
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
                  {mockPayrollData.map((payroll) => {
                    const employee = getEmployeeById(payroll.employeeId);
                    if (!employee) return null;
                    const totalAllowances = calculateTotalAllowances(payroll.allowances);
                    const totalDeductions = calculateTotalDeductions(payroll.deductions);
                    const netSalary = calculateNetSalary(payroll);

                    return (
                      <TableRow key={payroll.id}>
                        <TableCell className="font-medium">{payroll.employeeId}</TableCell>
                        <TableCell>{employee.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{employee.department}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(payroll.baseSalary)}
                        </TableCell>
                        <TableCell className="text-right text-green-600">
                          +{formatCurrency(totalAllowances)}
                        </TableCell>
                        <TableCell className="text-right text-green-600">
                          +{formatCurrency(payroll.bonus)}
                        </TableCell>
                        <TableCell className="text-right text-green-600">
                          +{formatCurrency(payroll.overtime)}
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
                {mockPayrollData.map((payroll) => {
                  const employee = getEmployeeById(payroll.employeeId);
                  if (!employee) return null;
                  return (
                    <Card key={payroll.id} className="border-muted">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">
                          {employee.name} ({payroll.employeeId})
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
                                <span>{formatCurrency(payroll.allowances.position)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Đi lại:</span>
                                <span>{formatCurrency(payroll.allowances.transport)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Ăn trưa:</span>
                                <span>{formatCurrency(payroll.allowances.meal)}</span>
                              </div>
                              <div className="flex justify-between font-medium pt-1 border-t">
                                <span>Tổng:</span>
                                <span className="text-green-600">
                                  {formatCurrency(calculateTotalAllowances(payroll.allowances))}
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
                                <span>{formatCurrency(payroll.deductions.tax)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Bảo hiểm:</span>
                                <span>{formatCurrency(payroll.deductions.insurance)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Đi muộn:</span>
                                <span>{formatCurrency(payroll.deductions.late)}</span>
                              </div>
                              <div className="flex justify-between font-medium pt-1 border-t">
                                <span>Tổng:</span>
                                <span className="text-red-600">
                                  {formatCurrency(calculateTotalDeductions(payroll.deductions))}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AttendanceDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmitAttendance}
        defaultValues={editingRecord}
        mode={dialogMode}
      />
    </div>
  );
}
