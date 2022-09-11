import "@testing-library/jest-dom"
import Publications from "../components/publications/Publications"
import { render } from '@testing-library/react'

let component;
beforeEach(() => {
    component =
        render(
            <Publications />
        )

})
describe("publications basic tests", () => {

    test('should render the component', () => {
        expect(component.container).toBeInTheDocument()
    })

})