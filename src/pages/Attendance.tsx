import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2 } from "lucide-react";
import { AttendanceDialog } from "@/components/attendance/AttendanceDialog";
import { useToast } from "@/hooks/use-toast";

interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  workingDays: number;
  leaveDays: number;
  unpaidLeaveDays: number;
  lateDays: number;
  overtimeHours: number;
}

const mockAttendanceData: AttendanceRecord[] = [
  {
    id: "1",
    employeeId: "NV001",
    employeeName: "Nguyễn Văn A",
    workingDays: 22,
    leaveDays: 1,
    unpaidLeaveDays: 0,
    lateDays: 2,
    overtimeHours: 10,
  },
  {
    id: "2",
    employeeId: "NV002",
    employeeName: "Trần Thị B",
    workingDays: 23,
    leaveDays: 0,
    unpaidLeaveDays: 0,
    lateDays: 0,
    overtimeHours: 15,
  },
];

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>(mockAttendanceData);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<AttendanceRecord | null>(null);
  const { toast } = useToast();

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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quản lý chấm công</h1>
          <p className="text-muted-foreground mt-1">
            Quản lý thông tin chấm công của nhân viên
          </p>
        </div>
        <Button onClick={handleAddRecord}>
          <Plus className="h-4 w-4 mr-2" />
          Thêm chấm công
        </Button>
      </div>

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
                <TableHead>Ngày công</TableHead>
                <TableHead>Ngày nghỉ</TableHead>
                <TableHead>Nghỉ không lương</TableHead>
                <TableHead>Ngày đi muộn</TableHead>
                <TableHead>Giờ tăng ca</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendanceData.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.employeeId}</TableCell>
                  <TableCell>{record.employeeName}</TableCell>
                  <TableCell>{record.workingDays}</TableCell>
                  <TableCell>{record.leaveDays}</TableCell>
                  <TableCell>{record.unpaidLeaveDays}</TableCell>
                  <TableCell>{record.lateDays}</TableCell>
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
