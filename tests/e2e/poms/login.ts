import { expect, Page } from "@playwright/test";

export default class AdminLogin {
    constructor(
        private page : Page
    ){}

    adminLogin = async()=>{
        const email = this.page.getByTestId('input-Email')
        const password = this.page.getByTestId('input-Password')
        const errorEmail = this.page.getByTestId('error-Email')
        const errorPassword = this.page.getByTestId('error-Password')
        
        await email.fill("devanps")
        await password.click()
        await expect(errorEmail).toBeVisible()
        
        await password.fill("123")
        await email.click()
        await expect(errorPassword).toBeVisible()

        await email.fill("")
        await password.fill("")
        await this.page.getByTestId('submit-button').click()
        await expect(errorPassword).toBeVisible()
        await expect(errorEmail).toBeVisible()

        await password.fill("sample123")
        await email.fill("devan12@gmail.com")
        await this.page.getByTestId('submit-button').click()
    }
}