export const hideOtherListContainers = (currentListContainer) => {
    const allListContainers = document.querySelectorAll('.list')
    allListContainers.forEach(list => {
        if(list !== currentListContainer){
            list.classList.add("hideMe")
        }else{
            list.classList.remove("hideMe")
        }
    })
}