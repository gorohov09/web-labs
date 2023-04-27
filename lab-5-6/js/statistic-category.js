//Получение данных для категорий
function createList(data) {
    data = data.statistics_category;

    var list = document.createElement("ol");

    data.forEach(el => {
        var newItem = document.createElement("li");
        var newText = document.createTextNode(`${el.type} ${el.value}`);

        newItem.appendChild(newText);
        list.appendChild(newItem);
    });

    const block = document.querySelector('.statistic-category-container-block'); 
    block.appendChild(list)
}

function fetchData(){
    fetch("../data.json")
        .then(res => res.json())
        .then(data => createList(data))
}

fetchData();
