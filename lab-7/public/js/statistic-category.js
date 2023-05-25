const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    return await res.json();
};

//Получение данных для категорий
function createList(data) {
    data = data.statistics_category;

    var list = document.createElement("ol");

    data.forEach(el => {
        var newItem = document.createElement("li");
        var newText = document.createTextNode(`${el.type}`);

        var mi = document.createElement("input");
        mi.setAttribute('type', 'text');
        mi.setAttribute('value', `${el.value}`);
        mi.addEventListener("change", (e) => {
            console.log('Изменение значения');
            const data = {
                id: el.id,
                newValue: e.target.value
            };

            console.log(data);

            postData('http://localhost:8000/putExpense', data)
            .then(data => {
                console.log(data);
            }).catch(() => {
                
            }).finally(() => {
            });

        })

        var a = document.createElement('a');
        var linkText = document.createTextNode("Удалить");
        a.appendChild(linkText);

        a.addEventListener("click", function(e){
            console.log('Клик по ссылке');
            const data = {
                id: el.id
            };

            console.log(data);

            postData('http://localhost:8000/deleteExpense', data)
            .then(data => {
                console.log(data);
            }).catch(() => {
                
            }).finally(() => {
            });

        },false);

        newItem.appendChild(newText);
        newItem.appendChild(mi);
        newItem.appendChild(a);
        list.appendChild(newItem);
    });

    const block = document.querySelector('.statistic-category-container-block'); 
    block.appendChild(list)
}

function fetchData(){
    fetch("http://localhost:8000/category")
        .then(res => res.json())
        .then(data => createList(data))
}

fetchData();
