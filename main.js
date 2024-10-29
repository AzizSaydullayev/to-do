let body = document.querySelector('.bg-info');
body.classList.add(localStorage.getItem('color') || 'bg-info');

let dark = document.querySelector('.btn-dark');
let light = document.querySelector('.light');

// Событие для кнопки "Темный режим"
dark.addEventListener('click', () => {
    body.classList.remove('bg-info');
    body.classList.add('bg-dark');
    localStorage.setItem('color', 'bg-dark');
});

// Событие для кнопки "Светлый режим"
light.addEventListener('click', () => {
    body.classList.remove('bg-dark');
    body.classList.add('bg-info');
    localStorage.setItem('color', 'bg-info');
});

let lists = document.querySelector(".lists");
let count = 0;
let arr = JSON.parse(localStorage.getItem("todo")) || [];

// Функция для отрисовки списка задач
function render(arr) {
    lists.innerHTML = "";
    arr.forEach((element, index) => {
        count++;
        let tr = document.createElement('tr');
        let th = document.createElement('th');
        let td_first = document.createElement('td');
        let td_second = document.createElement('td');

        // Кнопка "Выполнено"
        let button_1 = document.createElement('button');
        button_1.textContent = 'Done';
        button_1.classList.add('btn', 'p-1', 'me-3', 'btn-success');
        button_1.onclick = () => {
            td_first.classList.add("text-decoration-line-through");
        };

        // Кнопка "Не выполнено"
        let button_2 = document.createElement('button');
        button_2.textContent = 'Undone';
        button_2.classList.add('btn', 'p-1', 'me-3', 'btn-warning');
        button_2.onclick = () => {
            td_first.classList.remove("text-decoration-line-through");
        };

        // Кнопка "Удалить"
        let button_3 = document.createElement('button');
        button_3.textContent = 'Delete';
        button_3.classList.add('btn', 'p-1', 'me-3', 'btn-danger');
        button_3.onclick = () => {
            arr.splice(index, 1);
            localStorage.setItem("todo", JSON.stringify(arr));
            count = 0;
            render(arr);
        };

        th.scope = 'row';
        th.textContent = count;
        td_first.textContent = element;
        td_second.append(button_1, button_2, button_3);
        tr.append(th, td_first, td_second);
        lists.append(tr);
    });
}

render(arr);

const addTodo = document.querySelector(".add-todo");
const input = document.querySelector(".task-input");

addTodo.addEventListener("click", () => {
    if (input.value) {
        arr.push(input.value);
        count = 0;
        render(arr);
        localStorage.setItem("todo", JSON.stringify(arr));
    } else {
        alert("Input ichini toldiring");
    }
    input.value = "";
});
