import "@testing-library/jest-dom"
import ClientData from "../components/booking/reservationForm/clientData/ClientData"
import { render } from '@testing-library/react'

let component;
beforeEach(() => {
    component =
        render(
            <ClientData />
        )

})
describe("ClientData   basic tests", () => {

    test('should render the component', () => {
        expect(component.container).toBeInTheDocument()
    })

})