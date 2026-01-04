import React, { useState } from 'react';
import { useEmployees } from '../context/EmployeeContext';
import { Edit, Trash2, Printer, Search, Plus, Filter } from 'lucide-react';
import type { Employee } from '../types';
import { format } from 'date-fns';
import { EmployeeForm } from './EmployeeForm';

export const EmployeeList: React.FC = () => {
    const { employees, deleteEmployee } = useEmployees();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterGender, setFilterGender] = useState<string>('All');
    const [filterStatus, setFilterStatus] = useState<string>('All');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

    const filteredEmployees = employees.filter((emp) => {
        const matchesSearch = emp.fullName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesGender = filterGender === 'All' || emp.gender === filterGender;
        const matchesStatus =
            filterStatus === 'All' ||
            (filterStatus === 'Active' ? emp.isActive : !emp.isActive);
        return matchesSearch && matchesGender && matchesStatus;
    });

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            deleteEmployee(id);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 print-container">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 no-print">
                <h2 className="text-lg font-bold text-gray-800">Employee List</h2>
                <div className="flex flex-wrap items-center gap-3">
                    <button
                        onClick={handlePrint}
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                        <Printer className="w-4 h-4" />
                        Print
                    </button>
                    <button
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        onClick={() => {
                            setEditingEmployee(null);
                            setIsModalOpen(true);
                        }}
                    >
                        <Plus className="w-4 h-4" />
                        Add Employee
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="p-6 border-b border-gray-200 bg-gray-50 flex flex-col sm:flex-row gap-4 no-print">
                <div className="relative flex-1">
                    <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-gray-400" />
                    <select
                        value={filterGender}
                        onChange={(e) => setFilterGender(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="All">All Genders</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="All">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold">
                            <th className="px-6 py-4">ID</th>
                            <th className="px-6 py-4">Profile</th>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Gender</th>
                            <th className="px-6 py-4">DOB</th>
                            <th className="px-6 py-4">State</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right no-print">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {filteredEmployees.length > 0 ? (
                            filteredEmployees.map((emp) => (
                                <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-sm text-gray-600">#{emp.id}</td>
                                    <td className="px-6 py-4">
                                        <img
                                            src={emp.profileImage || 'https://via.placeholder.com/40'}
                                            alt={emp.fullName}
                                            className="w-10 h-10 rounded-full object-cover border border-gray-200"
                                        />
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{emp.fullName}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{emp.gender}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{format(new Date(emp.dob), 'MMM d, yyyy')}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{emp.state}</td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${emp.isActive
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                                }`}
                                        >
                                            {emp.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right no-print">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                                                title="Edit"
                                                onClick={() => {
                                                    setEditingEmployee(emp);
                                                    setIsModalOpen(true);
                                                }}
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                className="p-1 text-red-600 hover:bg-red-50 rounded"
                                                title="Delete"
                                                onClick={() => handleDelete(emp.id)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                                    No employees found matching your filters.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <EmployeeForm
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                initialData={editingEmployee}
            />
        </div>
    );
};
