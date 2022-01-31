const eventContainer = document.querySelector(".event-data-container");

const GetEvents = () => {
    fetch('http://localhost:3000/events')
        .then((response) => response.json())
        .then(data => {
            data.forEach(element => {
                const eventItem = document.createElement("div");
                eventItem.classList.add("event-data-item");

                const eventItemInputs = document.createElement("div");
                eventItemInputs.classList.add("event-data__left-side");

                const nameInput = document.createElement("input");
                nameInput.setAttribute('type', 'text');
                nameInput.setAttribute('id', 'name');
                nameInput.setAttribute('name', 'name');
                nameInput.setAttribute('value', element.eventName);

                const startInput = document.createElement("input");
                startInput.setAttribute('type', 'date');
                startInput.setAttribute('id', 'start');
                startInput.setAttribute('name', 'start');
                const start = new Date();
                start.setTime(element.startDate);
                let startDate = start.toISOString().substring(0, 10);
                startInput.setAttribute('value', startDate);

                const endInput = document.createElement("input");
                endInput.setAttribute('type', 'date');
                endInput.setAttribute('id', 'end');
                endInput.setAttribute('name', 'end');
                const end = new Date();
                end.setTime(element.endDate);
                let endDate = end.toISOString().substring(0, 10);
                endInput.setAttribute('value', endDate);

                eventItemInputs.appendChild(nameInput);
                eventItemInputs.appendChild(startInput);
                eventItemInputs.appendChild(endInput);

                const eventItemButtons = document.createElement("div");
                eventItemButtons.classList.add("event-data__right-side");

                const editSaveBtn = document.createElement("button");
                editSaveBtn.classList.add("event-data__right-side__edit-save-btn");
                editSaveBtn.textContent = "EDIT";

                const deleteCloseBtn = document.createElement("button");
                deleteCloseBtn.classList.add("event-data__right-side__delete-close-btn");
                deleteCloseBtn.textContent = "DELETE";
                
                //Delete Feature
                deleteCloseBtn.addEventListener('click', () => {
                    fetch(`http://localhost:3000/events/${element.id}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                    })
                        .then((response) => response.json())
                        .then((json) => console.log(json));
                });

                eventItemButtons.appendChild(editSaveBtn);
                eventItemButtons.appendChild(deleteCloseBtn);

                eventItem.appendChild(eventItemInputs);
                eventItem.appendChild(eventItemButtons);

                eventContainer.appendChild(eventItem);
            })
        })
}

//Add feature
const addEventButton = document.querySelector(".add-btn__button");
addEventButton.addEventListener('click', () => {
    const eventItem = document.createElement("div");
    eventItem.classList.add("event-data-item");

    const eventItemInputs = document.createElement("div");
    eventItemInputs.classList.add("event-data__left-side");

    const nameInput = document.createElement("input");
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('id', 'name');
    nameInput.setAttribute('name', 'name');

    const startInput = document.createElement("input");
    startInput.setAttribute('type', 'date');
    startInput.setAttribute('id', 'start');
    startInput.setAttribute('name', 'start');

    const endInput = document.createElement("input");
    endInput.setAttribute('type', 'date');
    endInput.setAttribute('id', 'end');
    endInput.setAttribute('name', 'end');

    eventItemInputs.appendChild(nameInput);
    eventItemInputs.appendChild(startInput);
    eventItemInputs.appendChild(endInput);

    const eventItemButtons = document.createElement("div");
    eventItemButtons.classList.add("event-data__right-side");

    const editSaveBtn = document.createElement("button");
    editSaveBtn.classList.add("event-data__right-side__edit-save-btn");
    editSaveBtn.textContent = "SAVE";

    const deleteCloseBtn = document.createElement("button");
    deleteCloseBtn.classList.add("event-data__right-side__delete-close-btn");
    deleteCloseBtn.textContent = "CLOSE";

    eventItemButtons.appendChild(editSaveBtn);
    eventItemButtons.appendChild(deleteCloseBtn);

    eventItem.appendChild(eventItemInputs);
    eventItem.appendChild(eventItemButtons);

    eventContainer.appendChild(eventItem);

    editSaveBtn.addEventListener('click', () => {
        if (nameInput.value === "" || startInput.value === "" || endInput.value === "") {
            console.log("no input");
            return;
        }
        let start = new Date(startInput.value);
        let end = new Date(endInput.value);
        fetch("http://localhost:3000/events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                eventName: nameInput.value,
                startDate: start.getTime().toString(),
                endDate: end.getTime().toString(),
            }),
        })
            .then((response) => response.json())
            .then((json) => console.log(json));
    });

    deleteCloseBtn.addEventListener('click', (event) => {
        console.log(event.target);
        let node = deleteCloseBtn;
        node.parentNode.parentNode.parentNode.removeChild(node.parentNode.parentNode);
    })
})

GetEvents();