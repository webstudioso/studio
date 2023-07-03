import React from "react"
import {render, screen} from '@testing-library/react'
import { unmountComponentAtNode } from "react-dom"
import { act } from "react-dom/test-utils"

import Changelog from "./index"

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