import "@testing-library/jest-dom"
import Header from "../components/layout/Header"
import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from '../context/UserContext';
import { act } from 'react-dom/test-utils';


let component;
beforeEach(() => {
    component =
        render(
            <UserProvider>
                <BrowserRouter>
                    <Header />
                </BrowserRouter>
            </UserProvider>
        )
})

describe("header basic tests", () => {
    test('should render the component', () => {
        expect(component.container).toBeInTheDocument()
    })
    test('should render slogan', () => {
        expect(screen.getByText('Sentite como en tu hogar'))
    })
})
describe("session buttons tests", () => {
    test('should fire onClick event in login button', () => {
        const button = screen.getByText("Iniciar sesión")
        act(() => {
            fireEvent.click(button)
        }) 
        expect(component.container).not.toHaveTextContent("Iniciar sesión")
        expect(component.container).toHaveTextContent("Crear cuenta")
    })
})
describe("hamburger menu tests", () => {
    test('should set drawer open', () => {
        const menu = component.container.querySelector("svg")
            fireEvent.click(menu)
        expect(component.container).toHaveTextContent("MENÚ")

    })

})
