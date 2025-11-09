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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserPlus, Search, Edit, Trash2, Lock, Unlock } from "lucide-react";
import { toast } from "sonner";

import { DEPARTMENTS, USER_ROLES } from "@/data/mockData";
import { EditUserAccountDialog } from "@/components/user-accounts/EditUserAccountDialog";

interface UserAccount {
  id: string;
  username: string;
  fullName: string;
  email: string;
  role: typeof USER_ROLES[number];
  status: 'active' | 'inactive';
  createdDate: string;
  department: typeof DEPARTMENTS[number];
}

const mockAccounts: UserAccount[] = [
  {
    id: '1',
    username: 'admin',
    fullName: 'Nguyễn Văn Đạt',
    email: 'nguyen.van.dat@company.com',
    role: 'Ban giám đốc',
    status: 'active',
    createdDate: '2024-01-15',
    department: 'Phòng Hành chính nhân sự',
  },
  {
    id: '2',
    username: 'hr_staff',
    fullName: 'Trần Thị Hương',
    email: 'tran.thi.huong@company.com',
    role: 'Nhân viên nhân sự',
    status: 'active',
    createdDate: '2024-02-20',
    department: 'Phòng Hành chính nhân sự',
  },
  {
    id: '3',
    username: 'accountant',
    fullName: 'Lê Văn Minh',
    email: 'le.van.minh@company.com',
    role: 'Nhân viên kế toán',
    status: 'active',
    createdDate: '2024-03-10',
    department: 'Phòng Tài chính - kế toán',
  },
];

export default function UserAccounts() {
  const [accounts, setAccounts] = useState<UserAccount[]>(mockAccounts);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<UserAccount | null>(null);

  const filteredAccounts = accounts.filter(account =>
    account.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    account.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    account.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleStatus = (id: string) => {
    setAccounts(accounts.map(account =>
      account.id === id
        ? { ...account, status: account.status === 'active' ? 'inactive' : 'active' }
        : account
    ));
    toast.success("Đã cập nhật trạng thái tài khoản");
  };

  const handleDelete = (id: string) => {
    setAccounts(accounts.filter(account => account.id !== id));
    toast.success("Đã xóa tài khoản thành công");
  };

  const handleEdit = (account: UserAccount) => {
    setEditingAccount(account);
    setIsEditDialogOpen(true);
  };

  const handleSubmitEdit = (data: any) => {
    toast.success("Đã cập nhật tài khoản thành công");
  };

  const handleSubmitAdd = (data: any) => {
    toast.success("Đã tạo tài khoản thành công");
    setIsAddDialogOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quản lý tài khoản người dùng</h1>
          <p className="text-muted-foreground mt-1">Quản lý tài khoản và phân quyền hệ thống</p>
        </div>
        <Button className="gap-2" onClick={() => setIsAddDialogOpen(true)}>
          <UserPlus className="h-4 w-4" />
          Thêm tài khoản
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Tài khoản người dùng</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm tài khoản..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên đăng nhập</TableHead>
                <TableHead>Họ và tên</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Vai trò</TableHead>
                <TableHead>Phòng ban</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAccounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell className="font-medium">{account.username}</TableCell>
                  <TableCell>{account.fullName}</TableCell>
                  <TableCell>{account.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{account.role}</Badge>
                  </TableCell>
                  <TableCell>{account.department}</TableCell>
                  <TableCell>
                    <Badge variant={account.status === 'active' ? 'default' : 'secondary'}>
                      {account.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{account.createdDate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(account)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleToggleStatus(account.id)}
                      >
                        {account.status === 'active' ? (
                          <Lock className="h-4 w-4" />
                        ) : (
                          <Unlock className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(account.id)}
                      >
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

      <EditUserAccountDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleSubmitAdd}
      />

      <EditUserAccountDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSubmit={handleSubmitEdit}
        defaultValues={editingAccount}
      />
    </div>
  );
}
