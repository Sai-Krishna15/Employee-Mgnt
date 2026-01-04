import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useEmployees } from '../context/EmployeeContext';
import { EmployeeList } from '../components/EmployeeList';
import { LogOut, Users, LayoutDashboard } from 'lucide-react';

const Dashboard: React.FC = () => {
    const { logout, user } = useAuth();
    const { employees } = useEmployees();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Navbar */}
            <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <LayoutDashboard className="w-6 h-6 text-blue-600" />
                    <h1 className="text-xl font-bold text-gray-800">Employee Dashboard</h1>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-600">
                        Welcome, <span className="font-medium text-gray-900">{user?.username}</span>
                    </div>
                    <button
                        onClick={logout}
                        className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                </div>
            </nav>

            <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center gap-4">
                        <div className="bg-blue-100 p-3 rounded-full">
                            <Users className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Total Employees</p>
                            <p className="text-2xl font-bold text-gray-900">{employees.length}</p>
                        </div>
                    </div>
                    {/* Optional Bonus: Active vs Inactive */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center gap-4">
                        <div className="bg-green-100 p-3 rounded-full">
                            <Users className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Active Employees</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {employees.filter(e => e.isActive).length}
                            </p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center gap-4">
                        <div className="bg-gray-100 p-3 rounded-full">
                            <Users className="w-6 h-6 text-gray-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Inactive Employees</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {employees.filter(e => !e.isActive).length}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Employee List */}
                <EmployeeList />
            </main>
        </div>
    );
};

export default Dashboard;
