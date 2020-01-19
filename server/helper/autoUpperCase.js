module.exports = (firstName, lastName) =>{
    const firstNameSplit = firstName.split(' ')
    const lastNameSplit = lastName.split(' ')

    let upperCaseFirstName = ''
    firstNameSplit.forEach(element => {
        upperCaseFirstName += element.charAt(0).toUpperCase() + element.slice(1) + ' '
    });

    let upperCaseLastName = ''
    lastNameSplit.forEach(element => {
        upperCaseLastName += element.charAt(0).toUpperCase() + element.slice(1) + ' '
    });

    return `${upperCaseFirstName}${upperCaseLastName}`.replace(/\s+/g,' ').trim()
}