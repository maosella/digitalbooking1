import "@testing-library/jest-dom"
import CustomCarousel from "../components/product/carousel/CustomCarousel"
import { render } from '@testing-library/react'

let component;
beforeEach(() => {
    component =
        render(
            <CustomCarousel />
        )

}) 
describe("custom carousel  basic tests", () => {

    test('should render the component', () => {
        expect(component.container).toBeInTheDocument()
    })

})