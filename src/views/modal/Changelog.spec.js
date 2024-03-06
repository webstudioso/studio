import React from "react"
import { render, act } from '@testing-library/react'
import { unmountComponentAtNode } from "react-dom"

import Changelog from "./Changelog"

let container = null
const intl = {
    formatMessage: jest.fn()
}

beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div")
    document.body.appendChild(container)
})

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container)
    container.remove()
    container = null
})

it("Renders", () => {
    act(() => {
        render(<Changelog intl={intl} />, container)
    })
    expect(container.childNodes).toBeDefined()
})