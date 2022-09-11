import "@testing-library/jest-dom"
import CheckIn from "../components/booking/reservationForm/checkIn/CheckIn"
import { render } from '@testing-library/react'

let component;
beforeEach(() => {
    component =
        render(
            <CheckIn />
        )

})
describe("CheckIn   basic tests", () => {

    test('should render the component', () => {
        expect(component.container).toBeInTheDocument()
    })

})