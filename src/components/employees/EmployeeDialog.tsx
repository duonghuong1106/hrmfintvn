import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DEPARTMENTS, POSITIONS } from "@/data/mockData";
import { ScrollArea } from "@/components/ui/scroll-area";

interface EmployeeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
  defaultValues?: any;
}

export function EmployeeDialog({ open, onOpenChange, onSubmit, defaultValues }: EmployeeDialogProps) {
  const [formData, setFormData] = useState({
    employeeId: "",
    name: "",
    gender: "",
    dateOfBirth: "",
    hometown: "",
    address: "",
    phone: "",
    email: "",
    idNumber: "",
    idIssueDate: "",
    idIssuePlace: "",
    maritalStatus: "",
    position: "",
    department: "",
    workType: "",
    startDate: "",
    education: "",
    degree: "",
    certifications: "",
    experience: "",
  });

  useEffect(() => {
    if (defaultValues) {
      setFormData({
        employeeId: defaultValues.employeeId || "",
        name: defaultValues.name || "",
        gender: defaultValues.gender || "",
        dateOfBirth: defaultValues.dateOfBirth || "",
        hometown: defaultValues.hometown || "",
        address: defaultValues.address || "",
        phone: defaultValues.phone || "",
        email: defaultValues.email || "",
        idNumber: defaultValues.idNumber || "",
        idIssueDate: defaultValues.idIssueDate || "",
        idIssuePlace: defaultValues.idIssuePlace || "",
        maritalStatus: defaultValues.maritalStatus || "",
        position: defaultValues.position || "",
        department: defaultValues.department || "",
        workType: defaultValues.workType || "",
        startDate: defaultValues.startDate || "",
        education: defaultValues.education || "",
        degree: defaultValues.degree || "",
        certifications: defaultValues.certifications || "",
        experience: defaultValues.experience || "",
      });
    } else {
      setFormData({
        employeeId: "",
        name: "",
        gender: "",
        dateOfBirth: "",
        hometown: "",
        address: "",
        phone: "",
        email: "",
        idNumber: "",
        idIssueDate: "",
        idIssuePlace: "",
        maritalStatus: "",
        position: "",
        department: "",
        workType: "",
        startDate: "",
        education: "",
        degree: "",
        certifications: "",
        experience: "",
      });
    }
  }, [defaultValues, open]);

  const handleSubmit = () => {
    onSubmit(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-popover max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>{defaultValues ? "Chỉnh sửa hồ sơ nhân viên" : "Thêm nhân viên mới"}</DialogTitle>
          <DialogDescription>
            {defaultValues ? "Cập nhật thông tin hồ sơ nhân viên." : "Tạo hồ sơ nhân viên mới trong hệ thống."}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(90vh-200px)] pr-4">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="employeeId">Mã nhân viên *</Label>
                <Input
                  id="employeeId"
                  value={formData.employeeId}
                  onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                  placeholder="NV001"
                  disabled={!!defaultValues}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Họ tên *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nguyễn Văn A"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="gender">Giới tính *</Label>
                <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Chọn giới tính" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="Nam">Nam</SelectItem>
                    <SelectItem value="Nữ">Nữ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dateOfBirth">Ngày sinh *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="hometown">Quê quán</Label>
              <Input
                id="hometown"
                value={formData.hometown}
                onChange={(e) => setFormData({ ...formData, hometown: e.target.value })}
                placeholder="Hà Nội"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="address">Địa chỉ liên hệ *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="123 Đường ABC, Quận XYZ"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="phone">Số điện thoại *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="0123456789"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="idNumber">Số CCCD/CMND *</Label>
                <Input
                  id="idNumber"
                  value={formData.idNumber}
                  onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                  placeholder="001234567890"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="idIssueDate">Ngày cấp</Label>
                <Input
                  id="idIssueDate"
                  type="date"
                  value={formData.idIssueDate}
                  onChange={(e) => setFormData({ ...formData, idIssueDate: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="idIssuePlace">Nơi cấp</Label>
                <Input
                  id="idIssuePlace"
                  value={formData.idIssuePlace}
                  onChange={(e) => setFormData({ ...formData, idIssuePlace: e.target.value })}
                  placeholder="Công an TP. Hà Nội"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="maritalStatus">Tình trạng hôn nhân</Label>
                <Select value={formData.maritalStatus} onValueChange={(value) => setFormData({ ...formData, maritalStatus: value })}>
                  <SelectTrigger id="maritalStatus">
                    <SelectValue placeholder="Chọn tình trạng" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="Độc thân">Độc thân</SelectItem>
                    <SelectItem value="Đã kết hôn">Đã kết hôn</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="position">Chức vụ *</Label>
                <Select value={formData.position} onValueChange={(value) => setFormData({ ...formData, position: value })}>
                  <SelectTrigger id="position">
                    <SelectValue placeholder="Chọn chức vụ" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    {POSITIONS.map((pos) => (
                      <SelectItem key={pos} value={pos}>
                        {pos}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="department">Phòng ban *</Label>
                <Select value={formData.department} onValueChange={(value) => setFormData({ ...formData, department: value })}>
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Chọn phòng ban" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    {DEPARTMENTS.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="workType">Hình thức làm việc *</Label>
                <Select value={formData.workType} onValueChange={(value) => setFormData({ ...formData, workType: value })}>
                  <SelectTrigger id="workType">
                    <SelectValue placeholder="Chọn hình thức" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="Toàn thời gian">Toàn thời gian</SelectItem>
                    <SelectItem value="Bán thời gian">Bán thời gian</SelectItem>
                    <SelectItem value="Thực tập">Thực tập</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="startDate">Ngày vào làm *</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="education">Trình độ học vấn</Label>
                <Select value={formData.education} onValueChange={(value) => setFormData({ ...formData, education: value })}>
                  <SelectTrigger id="education">
                    <SelectValue placeholder="Chọn trình độ" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="Trung cấp">Trung cấp</SelectItem>
                    <SelectItem value="Cao đẳng">Cao đẳng</SelectItem>
                    <SelectItem value="Đại học">Đại học</SelectItem>
                    <SelectItem value="Thạc sĩ">Thạc sĩ</SelectItem>
                    <SelectItem value="Tiến sĩ">Tiến sĩ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="degree">Bằng cấp</Label>
                <Input
                  id="degree"
                  value={formData.degree}
                  onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                  placeholder="Kỹ sư Công nghệ thông tin"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="certifications">Chứng chỉ chuyên môn</Label>
              <Textarea
                id="certifications"
                value={formData.certifications}
                onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
                placeholder="AWS Certified, PMP, ..."
                rows={2}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="experience">Kinh nghiệm công tác</Label>
              <Textarea
                id="experience"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                placeholder="Mô tả kinh nghiệm làm việc..."
                rows={3}
              />
            </div>
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
          <Button onClick={handleSubmit}>
            {defaultValues ? "Cập nhật" : "Thêm nhân viên"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
