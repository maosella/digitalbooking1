import "@testing-library/jest-dom"
import PublicationItem from "../components/publications/PublicationItem"
import { render } from '@testing-library/react'

let component;
beforeEach(() => {
    component =
        render(
            <PublicationItem />
        )

})
describe("publications basic tests", () => {

    test('should render the component', () => {
        expect(component.container).toBeInTheDocument()
    })

})