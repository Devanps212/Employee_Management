import React from 'react';
import { Department } from "../../types";

interface DepartmentFilterProps {
  departments: Department[] | null;
  selectedDepartment: string | null;
  onDepartmentChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const DepartmentFilter: React.FC<DepartmentFilterProps> = ({ 
    departments, 
    selectedDepartment, 
    onDepartmentChange 
}) => {
  return (
    <div className="mb-4">
      <select
        value={selectedDepartment || ""}
        onChange={onDepartmentChange}
        className="p-2 border border-gray-300 rounded-md"
      >
        <option value="" >All Departments</option>
        {departments &&
          departments.map((dept) => (
            <option key={dept._id} value={dept.name} data-testid={`department-option-${dept.name}`}>
              {dept.name}
            </option>
          ))}
      </select>
    </div>
  )
}

export default DepartmentFilter;
