import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserPlus, Search, Eye } from "lucide-react";

interface Employee {
  id: string;
  employeeId: string;
  name: string;
  gender: string;
  department: string;
  position: string;
  status: 'active' | 'on-leave' | 'terminated';
  email: string;
  phone: string;
}

const mockEmployees: Employee[] = [
  {
    id: '1',
    employeeId: 'EMP-2024-001',
    name: 'John Doe',
    gender: 'Male',
    department: 'Engineering',
    position: 'Senior Developer',
    status: 'active',
    email: 'john.doe@company.com',
    phone: '+1 234-567-8901',
  },
  {
    id: '2',
    employeeId: 'EMP-2024-002',
    name: 'Sarah Johnson',
    gender: 'Female',
    department: 'Sales',
    position: 'Sales Manager',
    status: 'active',
    email: 'sarah.johnson@company.com',
    phone: '+1 234-567-8902',
  },
  {
    id: '3',
    employeeId: 'EMP-2024-003',
    name: 'Michael Chen',
    gender: 'Male',
    department: 'Marketing',
    position: 'Marketing Specialist',
    status: 'active',
    email: 'michael.chen@company.com',
    phone: '+1 234-567-8903',
  },
  {
    id: '4',
    employeeId: 'EMP-2024-004',
    name: 'Emily Davis',
    gender: 'Female',
    department: 'Finance',
    position: 'Financial Analyst',
    status: 'on-leave',
    email: 'emily.davis@company.com',
    phone: '+1 234-567-8904',
  },
  {
    id: '5',
    employeeId: 'EMP-2024-005',
    name: 'Robert Wilson',
    gender: 'Male',
    department: 'HR',
    position: 'HR Coordinator',
    status: 'active',
    email: 'robert.wilson@company.com',
    phone: '+1 234-567-8905',
  },
];

export default function Employees() {
  const [employees] = useState<Employee[]>(mockEmployees);
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         employee.employeeId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || employee.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || employee.status === statusFilter;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'on-leave': return 'secondary';
      case 'terminated': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quản lý hồ sơ nhân viên</h1>
          <p className="text-muted-foreground mt-1">Xem và quản lý thông tin nhân viên</p>
        </div>
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          Thêm nhân viên
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm theo tên hoặc mã nhân viên..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Tất cả phòng ban" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="all">Tất cả phòng ban</SelectItem>
                <SelectItem value="Engineering">Kỹ thuật</SelectItem>
                <SelectItem value="Sales">Kinh doanh</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Finance">Tài chính</SelectItem>
                <SelectItem value="HR">Nhân sự</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Tất cả trạng thái" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="active">Đang làm việc</SelectItem>
                <SelectItem value="on-leave">Nghỉ phép</SelectItem>
                <SelectItem value="terminated">Đã nghỉ việc</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã NV</TableHead>
                <TableHead>Họ và tên</TableHead>
                <TableHead>Giới tính</TableHead>
                <TableHead>Phòng ban</TableHead>
                <TableHead>Chức vụ</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Liên hệ</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">{employee.employeeId}</TableCell>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.gender}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(employee.status)}>
                      {employee.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{employee.email}</div>
                      <div className="text-muted-foreground">{employee.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
