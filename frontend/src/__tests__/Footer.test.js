import "@testing-library/jest-dom"
import Footer from "../components/layout/Footer"
import { render } from '@testing-library/react'

let component;
beforeEach(() => {
    component =
        render(
            <Footer />
        )

}) 
describe("footer basic tests", () => {

    test('should render the component', () => {
        expect(component.container).toBeInTheDocument()
    })

    test("renders the four social networks", () => {
        const socialIcons = component.container.querySelectorAll("li");
        expect(socialIcons.length).toBe(4)
    })
})