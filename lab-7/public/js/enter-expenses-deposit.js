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

function handleFormSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('expenses_input');

    var e = document.getElementById("category_expenses-select");
    var text = e.options[e.selectedIndex].text;

    const data = {
        value: name.value,
        category: text
    }

    postData('http://localhost:8000/enter', data)
            .then(data => {
                console.log(data);
                applicantForm.reset();
            }).catch(() => {
                
            }).finally(() => {
                applicantForm.reset();
            });
}
  
const applicantForm = document.getElementById('expenses')
applicantForm.addEventListener('submit', handleFormSubmit)