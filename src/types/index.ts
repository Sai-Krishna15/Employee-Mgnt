export interface User {
    username: string;
    name: string;
}

export interface Employee {
    id: string;
    fullName: string;
    gender: 'Male' | 'Female' | 'Other';
    dob: string;
    state: string;
    isActive: boolean;
    profileImage: string;
}

export type EmployeeFormData = Omit<Employee, 'id'>;
