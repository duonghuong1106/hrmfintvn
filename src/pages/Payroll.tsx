import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2, Printer } from "lucide-react";
import { PayrollDialog } from "@/components/payroll/PayrollDialog";
import { useToast } from "@/hooks/use-toast";

interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  position: string;
  baseSalary: number;
  bonus: number;
  allowance: number;
  tax: number;
  socialInsurance: number;
  fine: number;
  totalSalary: number;
  month: string;
}

const mockPayrollData: PayrollRecord[] = [
  {
    id: "1",
    employeeId: "NV001",
    employeeName: "Nguyễn Văn An",
    department: "Trung tâm sản xuất phần mềm",
    position: "Developer",
    baseSalary: 15000000,
    bonus: 2000000,
    allowance: 1000000,
    tax: 1500000,
    socialInsurance: 1200000,
    fine: 0,
    totalSalary: 15300000,
    month: "2025-01",
  },
  {
    id: "2",
    employeeId: "NV002",
    employeeName: "Trần Thị Bình",
    department: "Phòng kinh doanh",
    position: "Business",
    baseSalary: 18000000,
    bonus: 3000000,
    allowance: 1500000,
    tax: 2000000,
    socialInsurance: 1500000,
    fine: 500000,
    totalSalary: 18500000,
    month: "2025-01",
  },
  {
    id: "3",
    employeeId: "NV003",
    employeeName: "Phạm Minh Châu",
    department: "Phòng giải pháp",
    position: "Analyst",
    baseSalary: 16000000,
    bonus: 1500000,
    allowance: 1200000,
    tax: 1800000,
    socialInsurance: 1300000,
    fine: 200000,
    totalSalary: 15400000,
    month: "2025-01",
  },
];

