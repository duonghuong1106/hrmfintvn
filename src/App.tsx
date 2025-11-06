import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HRMLayout } from "@/components/layout/HRMLayout";
import Dashboard from "./pages/Dashboard";
import UserAccounts from "./pages/UserAccounts";
import Employees from "./pages/Employees";
import Departments from "./pages/Departments";
import Contracts from "./pages/Contracts";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <HRMLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/accounts" element={<UserAccounts />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/contracts" element={<Contracts />} />
            <Route path="/attendance" element={<Dashboard />} />
            <Route path="/reports" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HRMLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
