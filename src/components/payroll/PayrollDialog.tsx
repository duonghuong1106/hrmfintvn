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

const payrollSchema = z.object({
  employeeId: z.string().min(1, "Mã nhân viên là bắt buộc"),
  employeeName: z.string().min(1, "Tên nhân viên là bắt buộc"),
  department: z.string().min(1, "Phòng ban là bắt buộc"),
  position: z.string().min(1, "Chức vụ là bắt buộc"),
  baseSalary: z.coerce.number().min(0, "Lương cơ bản phải lớn hơn hoặc bằng 0"),
  bonus: z.coerce.number().min(0, "Tiền thưởng phải lớn hơn hoặc bằng 0"),
  allowance: z.coerce.number().min(0, "Trợ cấp phải lớn hơn hoặc bằng 0"),
  tax: z.coerce.number().min(0, "Thuế phải lớn hơn hoặc bằng 0"),
  socialInsurance: z.coerce.number().min(0, "BHXH phải lớn hơn hoặc bằng 0"),
  fine: z.coerce.number().min(0, "Tiền phạt phải lớn hơn hoặc bằng 0"),
  month: z.string().min(1, "Tháng là bắt buộc"),
});

type PayrollFormValues = z.infer<typeof payrollSchema>;

interface PayrollDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: PayrollFormValues) => void;
  defaultValues?: Partial<PayrollFormValues> | null;
}

export function PayrollDialog({
  open,
  onOpenChange,
  onSubmit,
  defaultValues,
}: PayrollDialogProps) {
  const form = useForm<PayrollFormValues>({
    resolver: zodResolver(payrollSchema),
    defaultValues: {
      employeeId: "",
      employeeName: "",
      department: "",
      position: "",
      baseSalary: 0,
      bonus: 0,
      allowance: 0,
      tax: 0,
      socialInsurance: 0,
      fine: 0,
      month: "",
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues as PayrollFormValues);
    } else {
      form.reset({
        employeeId: "",
        employeeName: "",
        department: "",
        position: "",
        baseSalary: 0,
        bonus: 0,
        allowance: 0,
        tax: 0,
        socialInsurance: 0,
        fine: 0,
        month: "",
      });
    }
  }, [defaultValues, form]);

  const handleSubmit = (data: PayrollFormValues) => {
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
            {isEditing ? "Sửa thông tin lương" : "Thêm bảng lương mới"}
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
                name="baseSalary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lương cơ bản (VNĐ) *</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bonus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tiền thưởng (VNĐ) *</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="allowance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trợ cấp (VNĐ) *</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tax"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thuế thu nhập cá nhân (VNĐ) *</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="socialInsurance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bảo hiểm xã hội (VNĐ) *</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fine"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tiền phạt (VNĐ) *</FormLabel>
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
