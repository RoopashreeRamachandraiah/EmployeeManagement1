import { screen, render } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import axios from "axios"
import ListEmployeesComponent from "../components/ListEmployeesComponent"

jest.mock('axios')
describe('ListEmployee Component', () => {
    test('renders list of employees', async () => {
        axios.get.mockResolvedValue({
            data: [{
                "id": "1",
                "firstName": "avx",
                "lastName": "admin",
                "email": "abc@xyz.com"
            }]
        });
        render(<ListEmployeesComponent />)
        const outputEle = screen.getByText('Employees List', { exact: true })
        expect(outputEle).toBeInTheDocument();


    })
},
    test('renders add employee,update/view details&delete button', async () => {
        axios.get.mockResolvedValue({
            data: [{
                "id": "1",
                "firstName": "avx",
                "lastName": "admin",
                "email": "abc@xyz.com"
            }]
        });
        render(<ListEmployeesComponent />)
        const outputAddEmployee = screen.getByText('Add Employee', { exact: true })
        const outputUpdateEmployee = await screen.findByText('Update/View details', { exact: true })
        const outputDeleteEmployee = await screen.findByText('Delete', { exact: true })
        expect(outputAddEmployee).toBeInTheDocument();
        expect(outputUpdateEmployee).toBeInTheDocument();
        expect(outputDeleteEmployee).toBeInTheDocument();


    }))