// Centralized mock data for all modules

export interface Employee {
  id: string;
  employeeId: string;
  name: string;
  gender: string;
  department: string;
  position: string;
  status: 'active' | 'on-leave' | 'terminated';
  email: string;
  phone: string;
}

export const mockEmployees: Employee[] = [
  {
    id: '1',
    employeeId: 'NV001',
    name: 'Nguyễn Văn An',
    gender: 'Nam',
    department: 'Kỹ thuật',
    position: 'Kỹ sư phần mềm Senior',
    status: 'active',
    email: 'nguyen.van.an@company.com',
    phone: '0912-345-678',
  },
  {
    id: '2',
    employeeId: 'NV002',
    name: 'Trần Thị Bình',
    gender: 'Nữ',
    department: 'Kinh doanh',
    position: 'Nhân viên kinh doanh',
    status: 'active',
    email: 'tran.thi.binh@company.com',
    phone: '0912-345-679',
  },
  {
    id: '3',
    employeeId: 'NV003',
    name: 'Phạm Minh Châu',
    gender: 'Nữ',
    department: 'Kỹ thuật',
    position: 'Kỹ sư phần mềm',
    status: 'active',
    email: 'pham.minh.chau@company.com',
    phone: '0912-345-680',
  },
  {
    id: '4',
    employeeId: 'NV004',
    name: 'Lê Hoàng Dũng',
    gender: 'Nam',
    department: 'Kinh doanh',
    position: 'Trưởng phòng kinh doanh',
    status: 'active',
    email: 'le.hoang.dung@company.com',
    phone: '0912-345-681',
  },
  {
    id: '5',
    employeeId: 'NV005',
    name: 'Võ Thị Em',
    gender: 'Nữ',
    department: 'Nhân sự',
    position: 'Chuyên viên nhân sự',
    status: 'on-leave',
    email: 'vo.thi.em@company.com',
    phone: '0912-345-682',
  },
  {
    id: '6',
    employeeId: 'NV006',
    name: 'Hoàng Văn Phong',
    gender: 'Nam',
    department: 'Tài chính',
    position: 'Cố vấn tài chính',
    status: 'active',
    email: 'hoang.van.phong@company.com',
    phone: '0912-345-683',
  },
  {
    id: '7',
    employeeId: 'NV007',
    name: 'Lê Văn Cường',
    gender: 'Nam',
    department: 'Marketing',
    position: 'Chuyên viên Marketing',
    status: 'active',
    email: 'le.van.cuong@company.com',
    phone: '0912-345-684',
  },
];

export interface Contract {
  id: string;
  employeeId: string;
  type: "probation" | "fixed" | "indefinite" | "freelance";
  startDate: string;
  endDate: string;
  status: "active" | "expiring" | "expired" | "cancelled";
  baseSalary: number;
  allowances: number;
  pdfUrl: string;
}

export const mockContracts: Contract[] = [
  {
    id: "HD001",
    employeeId: "NV001",
    type: "indefinite",
    startDate: "2023-01-15",
    endDate: "-",
    status: "active",
    baseSalary: 20000000,
    allowances: 3000000,
    pdfUrl: "/placeholder.pdf",
  },
  {
    id: "HD002",
    employeeId: "NV002",
    type: "fixed",
    startDate: "2024-01-01",
    endDate: "2025-12-31",
    status: "active",
    baseSalary: 15000000,
    allowances: 2000000,
    pdfUrl: "/placeholder.pdf",
  },
  {
    id: "HD003",
    employeeId: "NV003",
    type: "fixed",
    startDate: "2024-06-01",
    endDate: "2025-05-31",
    status: "expiring",
    baseSalary: 18000000,
    allowances: 2500000,
    pdfUrl: "/placeholder.pdf",
  },
  {
    id: "HD004",
    employeeId: "NV004",
    type: "probation",
    startDate: "2025-01-01",
    endDate: "2025-03-01",
    status: "active",
    baseSalary: 12000000,
    allowances: 1000000,
    pdfUrl: "/placeholder.pdf",
  },
  {
    id: "HD005",
    employeeId: "NV005",
    type: "fixed",
    startDate: "2023-03-15",
    endDate: "2024-03-14",
    status: "expired",
    baseSalary: 14000000,
    allowances: 1500000,
    pdfUrl: "/placeholder.pdf",
  },
  {
    id: "HD006",
    employeeId: "NV006",
    type: "freelance",
    startDate: "2024-11-01",
    endDate: "2025-02-28",
    status: "active",
    baseSalary: 25000000,
    allowances: 0,
    pdfUrl: "/placeholder.pdf",
  },
];

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  workingDays: number;
  lateDays: number;
  absenceDays: number;
  overtimeHours: number;
  records: {
    date: string;
    checkIn: string;
    checkOut: string;
  }[];
}

