import "@testing-library/jest-dom"
import Searchbar from "../components/searchbar/Searchbar"
import { render } from '@testing-library/react'

let component;
beforeEach(() => {
    component =
        render(
            <Searchbar />
        )

})
describe("searchbar basic tests", () => {

    test('should render the component', () => {
        expect(component.container).toBeInTheDocument()
    })
    test("should handleDates be a function", () => {
        const mockHandler = jest.fn()
        expect(mockHandler.mock.calls)
      });

})