import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Calendar, FileSpreadsheet, Calculator, Printer, FileText, Edit } from "lucide-react";
import { toast } from "sonner";
import { AttendanceDialog } from "@/components/attendance/AttendanceDialog";
import { mockAttendancePayrollData, getEmployeeById, calculateTotalSalary } from "@/data/mockData";

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
  const [editingRecord, setEditingRecord] = useState<any>(null);

  const handleEditRecord = (record: any) => {
    const employee = getEmployeeById(record.employeeId);
    setEditingRecord({
      ...record,
      employeeName: employee?.name,
    });
    setDialogOpen(true);
  };

  const handleSubmitRecord = (data: any) => {
    console.log("Attendance payroll data:", data);
    toast.success("Đã cập nhật thông tin chấm công và lương!");
    // Logic để cập nhật dữ liệu
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const handleImportExcel = () => {
    toast.info("Chức năng nhập file Excel đang được phát triển...");
  };

  const handleCalculateSalary = () => {
    toast.success("Đã tính toán lương cho tất cả nhân viên!");
  };

  const handleExportPDF = () => {
    toast.success("Đang xuất bảng lương ra file PDF...");
  };

  const handleExportExcel = () => {
    toast.success("Đang xuất bảng lương ra file Excel...");
  };

  const handlePrint = () => {
    toast.info("Đang chuẩn bị in bảng lương...");
  };

  const handleExportReport = () => {
    toast.success("Đang xuất báo cáo quỹ lương tổng hợp...");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Chấm công & Lương</h1>
        <p className="text-muted-foreground mt-2">
          Quản lý chấm công và tính lương cho nhân viên
        </p>
      </div>

      <div className="flex items-center justify-between gap-4">
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

        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" onClick={handleImportExcel}>
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Nhập file Excel
          </Button>
          <Button variant="outline" onClick={handleCalculateSalary}>
            <Calculator className="h-4 w-4 mr-2" />
            Tính lương
          </Button>
          <Button variant="outline" onClick={handleExportPDF}>
            <Download className="h-4 w-4 mr-2" />
            Xuất PDF
          </Button>
          <Button variant="outline" onClick={handleExportExcel}>
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Xuất Excel
          </Button>
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            In bảng lương
          </Button>
          <Button variant="outline" onClick={handleExportReport}>
            <FileText className="h-4 w-4 mr-2" />
            Báo cáo tổng hợp
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bảng chấm công và lương tháng {selectedMonth}</CardTitle>
          <CardDescription>
            Nhập dữ liệu chấm công và tính lương cho từng nhân viên
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Mã NV</TableHead>
                  <TableHead>Họ tên</TableHead>
                  <TableHead className="text-center">Ngày công</TableHead>
                  <TableHead className="text-center">Ngày đi muộn</TableHead>
                  <TableHead className="text-right">Lương cơ bản</TableHead>
                  <TableHead className="text-right">Tiền thưởng</TableHead>
                  <TableHead className="text-right">Trợ cấp</TableHead>
                  <TableHead className="text-right">Thuế TNCN</TableHead>
                  <TableHead className="text-right">BHXH</TableHead>
                  <TableHead className="text-right">Tiền phạt</TableHead>
                  <TableHead className="text-right">Tổng lương</TableHead>
                  <TableHead className="w-[80px]">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAttendancePayrollData.map((record) => {
                  const employee = getEmployeeById(record.employeeId);
                  if (!employee) return null;
                  const totalSalary = calculateTotalSalary(record);

                  return (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.employeeId}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{employee.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {employee.department}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary">{record.workingDays}</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        {record.lateDays > 0 ? (
                          <Badge variant="destructive">{record.lateDays}</Badge>
                        ) : (
                          <span className="text-muted-foreground">0</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(record.baseSalary)}
                      </TableCell>
                      <TableCell className="text-right text-green-600">
                        +{formatCurrency(record.bonus)}
                      </TableCell>
                      <TableCell className="text-right text-green-600">
                        +{formatCurrency(record.allowances)}
                      </TableCell>
                      <TableCell className="text-right text-red-600">
                        -{formatCurrency(record.tax)}
                      </TableCell>
                      <TableCell className="text-right text-red-600">
                        -{formatCurrency(record.insurance)}
                      </TableCell>
                      <TableCell className="text-right text-red-600">
                        {record.fine > 0 ? `-${formatCurrency(record.fine)}` : "-"}
                      </TableCell>
                      <TableCell className="text-right font-bold text-primary">
                        {formatCurrency(totalSalary)}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditRecord(record)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Tổng nhân viên</p>
                <p className="text-2xl font-bold text-foreground">
                  {mockAttendancePayrollData.length}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tổng quỹ lương</p>
                <p className="text-2xl font-bold text-primary">
                  {formatCurrency(
                    mockAttendancePayrollData.reduce(
                      (sum, record) => sum + calculateTotalSalary(record),
                      0
                    )
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tổng thuế TNCN</p>
                <p className="text-2xl font-bold text-red-600">
                  {formatCurrency(
                    mockAttendancePayrollData.reduce((sum, record) => sum + record.tax, 0)
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tổng BHXH</p>
                <p className="text-2xl font-bold text-red-600">
                  {formatCurrency(
                    mockAttendancePayrollData.reduce(
                      (sum, record) => sum + record.insurance,
                      0
                    )
                  )}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <AttendanceDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmitRecord}
        defaultValues={editingRecord}
      />
    </div>
  );
}
