import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DepartmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
  defaultValues?: any;
}

export function DepartmentDialog({ open, onOpenChange, onSubmit, defaultValues }: DepartmentDialogProps) {
  const [formData, setFormData] = useState({
    departmentId: "",
    name: "",
    manager: "",
    location: "",
  });

  useEffect(() => {
    if (defaultValues) {
      setFormData({
        departmentId: defaultValues.departmentId || "",
        name: defaultValues.name || "",
        manager: defaultValues.manager || "",
        location: defaultValues.location || "",
      });
    } else {
      setFormData({
        departmentId: "",
        name: "",
        manager: "",
        location: "",
      });
    }
  }, [defaultValues, open]);

  const handleSubmit = () => {
    onSubmit(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-popover max-w-md">
        <DialogHeader>
          <DialogTitle>{defaultValues ? "Chỉnh sửa phòng ban" : "Thêm phòng ban mới"}</DialogTitle>
          <DialogDescription>
            {defaultValues ? "Cập nhật thông tin phòng ban." : "Tạo phòng ban mới trong hệ thống."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="departmentId">Mã phòng ban *</Label>
            <Input
              id="departmentId"
              value={formData.departmentId}
              onChange={(e) => setFormData({ ...formData, departmentId: e.target.value })}
              placeholder="DEPT-001"
              disabled={!!defaultValues}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="name">Tên phòng ban *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Phòng Kinh doanh"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="manager">Quản lý *</Label>
            <Input
              id="manager"
              value={formData.manager}
              onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
              placeholder="Nguyễn Văn A"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="location">Vị trí *</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Building A, Floor 3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
          <Button onClick={handleSubmit}>
            {defaultValues ? "Cập nhật" : "Thêm phòng ban"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
