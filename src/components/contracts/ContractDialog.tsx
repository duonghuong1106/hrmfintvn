import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockEmployees } from "@/data/mockData";

interface ContractDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
  defaultValues?: any;
}

export function ContractDialog({ open, onOpenChange, onSubmit, defaultValues }: ContractDialogProps) {
  const [formData, setFormData] = useState({
    id: "",
    employeeId: "",
    type: "",
    startDate: "",
    endDate: "",
    baseSalary: "",
    allowances: "",
    status: "",
  });

  useEffect(() => {
    if (defaultValues) {
      setFormData({
        id: defaultValues.id || "",
        employeeId: defaultValues.employeeId || "",
        type: defaultValues.type || "",
        startDate: defaultValues.startDate || "",
        endDate: defaultValues.endDate || "",
        baseSalary: defaultValues.baseSalary?.toString() || "",
        allowances: defaultValues.allowances?.toString() || "",
        status: defaultValues.status || "",
      });
    } else {
      setFormData({
        id: "",
        employeeId: "",
        type: "",
        startDate: "",
        endDate: "",
        baseSalary: "",
        allowances: "",
        status: "active",
      });
    }
  }, [defaultValues, open]);

  const handleSubmit = () => {
    const submitData = {
      ...formData,
      baseSalary: parseFloat(formData.baseSalary) || 0,
      allowances: parseFloat(formData.allowances) || 0,
    };
    onSubmit(submitData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-popover max-w-2xl">
        <DialogHeader>
          <DialogTitle>{defaultValues ? "Chỉnh sửa hợp đồng" : "Thêm hợp đồng mới"}</DialogTitle>
          <DialogDescription>
            {defaultValues ? "Cập nhật thông tin hợp đồng lao động." : "Tạo hợp đồng lao động mới cho nhân viên."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="id">Mã hợp đồng *</Label>
              <Input
                id="id"
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                placeholder="CT-2024-001"
                disabled={!!defaultValues}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="employeeId">Nhân viên *</Label>
              <Select value={formData.employeeId} onValueChange={(value) => setFormData({ ...formData, employeeId: value })}>
                <SelectTrigger id="employeeId">
                  <SelectValue placeholder="Chọn nhân viên" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  {mockEmployees.map((emp) => (
                    <SelectItem key={emp.employeeId} value={emp.employeeId}>
                      {emp.employeeId} - {emp.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="type">Loại hợp đồng *</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Chọn loại hợp đồng" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="probation">Thử việc</SelectItem>
                  <SelectItem value="fixed">Có thời hạn</SelectItem>
                  <SelectItem value="indefinite">Không thời hạn</SelectItem>
                  <SelectItem value="freelance">Cộng tác viên</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Trạng thái *</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="active">Đang hoạt động</SelectItem>
                  <SelectItem value="expiring">Sắp hết hạn</SelectItem>
                  <SelectItem value="expired">Đã hết hạn</SelectItem>
                  <SelectItem value="cancelled">Đã huỷ</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="startDate">Ngày bắt đầu *</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="endDate">Ngày kết thúc</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="baseSalary">Lương cơ bản (VNĐ) *</Label>
              <Input
                id="baseSalary"
                type="number"
                value={formData.baseSalary}
                onChange={(e) => setFormData({ ...formData, baseSalary: e.target.value })}
                placeholder="15000000"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="allowances">Phụ cấp (VNĐ)</Label>
              <Input
                id="allowances"
                type="number"
                value={formData.allowances}
                onChange={(e) => setFormData({ ...formData, allowances: e.target.value })}
                placeholder="2000000"
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
          <Button onClick={handleSubmit}>
            {defaultValues ? "Cập nhật" : "Thêm hợp đồng"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
