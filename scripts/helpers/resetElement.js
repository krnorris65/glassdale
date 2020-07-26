export const resetOtherDropdowns = (currentDropdownId) => {
    // resets any other dropdown values other than the drop down that is currently filtering
    const allDropdowns = document.querySelectorAll('.dropdown')
    allDropdowns.forEach(dropdown => {
        if(dropdown.id !== currentDropdownId)
        dropdown.value = 0
    })

}