export const mockAttendanceData: AttendanceRecord[] = [
  {
    id: "1",
    employeeId: "NV001",
    workingDays: 22,
    lateDays: 1,
    absenceDays: 0,
    overtimeHours: 8,
    records: [
      { date: "01/06", checkIn: "08:00", checkOut: "17:30" },
      { date: "02/06", checkIn: "08:15", checkOut: "17:45" },
      { date: "03/06", checkIn: "08:05", checkOut: "17:30" },
      { date: "04/06", checkIn: "08:00", checkOut: "17:30" },
      { date: "05/06", checkIn: "08:10", checkOut: "17:30" },
    ],
  },
  {
    id: "2",
    employeeId: "NV002",
    workingDays: 21,
    lateDays: 0,
    absenceDays: 1,
    overtimeHours: 4,
    records: [
      { date: "01/06", checkIn: "08:00", checkOut: "17:30" },
      { date: "02/06", checkIn: "08:00", checkOut: "17:30" },
      { date: "03/06", checkIn: "Nghỉ", checkOut: "-" },
      { date: "04/06", checkIn: "08:00", checkOut: "17:30" },
      { date: "05/06", checkIn: "08:00", checkOut: "17:30" },
    ],
  },
  {
    id: "3",
    employeeId: "NV007",
    workingDays: 22,
    lateDays: 2,
    absenceDays: 0,
    overtimeHours: 12,
    records: [
      { date: "01/06", checkIn: "08:00", checkOut: "17:30" },
      { date: "02/06", checkIn: "08:20", checkOut: "17:30" },
      { date: "03/06", checkIn: "08:00", checkOut: "17:30" },
      { date: "04/06", checkIn: "08:25", checkOut: "17:30" },
      { date: "05/06", checkIn: "08:00", checkOut: "19:00" },
    ],
  },
];

export interface PayrollRecord {
  id: string;
  employeeId: string;
  baseSalary: number;
  allowances: {
    position: number;
    transport: number;
    meal: number;
  };
  deductions: {
    tax: number;
    insurance: number;
    late: number;
  };
  bonus: number;
  overtime: number;
}

export const mockPayrollData: PayrollRecord[] = [
  {
    id: "1",
    employeeId: "NV001",
    baseSalary: 15000000,
    allowances: {
      position: 2000000,
      transport: 500000,
      meal: 1000000,
    },
    deductions: {
      tax: 1800000,
      insurance: 1050000,
      late: 50000,
    },
    bonus: 1000000,
    overtime: 800000,
  },
  {
    id: "2",
    employeeId: "NV002",
    baseSalary: 12000000,
    allowances: {
      position: 1500000,
      transport: 500000,
      meal: 1000000,
    },
    deductions: {
      tax: 1350000,
      insurance: 840000,
      late: 0,
    },
    bonus: 2000000,
    overtime: 400000,
  },
  {
    id: "3",
    employeeId: "NV007",
    baseSalary: 13000000,
    allowances: {
      position: 1800000,
      transport: 500000,
      meal: 1000000,
    },
    deductions: {
      tax: 1560000,
      insurance: 910000,
      late: 100000,
    },
    bonus: 1500000,
    overtime: 1200000,
  },
];

// Helper function to get employee by ID
export const getEmployeeById = (employeeId: string): Employee | undefined => {
  return mockEmployees.find(emp => emp.employeeId === employeeId);
};

// Helper function to get contract by employee ID
export const getContractByEmployeeId = (employeeId: string): Contract | undefined => {
  return mockContracts.find(contract => contract.employeeId === employeeId);
};

// Helper function to get attendance by employee ID
export const getAttendanceByEmployeeId = (employeeId: string): AttendanceRecord | undefined => {
  return mockAttendanceData.find(att => att.employeeId === employeeId);
};

// Helper function to get payroll by employee ID
export const getPayrollByEmployeeId = (employeeId: string): PayrollRecord | undefined => {
  return mockPayrollData.find(payroll => payroll.employeeId === employeeId);
};
