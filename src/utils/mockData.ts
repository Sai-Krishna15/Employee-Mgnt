import type { Employee } from '../types';

export const mockEmployees: Employee[] = [
    {
        id: '1',
        fullName: 'John Doe',
        gender: 'Male',
        dob: '1990-01-01',
        state: 'New York',
        isActive: true,
        profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    },
    {
        id: '2',
        fullName: 'Jane Smith',
        gender: 'Female',
        dob: '1992-05-15',
        state: 'California',
        isActive: true,
        profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    },
    {
        id: '3',
        fullName: 'Alice Johnson',
        gender: 'Female',
        dob: '1988-11-20',
        state: 'Texas',
        isActive: false,
        profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
    },
];
