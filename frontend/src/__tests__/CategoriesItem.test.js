import "@testing-library/jest-dom"
import CategoriesItem from "../components/categories/CategoriesItem"
import { render } from '@testing-library/react'

let component;
beforeEach(() => {
    component =
        render(
            <CategoriesItem />
        )

})
describe("categories basic tests", () => {

    test('should render the component', () => {
        expect(component.container).toBeInTheDocument()
    })

})