const Payroll = () => {
  const [payrollData, setPayrollData] = useState<PayrollRecord[]>(mockPayrollData);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<PayrollRecord | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [monthFilter, setMonthFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const { toast } = useToast();

  const filteredData = payrollData.filter((record) => {
    const matchesSearch =
      record.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMonth = monthFilter === "all" || record.month === monthFilter;
    const matchesDepartment = departmentFilter === "all" || record.department === departmentFilter;
    return matchesSearch && matchesMonth && matchesDepartment;
  });

  const handleAddRecord = () => {
    setEditingRecord(null);
    setDialogOpen(true);
  };

  const handleEditRecord = (record: PayrollRecord) => {
    setEditingRecord(record);
    setDialogOpen(true);
  };

  const handleDeleteRecord = (id: string) => {
    setPayrollData(payrollData.filter((record) => record.id !== id));
    toast({
      title: "Đã xóa",
      description: "Bản ghi lương đã được xóa thành công.",
    });
  };

  const handleSubmitRecord = (data: any) => {
    const totalSalary =
      data.baseSalary +
      data.bonus +
      data.allowance -
      data.tax -
      data.socialInsurance -
      data.fine;

    if (editingRecord) {
      setPayrollData(
        payrollData.map((record) =>
          record.id === editingRecord.id
            ? { ...record, ...data, totalSalary }
            : record
        )
      );
      toast({
        title: "Cập nhật thành công",
        description: "Thông tin lương đã được cập nhật.",
      });
    } else {
      const newRecord = {
        ...data,
        id: Math.random().toString(),
        totalSalary,
      };
      setPayrollData([...payrollData, newRecord]);
      toast({
        title: "Thêm thành công",
        description: "Bản ghi lương mới đã được thêm.",
      });
    }
    setDialogOpen(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  /**
   * Handles printing the payroll table
   * Creates a new window with formatted table content and triggers print dialog
   */
  const handlePrintTable = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      toast({
        title: "Lỗi",
        description: "Không thể mở cửa sổ in. Vui lòng kiểm tra cài đặt trình duyệt.",
        variant: "destructive",
      });
      return;
    }

    const tableContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Bảng lương</title>
          <style>
            @media print {
              @page {
                margin: 1cm;
                size: landscape;
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
              margin-bottom: 30px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
              font-size: 12px;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 6px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
              font-weight: bold;
            }
            tr:nth-child(even) {
              background-color: #f9f9f9;
            }
            .text-green {
              color: #16a34a;
            }
            .text-red {
              color: #dc2626;
            }
            .text-blue {
              color: #2563eb;
              font-weight: bold;
            }
            .text-right {
              text-align: right;
            }
            .print-date {
              text-align: right;
              margin-bottom: 20px;
              color: #666;
            }
          </style>
        </head>
        <body>
          <div class="print-date">Ngày in: ${new Date().toLocaleDateString("vi-VN")}</div>
          <h1>Bảng lương</h1>
          <div class="subtitle">Quản lý thông tin lương của nhân viên</div>
          <table>
            <thead>
              <tr>
                <th>Mã NV</th>
                <th>Tên nhân viên</th>
                <th>Phòng ban</th>
                <th>Chức vụ</th>
                <th>Lương cơ bản</th>
                <th>Tiền thưởng</th>
                <th>Trợ cấp</th>
                <th>Thuế TNCN</th>
                <th>BHXH</th>
                <th>Tiền phạt</th>
                <th>Lương thực nhận</th>
              </tr>
            </thead>
            <tbody>
              ${filteredData
                .map(
                  (record) => `
                <tr>
                  <td>${record.employeeId}</td>
                  <td>${record.employeeName}</td>
                  <td>${record.department}</td>
                  <td>${record.position}</td>
                  <td>${formatCurrency(record.baseSalary)}</td>
                  <td class="text-green">${formatCurrency(record.bonus)}</td>
                  <td class="text-green">${formatCurrency(record.allowance)}</td>
                  <td class="text-red">${formatCurrency(record.tax)}</td>
                  <td class="text-red">${formatCurrency(record.socialInsurance)}</td>
                  <td class="text-red">${formatCurrency(record.fine)}</td>
                  <td class="text-blue">${formatCurrency(record.totalSalary)}</td>
                </tr>
              `
                )
                .join("")}
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quản lý lương</h1>
          <p className="text-muted-foreground mt-1">
            Quản lý thông tin lương của nhân viên
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePrintTable}>
            <Printer className="h-4 w-4 mr-2" />
            In bảng lương
          </Button>
          <Button onClick={handleAddRecord}>
            <Plus className="h-4 w-4 mr-2" />
            Thêm bảng lương
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Input
                placeholder="Tìm theo mã NV, tên, phòng ban..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={monthFilter}
              onChange={(e) => setMonthFilter(e.target.value)}
            >
              <option value="all">Tất cả tháng</option>
              <option value="2025-01">Tháng 1/2025</option>
              <option value="2024-12">Tháng 12/2024</option>
              <option value="2024-11">Tháng 11/2024</option>
            </select>
            <select
              className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
            >
              <option value="all">Tất cả phòng ban</option>
              <option value="Trung tâm sản xuất phần mềm">Trung tâm sản xuất phần mềm</option>
              <option value="Phòng kinh doanh">Phòng kinh doanh</option>
              <option value="Phòng giải pháp">Phòng giải pháp</option>
              <option value="Phòng Tài chính - kế toán">Phòng Tài chính - kế toán</option>
              <option value="Phòng Hành chính nhân sự">Phòng Hành chính nhân sự</option>
            </select>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách bảng lương</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã NV</TableHead>
                <TableHead>Tên nhân viên</TableHead>
                <TableHead>Phòng ban</TableHead>
                <TableHead>Chức vụ</TableHead>
                <TableHead>Lương cơ bản</TableHead>
                <TableHead>Tiền thưởng</TableHead>
                <TableHead>Trợ cấp</TableHead>
                <TableHead>Thuế TNCN</TableHead>
                <TableHead>BHXH</TableHead>
                <TableHead>Tiền phạt</TableHead>
                <TableHead>Lương thực nhận</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.employeeId}</TableCell>
                  <TableCell>{record.employeeName}</TableCell>
                  <TableCell>{record.department}</TableCell>
                  <TableCell>{record.position}</TableCell>
                  <TableCell>{formatCurrency(record.baseSalary)}</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">{formatCurrency(record.bonus)}</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">{formatCurrency(record.allowance)}</TableCell>
                  <TableCell className="text-red-600 dark:text-red-400">{formatCurrency(record.tax)}</TableCell>
                  <TableCell className="text-red-600 dark:text-red-400">{formatCurrency(record.socialInsurance)}</TableCell>
                  <TableCell className="text-red-600 dark:text-red-400">{formatCurrency(record.fine)}</TableCell>
                  <TableCell className="font-semibold text-blue-600 dark:text-blue-400">
                    {formatCurrency(record.totalSalary)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditRecord(record)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteRecord(record.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <PayrollDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmitRecord}
        defaultValues={editingRecord}
      />
    </div>
  );
};

export default Payroll;
