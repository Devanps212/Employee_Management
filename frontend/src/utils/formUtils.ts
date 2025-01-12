import * as Yup from 'yup';
import { Department, AddEmployee, InputAndLabels } from '../types';

export const generateValidationSchema = (
  inputsWithLabel: InputAndLabels[],
  departments: Department[] | null,
) => {
  return inputsWithLabel.reduce((acc, curr) => {
    const { input, label } = curr

    if(label.toLowerCase() === 'email'){
      acc[input] = Yup.string().email('Invalid email format').required(`${label} is required`)
    }else if(label.toLowerCase() === 'password'){
      acc[input] = Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/[0-9]/, 'Password must contain a number')
        .matches(/[a-zA-Z]/, 'Password must contain a letter')
        .required(`${label} is required`)
    }else if(label.toLowerCase() === 'salary'){
      acc[input] = Yup.number()
        .required(`${label} is required`)
        .typeError(`${label} must be a valid number`)
    }else if(label.toLowerCase() === 'dateofjoining'){
      acc[input] = Yup.date()
        .required(`${label} is required`)
        .max(new Date(), `${label} cannot be in the future`)
        .typeError(`${label} must be a valid date`)
    }else if(label.toLowerCase() === 'department'){
      acc[input] = Yup.string()
        .oneOf(departments?.map(dept => dept._id) || [], 'Invalid department selected')
        .required(`${label} is required`)
    }else{
      acc[input] = Yup.string().required(`${label} is required`)
    }

    return acc
  }, {} as Record<string, Yup.StringSchema | Yup.NumberSchema | Yup.DateSchema>)
}

export const generateInitialValues =(
  inputsWithLabel: InputAndLabels[],
  existingValues: AddEmployee | Department | null,
  type: 'Employee' | 'Department',
  departments: Department[] | null
) => {
  return inputsWithLabel.reduce((acc, curr) => {
    const label = curr.label.toLowerCase()

    if(type === 'Employee'){
      if (label === 'department') {
        acc[curr.input] =
          (existingValues as AddEmployee)?.department?._id ||
          (departments && departments.length > 0 ? departments[0]._id : '') ||
          ''
      }else if(label === 'dateofjoining'){
        acc[curr.input] =
          (existingValues as AddEmployee)?.dateOfJoining
            ? new Date((existingValues as AddEmployee).dateOfJoining).toISOString().split('T')[0]
            : new Date().toISOString().split('T')[0]
      }else if(label === 'salary'){
        acc[curr.input] = (existingValues as AddEmployee)?.salary
          ? String((existingValues as AddEmployee).salary)
          : '0'
      }else{
        const value = (existingValues as AddEmployee)?.[curr.input as keyof AddEmployee]
        acc[curr.input] = value
          ? typeof value === 'object'
            ? value instanceof Date
              ? value.toISOString().split('T')[0]
              : JSON.stringify(value)
            : String(value)
          : ''
      }
    }else if(type === 'Department') {
      acc[curr.input] = (existingValues as Department)?.[curr.input as keyof Department] || ''
    }else{
      acc[curr.input] = ''
    }

    return acc
  }, {} as Record<string, string>)
}
