import "@testing-library/jest-dom"
import Body from "../components/layout/Body"
import { render } from '@testing-library/react'

let component;
beforeEach(() => {
    component =
        render(
            <Body />
        )

}) 
describe("body basic tests", () => {

    test('should render the component', () => {
        expect(component.container).toBeInTheDocument()
    })

})