import { test as base, Page } from '@playwright/test';
import AdminLogin from '../poms/login';
import EntityForm from '../poms/forms';

type TestFixtures = {
  page: Page
  login: AdminLogin
  entityForm: EntityForm
}

const test = base.extend<TestFixtures>({
  entityForm: async ({ page }, use) => {
    const form = new EntityForm(page)
    await use(form)
  },
  login: async ({ page }, use) => {
    const login = new AdminLogin(page)
    await use(login)
  }
})

export { test }
