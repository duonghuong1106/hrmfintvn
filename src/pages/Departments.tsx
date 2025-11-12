import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Building2, Users, Edit, Trash2, Plus } from "lucide-react";
import { DepartmentDialog } from "@/components/departments/DepartmentDialog";
import { toast } from "sonner";

interface Department {
  id: string;
  departmentId: string;
  name: string;
  manager: string;
  employeeCount: number;
  location: string;
}

const mockDepartments: Department[] = [
  {
    id: '1',
    departmentId: 'DEPT-001',
    name: 'Trung tâm sản xuất phần mềm',
    manager: 'Nguyễn Văn Hùng',
    employeeCount: 45,
    location: 'Phòng 503, toà nhà D\'office, tổ 28, phố Thành Thái, Phường Dịch Vọng, Quận Cầu Giấy, Thành phố Hà Nội, Việt Nam',
  },
  {
    id: '2',
    departmentId: 'DEPT-002',
    name: 'Phòng kinh doanh',
    manager: 'Trần Thị Mai',
    employeeCount: 32,
    location: 'Phòng 502, toà nhà D\'office, tổ 28, phố Thành Thái, Phường Dịch Vọng, Quận Cầu Giấy, Thành phố Hà Nội, Việt Nam',
  },
  {
    id: '3',
    departmentId: 'DEPT-003',
    name: 'Phòng giải pháp',
    manager: 'Phạm Quang Minh',
    employeeCount: 28,
    location: 'Phòng 501, toà nhà D\'office, tổ 28, phố Thành Thái, Phường Dịch Vọng, Quận Cầu Giấy, Thành phố Hà Nội, Việt Nam',
  },
  {
    id: '4',
    departmentId: 'DEPT-004',
    name: 'Phòng Tài chính - kế toán',
    manager: 'Lê Thị Hương',
    employeeCount: 18,
    location: 'Phòng 502, toà nhà D\'office, tổ 28, phố Thành Thái, Phường Dịch Vọng, Quận Cầu Giấy, Thành phố Hà Nội, Việt Nam',
  },
  {
    id: '5',
    departmentId: 'DEPT-005',
    name: 'Phòng Hành chính nhân sự',
    manager: 'Võ Minh Tuấn',
    employeeCount: 15,
    location: 'Phòng 501, toà nhà D\'office, tổ 28, phố Thành Thái, Phường Dịch Vọng, Quận Cầu Giấy, Thành phố Hà Nội, Việt Nam',
  },
];

export default function Departments() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);

  const handleEdit = (dept: Department) => {
    setEditingDepartment(dept);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    toast.success("Đã xóa phòng ban thành công");
  };

  const handleAddNew = () => {
    setEditingDepartment(null);
    setDialogOpen(true);
  };

  const handleSubmit = (data: any) => {
    if (editingDepartment) {
      toast.success("Đã cập nhật phòng ban!");
    } else {
      toast.success("Đã thêm phòng ban mới!");
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quản lý phòng ban</h1>
          <p className="text-muted-foreground mt-1">Quản lý cơ cấu tổ chức và phòng ban</p>
        </div>
        <Button className="gap-2" onClick={handleAddNew}>
          <Plus className="h-4 w-4" />
          Thêm phòng ban
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tổng số phòng ban</CardTitle>
            <Building2 className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{mockDepartments.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Trên 3 tòa nhà</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tổng số nhân viên</CardTitle>
            <Users className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              {mockDepartments.reduce((sum, dept) => sum + dept.employeeCount, 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Nhân viên đang làm việc</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Quy mô TB</CardTitle>
            <Users className="h-5 w-5 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              {Math.round(mockDepartments.reduce((sum, dept) => sum + dept.employeeCount, 0) / mockDepartments.length)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Nhân viên mỗi phòng ban</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách phòng ban</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã phòng ban</TableHead>
                <TableHead>Tên phòng ban</TableHead>
                <TableHead>Quản lý</TableHead>
                <TableHead>Số nhân viên</TableHead>
                <TableHead>Vị trí</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockDepartments.map((dept) => (
                <TableRow key={dept.id}>
                  <TableCell className="font-medium">{dept.departmentId}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      {dept.name}
                    </div>
                  </TableCell>
                  <TableCell>{dept.manager}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="gap-1">
                      <Users className="h-3 w-3" />
                      {dept.employeeCount}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{dept.location}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(dept)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(dept.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <DepartmentDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        defaultValues={editingDepartment}
      />
    </div>
  );
}
