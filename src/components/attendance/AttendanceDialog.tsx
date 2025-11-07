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
import { mockEmployees } from "@/data/mockData";

const attendanceSchema = z.object({
  employeeId: z.string().min(1, { message: "Vui lòng chọn nhân viên" }),
  date: z.string().min(1, { message: "Vui lòng chọn ngày" }),
  checkIn: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Giờ vào không hợp lệ (định dạng HH:mm)",
  }).optional().or(z.literal("")),
  checkOut: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Giờ ra không hợp lệ (định dạng HH:mm)",
  }).optional().or(z.literal("")),
  isAbsent: z.boolean().default(false),
  overtimeHours: z.string().refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0 && num <= 12;
  }, { message: "Giờ tăng ca phải từ 0-12 giờ" }).optional().or(z.literal("")),
}).refine((data) => {
  if (data.isAbsent) {
    return true;
  }
  return data.checkIn && data.checkOut;
}, {
  message: "Vui lòng nhập giờ vào và giờ ra nếu không nghỉ",
  path: ["checkIn"],
});

type AttendanceFormValues = z.infer<typeof attendanceSchema>;

interface AttendanceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: AttendanceFormValues) => void;
  defaultValues?: Partial<AttendanceFormValues>;
  mode: "create" | "edit";
}

export function AttendanceDialog({
  open,
  onOpenChange,
  onSubmit,
  defaultValues,
  mode,
}: AttendanceDialogProps) {
  const [isAbsent, setIsAbsent] = useState(defaultValues?.isAbsent || false);

  const form = useForm<AttendanceFormValues>({
    resolver: zodResolver(attendanceSchema),
    defaultValues: {
      employeeId: defaultValues?.employeeId || "",
      date: defaultValues?.date || "",
      checkIn: defaultValues?.checkIn || "",
      checkOut: defaultValues?.checkOut || "",
      isAbsent: defaultValues?.isAbsent || false,
      overtimeHours: defaultValues?.overtimeHours || "",
    },
  });

  const handleSubmit = (data: AttendanceFormValues) => {
    onSubmit(data);
    form.reset();
    setIsAbsent(false);
    onOpenChange(false);
    toast.success(
      mode === "create"
        ? "Thêm dữ liệu chấm công thành công!"
        : "Cập nhật dữ liệu chấm công thành công!"
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Thêm chấm công" : "Chỉnh sửa chấm công"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Nhập thông tin chấm công cho nhân viên"
              : "Cập nhật thông tin chấm công"}
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn nhân viên" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {mockEmployees.map((emp) => (
                        <SelectItem key={emp.employeeId} value={emp.employeeId}>
                          {emp.employeeId} - {emp.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ngày *</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isAbsent"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked);
                        setIsAbsent(checked as boolean);
                        if (checked) {
                          form.setValue("checkIn", "");
                          form.setValue("checkOut", "");
                          form.setValue("overtimeHours", "");
                        }
                      }}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Nghỉ phép</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Đánh dấu nếu nhân viên nghỉ phép ngày này
                    </p>
                  </div>
                </FormItem>
              )}
            />

            {!isAbsent && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="checkIn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Giờ vào *</FormLabel>
                        <FormControl>
                          <Input
                            type="time"
                            {...field}
                            placeholder="08:00"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="checkOut"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Giờ ra *</FormLabel>
                        <FormControl>
                          <Input
                            type="time"
                            {...field}
                            placeholder="17:30"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="overtimeHours"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Giờ tăng ca (giờ)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.5"
                          min="0"
                          max="12"
                          placeholder="0"
                          {...field}
                        />
                      </FormControl>
                      <p className="text-sm text-muted-foreground">
                        Nhập số giờ tăng ca (0-12 giờ)
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  form.reset();
                  setIsAbsent(false);
                  onOpenChange(false);
                }}
              >
                Hủy
              </Button>
              <Button type="submit">
                {mode === "create" ? "Thêm" : "Cập nhật"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
