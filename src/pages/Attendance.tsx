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
import { AttendanceDialog } from "@/components/attendance/AttendanceDialog";
import { useToast } from "@/hooks/use-toast";

interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  position: string;
  workingDays: number;
  paidLeaveDays: number;
  unpaidLeaveDays: number;
  lateDays: number;
  overtimeHours: number;
  month: string;
}

const mockAttendanceData: AttendanceRecord[] = [
  {
    id: "1",
    employeeId: "NV001",
    employeeName: "Nguyễn Văn An",
    department: "Trung tâm sản xuất phần mềm",
    position: "Developer",
    workingDays: 22,
    paidLeaveDays: 1,
    unpaidLeaveDays: 0,
    lateDays: 2,
    overtimeHours: 10,
    month: "2025-01",
  },
  {
    id: "2",
    employeeId: "NV002",
    employeeName: "Trần Thị Bình",
    department: "Phòng kinh doanh",
    position: "Business",
    workingDays: 23,
    paidLeaveDays: 0,
    unpaidLeaveDays: 1,
    lateDays: 0,
    overtimeHours: 15,
    month: "2025-01",
  },
  {
    id: "3",
    employeeId: "NV003",
    employeeName: "Phạm Minh Châu",
    department: "Phòng giải pháp",
    position: "Analyst",
    workingDays: 20,
    paidLeaveDays: 2,
    unpaidLeaveDays: 0,
    lateDays: 1,
    overtimeHours: 8,
    month: "2025-01",
  },
];

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>(mockAttendanceData);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<AttendanceRecord | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [monthFilter, setMonthFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const { toast } = useToast();

  const filteredData = attendanceData.filter((record) => {
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

  const handleEditRecord = (record: AttendanceRecord) => {
    setEditingRecord(record);
    setDialogOpen(true);
  };

  const handleDeleteRecord = (id: string) => {
    setAttendanceData(attendanceData.filter((record) => record.id !== id));
    toast({
      title: "Đã xóa",
      description: "Bản ghi chấm công đã được xóa thành công.",
    });
  };

  const handleSubmitRecord = (data: any) => {
    if (editingRecord) {
      setAttendanceData(
        attendanceData.map((record) =>
          record.id === editingRecord.id ? { ...record, ...data } : record
        )
      );
      toast({
        title: "Cập nhật thành công",
        description: "Thông tin chấm công đã được cập nhật.",
      });
    } else {
      const newRecord = {
        ...data,
        id: Math.random().toString(),
      };
      setAttendanceData([...attendanceData, newRecord]);
      toast({
        title: "Thêm thành công",
        description: "Bản ghi chấm công mới đã được thêm.",
      });
    }
    setDialogOpen(false);
  };

  /**
   * Handles printing the attendance table
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
          <title>Bảng chấm công</title>
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
              margin-bottom: 30px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
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
            tr:nth-child(even) {
              background-color: #f9f9f9;
            }
            .text-red {
              color: #dc2626;
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
          <h1>Bảng chấm công</h1>
          <div class="subtitle">Quản lý thông tin chấm công của nhân viên</div>
          <table>
            <thead>
              <tr>
                <th>Mã NV</th>
                <th>Tên nhân viên</th>
                <th>Phòng ban</th>
                <th>Chức vụ</th>
                <th>Ngày công</th>
                <th>Nghỉ phép</th>
                <th>Nghỉ không lương</th>
                <th>Ngày đi muộn</th>
                <th>Giờ tăng ca</th>
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
                  <td>${record.workingDays}</td>
                  <td>${record.paidLeaveDays}</td>
                  <td class="text-red">${record.unpaidLeaveDays}</td>
                  <td class="text-red">${record.lateDays}</td>
                  <td>${record.overtimeHours}h</td>
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
          <h1 className="text-3xl font-bold text-foreground">Quản lý chấm công</h1>
          <p className="text-muted-foreground mt-1">
            Quản lý thông tin chấm công của nhân viên
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePrintTable}>
            <Printer className="h-4 w-4 mr-2" />
            In bảng chấm công
          </Button>
          <Button onClick={handleAddRecord}>
            <Plus className="h-4 w-4 mr-2" />
            Thêm chấm công
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
          <CardTitle>Danh sách chấm công</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã NV</TableHead>
                <TableHead>Tên nhân viên</TableHead>
                <TableHead>Phòng ban</TableHead>
                <TableHead>Chức vụ</TableHead>
                <TableHead>Ngày công</TableHead>
                <TableHead>Nghỉ phép</TableHead>
                <TableHead>Nghỉ không lương</TableHead>
                <TableHead>Ngày đi muộn</TableHead>
                <TableHead>Giờ tăng ca</TableHead>
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
                  <TableCell>{record.workingDays}</TableCell>
                  <TableCell>{record.paidLeaveDays}</TableCell>
                  <TableCell className="text-red-600 dark:text-red-400">{record.unpaidLeaveDays}</TableCell>
                  <TableCell className="text-red-600 dark:text-red-400">{record.lateDays}</TableCell>
                  <TableCell>{record.overtimeHours}h</TableCell>
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

      <AttendanceDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmitRecord}
        defaultValues={editingRecord}
      />
    </div>
  );
};

export default Attendance;
