import { expect, Page } from "@playwright/test";
import {EDIT_EMPLOYEE_DATA, EXPECTED_ERROR_TEST_IDS, VALID_EMPLOYEE_DATA} from '../constants/texts/employee'
import { EDIT_DEPARTMENT_DATA, VALID_DEPARTMENT_DATA } from "../constants/texts/department";

type Entity = "department" | "employee"

export default class EntityForm{
    constructor(
        private page: Page
    ){}
    
    addData = async({
        entityType
    }:{
        entityType: Entity 
    })=>{
        if(entityType === "employee"){
            for(let input in VALID_EMPLOYEE_DATA){
                const value = VALID_EMPLOYEE_DATA[input]
                if(value === "select-department"){
                    await this.page.getByTestId(input).click()
                    await this.page.getByTestId("department-option-6782797df7f23f730aeaf0eb").click()
                }
                await this.page.getByTestId(input).fill(value)
            }
            await this.page.getByTestId('submit-button').click()
            await expect(this.page.getByRole('cell', { name: 'John Doe' })).toBeVisible()
        }else{
            for(let input in VALID_DEPARTMENT_DATA){
                const value = VALID_DEPARTMENT_DATA[input]
                await this.page.getByTestId(input).fill(value)
            }
            await this.page.getByTestId('submit-button').click()
            await expect(this.page.getByRole('cell', { name: 'Cybersecurity Operations' })).toBeVisible()
        }
    }

    editData = async({entityType}: {entityType: Entity})=>{
        await this.page.getByRole('cell', { name: 'Edit Delete' }).last()
            .getByRole('button', { name: 'Edit' })
            .click()
    
        if(entityType === "employee"){
            let counter = 0;
            for(let input in EDIT_EMPLOYEE_DATA){
                const value = EDIT_EMPLOYEE_DATA[input]
                if(counter >= 2) {
                    break;
                }
                if(value === "select-department"){
                    await this.page.getByTestId(input).click()
                    await this.page.getByTestId("department-option-6782797df7f23f730aeaf0eb").click()
                }
                await this.page.getByTestId(input).fill(value)
                counter++
            }
            await this.page.getByTestId('submit-button').click()
            await expect(this.page.getByRole('cell', { name: 'Mary Com' })).toBeVisible()
        }else{
            for(let input in EDIT_DEPARTMENT_DATA){
                const value = EDIT_DEPARTMENT_DATA[input]
                await this.page.getByTestId(input).fill(value)
            }
            await this.page.getByTestId('submit-button').click()
            await expect(this.page.getByRole('cell', { name: 'Data Analytics' })).toBeVisible()
        }
    }

    deletData = async({EntityForm}: {EntityForm: Entity})=>{
        await this.page.getByRole('cell', { name: 'Edit Delete' }).last()
        .getByRole('button', { name: 'Delete' })
        .click()

        await this.page.getByRole('button', { name: 'Confirm' }).click()
        if(EntityForm === "employee"){
            await expect(this.page.getByRole('cell', { name: 'Mary Com' })).not.toBeVisible()   
        }else{
            await expect(this.page.getByRole('cell', { name: 'Data Analytics' })).not.toBeVisible()   
        }
    }

    search = async()=>{
        await this.page.getByPlaceholder('Search by Name').fill("Sam")
        await expect(this.page.getByRole('cell', { name: 'Sample' })).toBeVisible()
    }
    
}