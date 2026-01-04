import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Employee, EmployeeFormData } from '../types';
import { mockEmployees } from '../utils/mockData';
import { toast } from 'sonner';

interface EmployeeContextType {
    employees: Employee[];
    addEmployee: (data: EmployeeFormData) => void;
    updateEmployee: (id: string, data: EmployeeFormData) => void;
    deleteEmployee: (id: string) => void;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export const EmployeeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [employees, setEmployees] = useState<Employee[]>(() => {
        const stored = localStorage.getItem('employees');
        return stored ? JSON.parse(stored) : mockEmployees;
    });

    useEffect(() => {
        localStorage.setItem('employees', JSON.stringify(employees));
    }, [employees]);

    const addEmployee = (data: EmployeeFormData) => {
        const newEmployee: Employee = {
            ...data,
            id: Date.now().toString(),
        };
        setEmployees((prev) => [...prev, newEmployee]);
        toast.success('Employee added successfully');
    };

    const updateEmployee = (id: string, data: EmployeeFormData) => {
        setEmployees((prev) =>
            prev.map((emp) => (emp.id === id ? { ...emp, ...data } : emp))
        );
        toast.success('Employee updated successfully');
    };

    const deleteEmployee = (id: string) => {
        setEmployees((prev) => prev.filter((emp) => emp.id !== id));
        toast.success('Employee deleted successfully');
    };

    return (
        <EmployeeContext.Provider value={{ employees, addEmployee, updateEmployee, deleteEmployee }}>
            {children}
        </EmployeeContext.Provider>
    );
};

export const useEmployees = () => {
    const context = useContext(EmployeeContext);
    if (context === undefined) {
        throw new Error('useEmployees must be used within an EmployeeProvider');
    }
    return context;
};
