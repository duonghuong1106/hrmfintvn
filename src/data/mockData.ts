// Centralized mock data for all modules

// Standard departments across the system
export const DEPARTMENTS = [
  'Phòng kinh doanh',
  'Phòng giải pháp',
  'Trung tâm sản xuất phần mềm',
  'Phòng Tài chính - kế toán',
  'Phòng Hành chính nhân sự'
] as const;

// Standard positions across the system
export const POSITIONS = [
  'Business',
  'Analyst',
  'Tester',
  'Developer',
  'Hành chính',
  'Kế toán'
] as const;

// User roles for account management
export const USER_ROLES = [
  'Nhân viên nhân sự',
  'Nhân viên kế toán',
  'Ban giám đốc'
] as const;

export interface Employee {
  id: string;
  employeeId: string;
  name: string;
  gender: string;
  department: typeof DEPARTMENTS[number];
  position: typeof POSITIONS[number];
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
    department: 'Trung tâm sản xuất phần mềm',
    position: 'Developer',
    status: 'active',
    email: 'nguyen.van.an@company.com',
    phone: '0912-345-678',
  },
  {
    id: '2',
    employeeId: 'NV002',
    name: 'Trần Thị Bình',
    gender: 'Nữ',
    department: 'Phòng kinh doanh',
    position: 'Business',
    status: 'active',
    email: 'tran.thi.binh@company.com',
    phone: '0912-345-679',
  },
  {
    id: '3',
    employeeId: 'NV003',
    name: 'Phạm Minh Châu',
    gender: 'Nữ',
    department: 'Phòng giải pháp',
    position: 'Analyst',
    status: 'active',
    email: 'pham.minh.chau@company.com',
    phone: '0912-345-680',
  },
  {
    id: '4',
    employeeId: 'NV004',
    name: 'Lê Hoàng Dũng',
    gender: 'Nam',
    department: 'Trung tâm sản xuất phần mềm',
    position: 'Tester',
    status: 'active',
    email: 'le.hoang.dung@company.com',
    phone: '0912-345-681',
  },
  {
    id: '5',
    employeeId: 'NV005',
    name: 'Võ Thị Em',
    gender: 'Nữ',
    department: 'Phòng Hành chính nhân sự',
    position: 'Hành chính',
    status: 'on-leave',
    email: 'vo.thi.em@company.com',
    phone: '0912-345-682',
  },
  {
    id: '6',
    employeeId: 'NV006',
    name: 'Hoàng Văn Phong',
    gender: 'Nam',
    department: 'Phòng Tài chính - kế toán',
    position: 'Kế toán',
    status: 'active',
    email: 'hoang.van.phong@company.com',
    phone: '0912-345-683',
  },
  {
    id: '7',
    employeeId: 'NV007',
    name: 'Lê Văn Cường',
    gender: 'Nam',
    department: 'Phòng kinh doanh',
    position: 'Business',
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

// Combined Attendance and Payroll Record
export interface AttendancePayrollRecord {
  id: string;
  employeeId: string;
  workingDays: number;
  lateDays: number;
  baseSalary: number;
  bonus: number;
  allowances: number;
  tax: number;
  insurance: number;
  fine: number;
}

export const mockAttendancePayrollData: AttendancePayrollRecord[] = [
  {
    id: "1",
    employeeId: "NV001",
    workingDays: 22,
    lateDays: 1,
    baseSalary: 15000000,
    bonus: 1000000,
    allowances: 3500000,
    tax: 1800000,
    insurance: 1050000,
    fine: 50000,
  },
  {
    id: "2",
    employeeId: "NV002",
    workingDays: 21,
    lateDays: 0,
    baseSalary: 12000000,
    bonus: 2000000,
    allowances: 3000000,
    tax: 1350000,
    insurance: 840000,
    fine: 0,
  },
  {
    id: "3",
    employeeId: "NV003",
    workingDays: 22,
    lateDays: 0,
    baseSalary: 18000000,
    bonus: 1500000,
    allowances: 2500000,
    tax: 2160000,
    insurance: 1260000,
    fine: 0,
  },
  {
    id: "4",
    employeeId: "NV004",
    workingDays: 20,
    lateDays: 2,
    baseSalary: 25000000,
    bonus: 3000000,
    allowances: 4000000,
    tax: 3500000,
    insurance: 1750000,
    fine: 100000,
  },
  {
    id: "5",
    employeeId: "NV005",
    workingDays: 18,
    lateDays: 1,
    baseSalary: 14000000,
    bonus: 500000,
    allowances: 2000000,
    tax: 1260000,
    insurance: 980000,
    fine: 50000,
  },
  {
    id: "6",
    employeeId: "NV006",
    workingDays: 22,
    lateDays: 0,
    baseSalary: 30000000,
    bonus: 5000000,
    allowances: 5000000,
    tax: 4800000,
    insurance: 2100000,
    fine: 0,
  },
  {
    id: "7",
    employeeId: "NV007",
    workingDays: 22,
    lateDays: 2,
    baseSalary: 13000000,
    bonus: 1500000,
    allowances: 3300000,
    tax: 1560000,
    insurance: 910000,
    fine: 100000,
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

// Helper function to get attendance payroll by employee ID
export const getAttendancePayrollByEmployeeId = (employeeId: string): AttendancePayrollRecord | undefined => {
  return mockAttendancePayrollData.find(record => record.employeeId === employeeId);
};

// Helper function to calculate total salary
export const calculateTotalSalary = (record: AttendancePayrollRecord): number => {
  return record.baseSalary + record.bonus + record.allowances - record.tax - record.insurance - record.fine;
};
