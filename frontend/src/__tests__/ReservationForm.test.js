import "@testing-library/jest-dom"
import ReservationForm from "../components/booking/reservationForm/ReservationForm"
import { render } from '@testing-library/react'

let component;
beforeEach(() => {
    component =
        render(
            <ReservationForm />
        )

})
describe("Reservation form   basic tests", () => {

    test('should render the component', () => {
        expect(component.container).toBeInTheDocument()
    })

})