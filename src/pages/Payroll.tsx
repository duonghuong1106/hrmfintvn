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
import { PayrollDialog } from "@/components/payroll/PayrollDialog";
import { useToast } from "@/hooks/use-toast";

interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  baseSalary: number;
  bonus: number;
  allowance: number;
  tax: number;
  socialInsurance: number;
  fine: number;
  totalSalary: number;
}

const mockPayrollData: PayrollRecord[] = [
  {
    id: "1",
    employeeId: "NV001",
    employeeName: "Nguyễn Văn A",
    baseSalary: 15000000,
    bonus: 2000000,
    allowance: 1000000,
    tax: 1500000,
    socialInsurance: 1200000,
    fine: 0,
    totalSalary: 15300000,
  },
  {
    id: "2",
    employeeId: "NV002",
    employeeName: "Trần Thị B",
    baseSalary: 18000000,
    bonus: 3000000,
    allowance: 1500000,
    tax: 2000000,
    socialInsurance: 1500000,
    fine: 500000,
    totalSalary: 18500000,
  },
];

const Payroll = () => {
  const [payrollData, setPayrollData] = useState<PayrollRecord[]>(mockPayrollData);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<PayrollRecord | null>(null);
  const { toast } = useToast();

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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quản lý lương</h1>
          <p className="text-muted-foreground mt-1">
            Quản lý thông tin lương của nhân viên
          </p>
        </div>
        <Button onClick={handleAddRecord}>
          <Plus className="h-4 w-4 mr-2" />
          Thêm bảng lương
        </Button>
      </div>

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
              {payrollData.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.employeeId}</TableCell>
                  <TableCell>{record.employeeName}</TableCell>
                  <TableCell>{formatCurrency(record.baseSalary)}</TableCell>
                  <TableCell>{formatCurrency(record.bonus)}</TableCell>
                  <TableCell>{formatCurrency(record.allowance)}</TableCell>
                  <TableCell>{formatCurrency(record.tax)}</TableCell>
                  <TableCell>{formatCurrency(record.socialInsurance)}</TableCell>
                  <TableCell>{formatCurrency(record.fine)}</TableCell>
                  <TableCell className="font-semibold">
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
