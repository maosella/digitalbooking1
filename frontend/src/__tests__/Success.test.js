import "@testing-library/jest-dom"
import Success from "../components/success/Success"
import { render } from '@testing-library/react'

let component;
beforeEach(() => {
    component =
        render(
            <Success />
        )

})
describe("Success   basic tests", () => {

    test('should render the component', () => {
        expect(component.container).toBeInTheDocument()
    })

})