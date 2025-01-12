import { Department } from "./department";

export interface InputAndLabels{
    label: string,
    input: string
}

export interface AddEmployee{
    _id?: string
    name: string;
    email: string;
    position: string;
    department: Department;
    dateOfJoining: Date;
    salary: number;
}

export type  TableData = "Employee" | "Department"