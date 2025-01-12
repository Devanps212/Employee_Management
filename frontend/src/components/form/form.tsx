import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Department, InputAndLabels } from '../../types';
import { AddEmployee, TableData } from '../../types/form';

const DynamicForm = ({
  departments,
  inputsWithLabel,
  onSubmit,
  existingValues,
  type
}: {
  departments?: Department[] | null
  inputsWithLabel: InputAndLabels[]
  onSubmit: (values: Record<string, string>, helpers: { resetForm: () => void }) => void
  existingValues?: AddEmployee | Department
  type?: TableData
}) => {
  const validationSchema = inputsWithLabel.reduce((acc, curr) => {
    const { input, label } = curr

    if (label.toLowerCase() === 'email') {
      acc[input] = Yup.string().email('Invalid email format').required(`${label} is required`)
    } else if (label.toLowerCase() === 'password') {
      acc[input] = Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/[0-9]/, 'Password must contain a number')
        .matches(/[a-zA-Z]/, 'Password must contain a letter')
        .required(`${label} is required`)
    } else if (label.toLowerCase() === 'salary') {
      acc[input] = Yup.number()
        .required(`${label} is required`)
        .typeError(`${label} must be a valid number`)
    } else if (label.toLowerCase() === 'dateofjoining') {
      acc[input] = Yup.date()
        .required(`${label} is required`)
        .max(new Date(), `${label} cannot be in the future`)
        .typeError(`${label} must be a valid date`)
    } else if (label.toLowerCase() === 'department') {
      acc[input] = Yup.string()
        .oneOf(departments?.map(dept => dept._id) || [], 'Invalid department selected')
        .required(`${label} is required`)
    } else {
      acc[input] = Yup.string().required(`${label} is required`)
    }

    return acc
  }, {} as Record<string, Yup.StringSchema | Yup.NumberSchema | Yup.DateSchema>)

  const initialValues = inputsWithLabel.reduce((acc, curr) => {
    const label = curr.label.toLowerCase()

    if (type === 'Employee') {
      if (label === 'department') {
        acc[curr.input] =
          (existingValues as AddEmployee)?.department?._id ||
          (departments && departments.length > 0 ? departments[0]._id : '') ||
          ''
      } else if (label === 'dateofjoining') {
        acc[curr.input] =
          (existingValues as AddEmployee)?.dateOfJoining
            ? new Date((existingValues as AddEmployee).dateOfJoining).toISOString().split('T')[0]
            : new Date().toISOString().split('T')[0]
      } else if (label === 'salary') {
        acc[curr.input] = (existingValues as AddEmployee)?.salary
          ? String((existingValues as AddEmployee).salary)
          : '0'
      } else {
        const value = (existingValues as AddEmployee)?.[curr.input as keyof AddEmployee]
        acc[curr.input] = value
          ? typeof value === 'object'
            ? value instanceof Date
              ? value.toISOString().split('T')[0] 
              : JSON.stringify(value)
            : String(value)
          : ''
      }
    } else if (type === 'Department') {
      acc[curr.input] = (existingValues as Department)?.[curr.input as keyof Department] || ''
    } else {
      acc[curr.input] = ""
    }

    return acc
  }, {} as Record<string, string>)

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object(validationSchema)}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <FormikForm className="space-y-4">
          {inputsWithLabel.map((inputWithLabel, index) => (
            <div key={index} className="flex flex-col space-y-2">
              <label
                htmlFor={inputWithLabel.input}
                className="text-sm font-medium text-gray-700"
              >
                {inputWithLabel.label}
              </label>
              {inputWithLabel.label.toLowerCase() === 'department' ? (
                <Field
                  as="select"
                  id={inputWithLabel.input}
                  name={inputWithLabel.input}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select Department</option>
                  {departments?.map(department => (
                    <option
                      key={department._id}
                      value={department._id}
                      defaultValue={existingValues?._id}
                    >
                      {department.name}
                    </option>
                  ))}
                </Field>
              ) : (
                <Field
                  type={
                    inputWithLabel.label.toLowerCase() === 'email'
                      ? 'email'
                      : inputWithLabel.label.toLowerCase() === 'password'
                      ? 'password'
                      : inputWithLabel.label.toLowerCase() === 'number'
                      ? 'number'
                      : inputWithLabel.label.toLowerCase() === 'dateofjoining'
                      ? 'date'
                      : 'text'
                  }
                  id={inputWithLabel.input}
                  name={inputWithLabel.input}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder={`Enter ${inputWithLabel.label}`}
                />
              )}
              <ErrorMessage
                name={inputWithLabel.input}
                component="div"
                className="text-red-500 text-xs"
              />
            </div>
          ))}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 disabled:bg-gray-400"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </FormikForm>
      )}
    </Formik>
  )
}

export default DynamicForm


