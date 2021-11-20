import {screen, render} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import LoginComponent from "../components/LoginComponent";
import axios from 'axios';

jest.mock('axios');

describe("Longin Component",()=>{
   
    test("renders Invalid Credentials when invalid credentials entered",async ()=>{
        axios.get.mockResolvedValue({ data: {
                    "email":"axz",
                    "password":"avx",
                    "role":"admin"
                }});
        render(<LoginComponent/>)
        userEvent.type(screen.getByLabelText("Username:"),'User')
        userEvent.type(screen.getByLabelText("Password:"),"User")
        userEvent.click(screen.getByText("Login"))
        const outputEle=await screen.findByText('Invalid Credentials !!')
        expect(outputEle).toBeInTheDocument();


    });
    test("renders Username/Password cannot be blank when credentials not entered",async ()=>{
        render(<LoginComponent/>)
        userEvent.type(screen.getByLabelText("Username:"),'')
        userEvent.type(screen.getByLabelText("Password:"),'')
        userEvent.click(screen.getByText("Login"))
        const outputEle=await screen.findByText('Username/Password cannot be blank!!')
        expect(outputEle).toBeInTheDocument();


    });
});