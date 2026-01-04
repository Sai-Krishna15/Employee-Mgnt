import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Upload, User, Loader2 } from 'lucide-react';
import { useEmployees } from '../context/EmployeeContext';
import type { Employee, EmployeeFormData } from '../types';

const employeeSchema = z.object({
    fullName: z.string().min(3, 'Full Name must be at least 3 characters'),
    gender: z.string().refine((val) => ['Male', 'Female', 'Other'].includes(val), { message: 'Please select a gender' }),
    dob: z.string().min(1, 'Date of Birth is required'),
    state: z.string().min(1, 'State is required'),
    isActive: z.boolean(),
});

type EmployeeSchema = z.infer<typeof employeeSchema>;

interface EmployeeFormProps {
    isOpen: boolean;
    onClose: () => void;
    initialData?: Employee | null;
}

const STATES = [
    'California', 'New York', 'Texas', 'Florida', 'Illinois',
    'Pennsylvania', 'Ohio', 'Georgia', 'North Carolina', 'Michigan'
];

export const EmployeeForm: React.FC<EmployeeFormProps> = ({ isOpen, onClose, initialData }) => {
    const { addEmployee, updateEmployee } = useEmployees();
    const [previewImage, setPreviewImage] = useState<string>('');

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<EmployeeSchema>({
        resolver: zodResolver(employeeSchema),
        defaultValues: {
            fullName: '',
            gender: '',
            dob: '',
            state: '',
            isActive: true,
        },
    });

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setValue('fullName', initialData.fullName);
                setValue('gender', initialData.gender);
                setValue('dob', initialData.dob);
                setValue('state', initialData.state);
                setValue('isActive', initialData.isActive);
                setPreviewImage(initialData.profileImage);
            } else {
                reset({
                    fullName: '',
                    gender: '',
                    dob: '',
                    state: '',
                    isActive: true,
                });
                setPreviewImage('');
            }
        }
    }, [isOpen, initialData, setValue, reset]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async (data: EmployeeSchema) => {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const formData: EmployeeFormData = {
            ...data,
            gender: data.gender as 'Male' | 'Female' | 'Other',
            profileImage: previewImage,
        };

        if (initialData) {
            updateEmployee(initialData.id, formData);
        } else {
            addEmployee(formData);
        }
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-800">
                        {initialData ? 'Edit Employee' : 'Add New Employee'}
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                    {/* Image Upload */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative w-24 h-24 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden group hover:border-blue-500 transition-colors">
                            {previewImage ? (
                                <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <User className="w-10 h-10 text-gray-400" />
                            )}
                            <label className="absolute inset-0 flex items-center justify-center bg-black/50 group-hover:bg-opacity-30 cursor-pointer transition-all">
                                <Upload className="w-6 h-6 text-white opacity-0 group-hover:opacity-100" />
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                            </label>
                        </div>
                        <p className="text-sm text-gray-500">Click to upload profile image</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input
                                {...register('fullName')}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="John Doe"
                            />
                            {errors.fullName && (
                                <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
                            )}
                        </div>

                        {/* Gender */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                            <select
                                {...register('gender')}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.gender && (
                                <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>
                            )}
                        </div>

                        {/* DOB */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                            <input
                                type="date"
                                {...register('dob')}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                max={new Date().toISOString().split('T')[0]}
                            />
                            {errors.dob && (
                                <p className="text-red-500 text-xs mt-1">{errors.dob.message}</p>
                            )}
                        </div>

                        {/* State */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                            <select
                                {...register('state')}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select State</option>
                                {STATES.map((state) => (
                                    <option key={state} value={state}>{state}</option>
                                ))}
                            </select>
                            {errors.state && (
                                <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Active Status */}
                    <div className="flex items-center gap-3">
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                {...register('isActive')}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            <span className="ml-3 text-sm font-medium text-gray-700">
                                Active Employee
                            </span>
                        </label>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                            {initialData ? 'Update Employee' : 'Add Employee'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
