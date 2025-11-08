import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { mockEmployees, getEmployeeById } from "@/data/mockData";

const attendancePayrollSchema = z.object({
  employeeId: z.string().min(1, { message: "Vui lòng chọn nhân viên" }),
  workingDays: z.string().refine((val) => {
    const num = parseInt(val);
    return !isNaN(num) && num >= 0 && num <= 31;
  }, { message: "Số ngày công phải từ 0-31" }),
  lateDays: z.string().refine((val) => {
    const num = parseInt(val);
    return !isNaN(num) && num >= 0;
  }, { message: "Số ngày đi muộn phải >= 0" }),
  baseSalary: z.string().refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: "Lương cơ bản phải >= 0" }),
  bonus: z.string().refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: "Tiền thưởng phải >= 0" }),
  allowances: z.string().refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: "Trợ cấp phải >= 0" }),
  tax: z.string().refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: "Thuế TNCN phải >= 0" }),
  insurance: z.string().refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: "BHXH phải >= 0" }),
  fine: z.string().refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: "Tiền phạt phải >= 0" }),
});

type AttendancePayrollFormValues = z.infer<typeof attendancePayrollSchema>;

interface AttendanceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: AttendancePayrollFormValues) => void;
  defaultValues?: any;
}

export function AttendanceDialog({
  open,
  onOpenChange,
  onSubmit,
  defaultValues,
}: AttendanceDialogProps) {
  const form = useForm<AttendancePayrollFormValues>({
    resolver: zodResolver(attendancePayrollSchema),
    defaultValues: {
      employeeId: defaultValues?.employeeId || "",
      workingDays: defaultValues?.workingDays?.toString() || "",
      lateDays: defaultValues?.lateDays?.toString() || "",
      baseSalary: defaultValues?.baseSalary?.toString() || "",
      bonus: defaultValues?.bonus?.toString() || "",
      allowances: defaultValues?.allowances?.toString() || "",
      tax: defaultValues?.tax?.toString() || "",
      insurance: defaultValues?.insurance?.toString() || "",
      fine: defaultValues?.fine?.toString() || "",
    },
  });

  const handleSubmit = (data: AttendancePayrollFormValues) => {
    onSubmit(data);
    form.reset();
    onOpenChange(false);
  };

  const calculateTotalSalary = () => {
    const baseSalary = parseFloat(form.watch("baseSalary") || "0");
    const bonus = parseFloat(form.watch("bonus") || "0");
    const allowances = parseFloat(form.watch("allowances") || "0");
    const tax = parseFloat(form.watch("tax") || "0");
    const insurance = parseFloat(form.watch("insurance") || "0");
    const fine = parseFloat(form.watch("fine") || "0");
    
    return baseSalary + bonus + allowances - tax - insurance - fine;
  };

  const isEditing = !!defaultValues;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Chỉnh sửa chấm công & lương' : 'Thêm Bảng chấm công và lương'}
          </DialogTitle>
          <DialogDescription>
            {isEditing 
              ? `Cập nhật thông tin chấm công và lương cho nhân viên ${defaultValues?.employeeName}`
              : 'Thêm thông tin chấm công và lương cho nhân viên'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="employeeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nhân viên *</FormLabel>
                  {isEditing ? (
                    <FormControl>
                      <Input {...field} disabled className="bg-muted" />
                    </FormControl>
                  ) : (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn nhân viên" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mockEmployees.map((employee) => (
                          <SelectItem key={employee.employeeId} value={employee.employeeId}>
                            {employee.employeeId} - {employee.name} ({employee.department})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="workingDays"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ngày công *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        max="31"
                        placeholder="22"
                        {...field}
                      />
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
                      <Input
                        type="number"
                        min="0"
                        placeholder="0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
              <h4 className="font-semibold text-sm">Thông tin lương</h4>
              
              <FormField
                control={form.control}
                name="baseSalary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lương cơ bản (VNĐ) *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        placeholder="15000000"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="bonus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tiền thưởng (VNĐ) *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="1000000"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="allowances"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Trợ cấp (VNĐ) *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="3000000"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-3 p-4 bg-red-50 dark:bg-red-950/20 rounded-lg">
              <h4 className="font-semibold text-sm text-red-700 dark:text-red-400">
                Khấu trừ
              </h4>
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="tax"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thuế TNCN (VNĐ) *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="1800000"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="insurance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>BHXH (VNĐ) *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="1050000"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="fine"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tiền phạt (VNĐ) *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        placeholder="0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="p-4 bg-primary/10 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Tổng lương thực lãnh:</span>
                <span className="text-2xl font-bold text-primary">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(calculateTotalSalary())}
                </span>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  form.reset();
                  onOpenChange(false);
                }}
              >
                Hủy
              </Button>
              <Button type="submit">{isEditing ? 'Cập nhật' : 'Thêm'}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
