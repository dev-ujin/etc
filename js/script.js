function getData(LS, list) {
    const parsedList = JSON.parse(localStorage.getItem(LS));
    if (parsedList != null) {
        parsedList.forEach(function (ele) {
            list.push(ele);
        })
    }
}