import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const attendanceSchema = z.object({
  employeeId: z.string().min(1, "Mã nhân viên là bắt buộc"),
  employeeName: z.string().min(1, "Tên nhân viên là bắt buộc"),
  department: z.string().min(1, "Phòng ban là bắt buộc"),
  position: z.string().min(1, "Chức vụ là bắt buộc"),
  workingDays: z.coerce.number().min(0, "Ngày công phải lớn hơn hoặc bằng 0"),
  paidLeaveDays: z.coerce.number().min(0, "Nghỉ phép phải lớn hơn hoặc bằng 0"),
  unpaidLeaveDays: z.coerce.number().min(0, "Ngày nghỉ không lương phải lớn hơn hoặc bằng 0"),
  lateDays: z.coerce.number().min(0, "Ngày đi muộn phải lớn hơn hoặc bằng 0"),
  overtimeHours: z.coerce.number().min(0, "Giờ tăng ca phải lớn hơn hoặc bằng 0"),
  month: z.string().min(1, "Tháng là bắt buộc"),
});

type AttendanceFormValues = z.infer<typeof attendanceSchema>;

interface AttendanceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: AttendanceFormValues) => void;
  defaultValues?: Partial<AttendanceFormValues> | null;
}

export function AttendanceDialog({
  open,
  onOpenChange,
  onSubmit,
  defaultValues,
}: AttendanceDialogProps) {
  const form = useForm<AttendanceFormValues>({
    resolver: zodResolver(attendanceSchema),
    defaultValues: {
      employeeId: "",
      employeeName: "",
      department: "",
      position: "",
      workingDays: 0,
      paidLeaveDays: 0,
      unpaidLeaveDays: 0,
      lateDays: 0,
      overtimeHours: 0,
      month: "",
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues as AttendanceFormValues);
    } else {
      form.reset({
        employeeId: "",
        employeeName: "",
        department: "",
        position: "",
        workingDays: 0,
        paidLeaveDays: 0,
        unpaidLeaveDays: 0,
        lateDays: 0,
        overtimeHours: 0,
        month: "",
      });
    }
  }, [defaultValues, form]);

  const handleSubmit = (data: AttendanceFormValues) => {
    onSubmit(data);
    form.reset();
    onOpenChange(false);
  };

  const isEditing = !!defaultValues;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Sửa thông tin chấm công" : "Thêm chấm công mới"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="employeeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mã nhân viên *</FormLabel>
                    <FormControl>
                      <Input placeholder="VD: NV001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="employeeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên nhân viên *</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập tên nhân viên" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phòng ban *</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập phòng ban" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chức vụ *</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập chức vụ" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="workingDays"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ngày công *</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="paidLeaveDays"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nghỉ phép *</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="unpaidLeaveDays"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ngày nghỉ không lương *</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lateDays"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ngày đi muộn *</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="overtimeHours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giờ tăng ca *</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="month"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tháng *</FormLabel>
                    <FormControl>
                      <Input type="month" placeholder="2025-01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Hủy
              </Button>
              <Button type="submit">
                {isEditing ? "Cập nhật" : "Thêm mới"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
