import "@testing-library/jest-dom"
import AvailableDates from "../components/product/availableDates/AvailableDates"
import { render } from '@testing-library/react'

let component;
beforeEach(() => {
    component =
        render(
            <AvailableDates />
        )

}) 
describe("available dates  basic tests", () => {

    test('should render the component', () => {
        expect(component.container).toBeInTheDocument()
    })

})