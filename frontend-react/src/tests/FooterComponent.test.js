import {render,screen} from '@testing-library/react'
import FooterComponent from "../components/FooterComponent"

test("render footer with text",()=>{
    //Arrange
    render(<FooterComponent/>)
    //Action

    //Assert
    const footerMessage=screen.getByText("UEL Employee Management");
    expect(footerMessage).toBeInTheDocument();
}
)