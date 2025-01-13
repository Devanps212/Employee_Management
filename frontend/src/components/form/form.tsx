import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Department, InputAndLabels } from '../../types';
import { AddEmployee, TableData } from '../../types/form';
import { generateValidationSchema, generateInitialValues } from '../../utils/formUtils';

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

  const validationSchema = generateValidationSchema(inputsWithLabel, departments ?? null)
  const initialValues = generateInitialValues(
    inputsWithLabel, 
    existingValues ?? null, 
    type || 'Employee', 
    departments ?? null)

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object(validationSchema)}
      onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <FormikForm className="space-y-4">
          {inputsWithLabel.map((inputWithLabel, index) => (
            <div key={index} className="flex flex-col space-y-2">
              <label
                htmlFor={inputWithLabel.input}
                className="text-sm font-medium text-gray-700"
                data-testid={`label-${inputWithLabel.input}`}>
                {inputWithLabel.label}
              </label>
              {inputWithLabel.label.toLowerCase() === 'department' ? (
                <Field
                  as="select"
                  id={inputWithLabel.input}
                  name={inputWithLabel.input}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  data-testid={`select-${inputWithLabel.input}`}>
                  <option value="">Select Department</option>
                  {departments?.map(department => (
                    <option
                      key={department._id}
                      value={department._id}
                      defaultValue={existingValues?._id}
                      data-testid={`department-option-${department._id}`}>
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
                  data-testid={`input-${inputWithLabel.input}`}/>
              )}
              <ErrorMessage
                name={inputWithLabel.input}
                component="div"
                className="text-red-500 text-xs"
                data-testid={`error-${inputWithLabel.input}`}/>
            </div>
          ))}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 disabled:bg-gray-400"
            data-testid="submit-button">
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </FormikForm>
      )}
    </Formik>
  )
}

export default DynamicForm


