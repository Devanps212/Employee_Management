import { expect, Page } from '@playwright/test';
import { test } from '../fixtures/index';
import AdminLogin from '../poms/login';
import EntityForm from '../poms/forms';

test.describe('Admin Login and Employee Management Suite', () => {
  test('should login, add, edit, and delete employee and department', async ({
    page,
    login,
    entityForm,
  }: {
    page: Page;
    login: AdminLogin;
    entityForm: EntityForm;
  }) => {
    // Step 1: Login as Admin and Navigate to Employee Management page
    await page.goto('/')
    await login.adminLogin()

    // Step 2: Navigate to Employee Management page and Add Employee
    await page.getByRole('button', { name: 'Add Employee' }).click()
    await entityForm.addData({ entityType: 'employee' })

    // Step 3: Edit Employee
    await entityForm.editData({ entityType: 'employee' })

    // Step 4: Delete Employee and search
    await entityForm.deletData({ EntityForm: 'employee' })
    await entityForm.search()

    // Step 5: Navigate to Department Management page and Add Department
    await page.getByTestId('department-management-link').click()
    await page.getByRole('button', { name: 'Add Department' }).click()
    await entityForm.addData({ entityType: 'department' })

    // Step 6: Edit Department
    await entityForm.editData({ entityType: 'department' })

    // Step 7: Delete Department
    await entityForm.deletData({ EntityForm: 'department' })
  })
})
