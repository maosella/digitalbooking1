import "@testing-library/jest-dom"
import Categories from "../components/categories/Categories"
import { render } from '@testing-library/react'

let component;
beforeEach(() => {
    component =
        render(
            <Categories />
        )

})
describe("categories basic tests", () => {

    test('should render the component', () => {
        expect(component.container).toBeInTheDocument()
    })

})