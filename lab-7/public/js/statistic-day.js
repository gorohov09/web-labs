//Табы
const tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParent = document.querySelector('.tabheader');

//Скрытие табов
function hideTabContent() {
    tabsContent.forEach(item => {
        item.classList.remove('show', 'fade');
        item.classList.add('hide');
    });

    tabs.forEach(item => {
        item.classList.remove('tabheader__item_active');
    });
}

//Показать определенный таб(i - индекс)
function showTabContent(i = 0) {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
}

hideTabContent();
showTabContent();

tabsParent.addEventListener('click', (event) => {
    console.log('Click');
    const target = event.target; //Получаем объект, по которому кликнули мышкой

    if (target && target.classList.contains('.tabheader__item'.slice(1))){ //Проверяем, что кликнули по табу
        tabs.forEach((item, i) => { //Перебираем все табы
            if (target == item){ //Если таб совпал с тем, по которому кликнули
                hideTabContent();
                showTabContent(i);
            }
        });
    }
});