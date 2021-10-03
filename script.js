const container = document.querySelector('.container')
const items = document.querySelectorAll('.item')
let currentElement = null

// добавляем атрибут draggable для элементов, чтобы сделать их перемещаемыми
for (const item of items) {
    item.draggable = true
}

// добавляем реакцию на начало и конец перетаскивания, а также на сам процесс перетаскивания
// перемещаемый элемент скрываем именно на событии drag, т.к. если мы скроем его на событии dragstart, когда перемещение только началось, то не увидим полупрозрачную фантомную копию
container.addEventListener('dragstart', dragstart)
container.addEventListener('drag', drag)
container.addEventListener('dragend', dragend)

function dragstart(event) {
    if (!event.target.hasAttribute('draggable')) return // нам нужен только item
    currentElement = event.target // сохраняем перемещаемый объект в переменную
}

function drag(event) {
    if (!event.target.hasAttribute('draggable')) return
    event.target.classList.add('hide')
}

function dragend(event) {
    if (!event.target.hasAttribute('draggable')) return
    event.target.classList.remove('hide')
}

// реализуем логику перетаскивания
container.addEventListener('dragover', dragover)
container.addEventListener('dragenter', dragenter)
container.addEventListener('dragleave', dragleave)
container.addEventListener('drop', drop)

function dragover(event) {
    if (!event.target.classList.contains('placeholder')) return  // нам нужен только placeholder

    // по умолчанию большинство областей на странице недоступны для сброса, отменяем это поведение — делаем placeholder доступным для сброса
    event.preventDefault()
}

function dragenter(event) {
    if (!event.target.classList.contains('placeholder')) return
    event.target.classList.add('hovered')
}

function dragleave(event) {
    if (!event.target.classList.contains('placeholder')) return
    event.target.classList.remove('hovered')
}

function drop(event) {
    if (!event.target.classList.contains('placeholder')) return
    event.target.classList.remove('hovered')
    event.target.append(currentElement)
}