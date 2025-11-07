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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { FileText, Search, Eye, Download, Plus } from "lucide-react";
import { toast } from "sonner";
import { mockContracts, getEmployeeById, type Contract } from "@/data/mockData";

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
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);

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

  const handleViewDetails = (contract: Contract) => {
    setSelectedContract(contract);
    setShowDetailDialog(true);
  };

  const handleDownloadContract = (contract: Contract) => {
    toast.success(`Đang tải hợp đồng ${contract.id}`);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
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
        <Button className="gap-2">
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
                          onClick={() => handleViewDetails(contract)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDownloadContract(contract)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
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

      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Chi tiết hợp đồng</DialogTitle>
            <DialogDescription>
              Thông tin chi tiết và bản xem trước hợp đồng
            </DialogDescription>
          </DialogHeader>

          {selectedContract && (() => {
            const employee = getEmployeeById(selectedContract.employeeId);
            return (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Mã hợp đồng</div>
                    <div className="font-medium">{selectedContract.id}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Trạng thái</div>
                    <Badge
                      variant="secondary"
                      className={statusColors[selectedContract.status]}
                    >
                      {statusLabels[selectedContract.status]}
                    </Badge>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Tên nhân viên</div>
                    <div className="font-medium">{employee?.name || "N/A"}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Mã nhân viên</div>
                    <div className="font-medium">{selectedContract.employeeId}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Chức vụ</div>
                    <div className="font-medium">{employee?.position || "N/A"}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Phòng ban</div>
                    <div className="font-medium">{employee?.department || "N/A"}</div>
                  </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Loại hợp đồng</div>
                  <div className="font-medium">
                    {contractTypeLabels[selectedContract.type]}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Thời hạn</div>
                  <div className="font-medium">
                    {selectedContract.startDate} - {selectedContract.endDate}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Lương cơ bản</div>
                  <div className="font-medium text-primary">
                    {formatCurrency(selectedContract.baseSalary)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Phụ cấp</div>
                  <div className="font-medium text-primary">
                    {formatCurrency(selectedContract.allowances)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Tổng thu nhập</div>
                  <div className="font-bold text-primary text-lg">
                    {formatCurrency(
                      selectedContract.baseSalary + selectedContract.allowances
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Bản xem trước hợp đồng</div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-2"
                    onClick={() => handleDownloadContract(selectedContract)}
                  >
                    <Download className="h-4 w-4" />
                    Tải xuống
                  </Button>
                </div>
                <Card className="p-8 bg-muted/30 border-2 border-dashed">
                  <div className="flex flex-col items-center justify-center gap-4 text-center">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <FileText className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        Hợp đồng lao động - {selectedContract.id}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Để xem đầy đủ nội dung hợp đồng, vui lòng tải xuống file PDF
                      </p>
                      <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                        <FileText className="h-4 w-4" />
                        <span>contract_{selectedContract.id}.pdf</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
            );
          })()}
        </DialogContent>
      </Dialog>
    </div>
  );
}
