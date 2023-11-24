import constants from 'constant'
const { LINK, LINK_PREFIX } = constants

export const getCurrentClasses = (selectedComponent, options) => {
    const existingClasses = selectedComponent?.getClasses() || []
    const listed = options.map((item) => item.value).filter((val) => val !== null)
    const currentClasses = existingClasses.filter((cls) => listed.includes(cls))
    return currentClasses.length > 0 ? currentClasses[0] : null
}

export const handlePropertyChange = (selectedComponent, options, newProperty) => {
    const currentProperties = getCurrentClasses(selectedComponent, options)
    if (currentProperties) {
        selectedComponent.removeClass(currentProperties)
    }
    if (newProperty) {
        selectedComponent.addClass(newProperty)
    }
}

export const getLinkType = (componentAttributes) => {
    const hrefLink = componentAttributes?.href
    const downloadable = componentAttributes?.download
    if (downloadable ) return LINK.DOCUMENT
    else if (hrefLink?.startsWith(LINK_PREFIX.PHONE)) return LINK.PHONE
    else if (hrefLink?.startsWith(LINK_PREFIX.EMAIL)) return LINK.EMAIL
    else if (hrefLink === LINK_PREFIX.TOP || hrefLink === LINK_PREFIX.BOTTOM) return LINK.PAGE_TOP_BOTTOM
    else if (hrefLink?.startsWith(LINK_PREFIX.SECTION)) return LINK.SECTION
    else if (hrefLink?.startsWith(LINK_PREFIX.PAGE)) return LINK.PAGE
    else if (hrefLink?.startsWith(LINK_PREFIX.WEB)) return LINK.WEB
    else return LINK.NONE
}

export const removeZIndex = (component) => {
    const currentClasses = component.getClasses().filter((cls) => cls.startsWith('z-'))
    if (currentClasses) {
        component.removeClass(currentClasses)
    }
}
export const bringToFront = (editor) => {
    const component = editor.getSelected()
    removeZIndex(component)
    component.addClass(['z-40', 'relative'])
}

export const moveToBack = (editor) => {
    const component = editor.getSelected()
    removeZIndex(component)
    component.addClass(['z-auto', 'relative'])
}