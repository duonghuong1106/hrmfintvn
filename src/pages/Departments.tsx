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
    name: 'Engineering',
    manager: 'John Doe',
    employeeCount: 78,
    location: 'Building A, Floor 3',
  },
  {
    id: '2',
    departmentId: 'DEPT-002',
    name: 'Sales',
    manager: 'Sarah Johnson',
    employeeCount: 45,
    location: 'Building B, Floor 2',
  },
  {
    id: '3',
    departmentId: 'DEPT-003',
    name: 'Marketing',
    manager: 'Michael Chen',
    employeeCount: 32,
    location: 'Building A, Floor 2',
  },
  {
    id: '4',
    departmentId: 'DEPT-004',
    name: 'Human Resources',
    manager: 'Emily Davis',
    employeeCount: 15,
    location: 'Building C, Floor 1',
  },
  {
    id: '5',
    departmentId: 'DEPT-005',
    name: 'Finance',
    manager: 'Robert Wilson',
    employeeCount: 28,
    location: 'Building B, Floor 1',
  },
  {
    id: '6',
    departmentId: 'DEPT-006',
    name: 'Operations',
    manager: 'Lisa Anderson',
    employeeCount: 42,
    location: 'Building A, Floor 1',
  },
];

export default function Departments() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Department Management</h1>
          <p className="text-muted-foreground mt-1">Manage organizational departments and structure</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Department
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Departments</CardTitle>
            <Building2 className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{mockDepartments.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Across 3 buildings</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Employees</CardTitle>
            <Users className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              {mockDepartments.reduce((sum, dept) => sum + dept.employeeCount, 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Active workforce</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Team Size</CardTitle>
            <Users className="h-5 w-5 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              {Math.round(mockDepartments.reduce((sum, dept) => sum + dept.employeeCount, 0) / mockDepartments.length)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Employees per department</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Department Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Department ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Manager</TableHead>
                <TableHead>Employees</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">Actions</TableHead>
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
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
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
    </div>
  );
}
