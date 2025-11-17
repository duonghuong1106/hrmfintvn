import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { FileText, Search, Edit, Trash2, Plus } from "lucide-react";
import { mockContracts, getEmployeeById, type Contract } from "@/data/mockData";
import { ContractDialog } from "@/components/contracts/ContractDialog";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const contractTypeLabels = {
  probation: "Thử việc",
  fixed: "Có thời hạn",
  indefinite: "Không thời hạn",
  freelance: "Cộng tác viên",
};

const statusLabels = {
  active: "Đang hoạt động",
  expiring: "Sắp hết hạn",
  expired: "Đã hết hạn",
  cancelled: "Đã huỷ",
};

const statusColors = {
  active: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  expiring: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  expired: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  cancelled: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
};

export default function Contracts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingContract, setEditingContract] = useState<Contract | null>(null);

  const filteredContracts = mockContracts.filter((contract) => {
    const employee = getEmployeeById(contract.employeeId);
    const employeeName = employee?.name || "";
    const matchesSearch =
      employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contract.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contract.employeeId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || contract.type === typeFilter;
    const matchesStatus = statusFilter === "all" || contract.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleEdit = (contract: Contract) => {
    setEditingContract(contract);
    setDialogOpen(true);
  };

  const handleDelete = (contractId: string) => {
    // TODO: Implement delete functionality
    toast.success("Đã xóa hợp đồng thành công");
  };

  const handleAddNew = () => {
    setEditingContract(null);
    setDialogOpen(true);
  };

  const handleSubmit = (data: any) => {
    if (editingContract) {
      toast.success("Đã cập nhật hợp đồng!");
    } else {
      toast.success("Đã thêm hợp đồng mới!");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quản lý hợp đồng</h1>
          <p className="text-muted-foreground mt-2">
            Quản lý hợp đồng lao động của nhân viên
          </p>
        </div>
        <Button className="gap-2" onClick={handleAddNew}>
          <Plus className="h-4 w-4" />
          Thêm hợp đồng
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Tìm kiếm theo tên nhân viên hoặc mã hợp đồng..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Loại hợp đồng" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả loại</SelectItem>
              <SelectItem value="probation">Thử việc</SelectItem>
              <SelectItem value="fixed">Có thời hạn</SelectItem>
              <SelectItem value="indefinite">Không thời hạn</SelectItem>
              <SelectItem value="freelance">Cộng tác viên</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value="active">Đang hoạt động</SelectItem>
              <SelectItem value="expiring">Sắp hết hạn</SelectItem>
              <SelectItem value="expired">Đã hết hạn</SelectItem>
              <SelectItem value="cancelled">Đã huỷ</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã hợp đồng</TableHead>
                <TableHead>Tên nhân viên</TableHead>
                <TableHead>Loại hợp đồng</TableHead>
                <TableHead>Ngày bắt đầu</TableHead>
                <TableHead>Ngày kết thúc</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContracts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Không tìm thấy hợp đồng nào
                  </TableCell>
                </TableRow>
              ) : (
                filteredContracts.map((contract) => {
                  const employee = getEmployeeById(contract.employeeId);
                  return (
                    <TableRow key={contract.id}>
                      <TableCell className="font-medium">{contract.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{employee?.name || "N/A"}</div>
                          <div className="text-sm text-muted-foreground">
                            {contract.employeeId}
                          </div>
                        </div>
                      </TableCell>
                    <TableCell>{contractTypeLabels[contract.type]}</TableCell>
                    <TableCell>{contract.startDate}</TableCell>
                    <TableCell>{contract.endDate}</TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={statusColors[contract.status]}
                      >
                        {statusLabels[contract.status]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(contract)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Xác nhận xoá</AlertDialogTitle>
                              <AlertDialogDescription>
                                Bạn có chắc chắn muốn xoá thông tin này?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Huỷ</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(contract.id)}>
                                Xoá
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
      
      <ContractDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        defaultValues={editingContract}
      />
    </div>
  );
}
