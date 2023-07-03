import constants from 'constant'
const { CHANGELOG } = constants

export const getChangelog = async (locale) => {
    let changelogText, changelogMatchValue
    try {
        const changelogUrl = `${CHANGELOG.BASE_URL}/CHANGELOG_${locale}.md`
        changelogText = await fetch(changelogUrl, { cache: 'no-cache' }).then((r) => r.text())
        changelogMatchValue = changelogText.substring(0, 35)
    } catch (e) {
        console.log(e)
    }
    return {
        changelogText,
        changelogMatchValue
    }
}

export const getCachedChangelogMatchValue = () => {
    return localStorage.getItem(CHANGELOG.CACHE)
}

export const setChangelogMatchValue = (value) => {
    localStorage.setItem(CHANGELOG.CACHE, value.substring(0, 35))
}