function getMaxBirthDate() {
    const date = new Date()
    date.setFullYear(date.getFullYear() - 5)
    return date.toISOString().split("T")[0]
}

export default getMaxBirthDate