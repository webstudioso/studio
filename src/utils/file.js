export const fileToBase64 = async (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result.replace('data:', '').replace(/^.+,/, ''))
        reader.onerror = reject
    })
}