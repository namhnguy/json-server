const GetEvents = () => {
    const eventContainer = document.querySelector(".event-data-container");
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
                let startDate = start.toISOString().substring(0,10);
                startInput.setAttribute('value', startDate);

                const endInput = document.createElement("input");
                endInput.setAttribute('type', 'date');
                endInput.setAttribute('id', 'end');
                endInput.setAttribute('name', 'end');
                const end = new Date();
                end.setTime(element.endDate);
                let endDate = end.toISOString().substring(0,10);
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

                eventItemButtons.appendChild(editSaveBtn);
                eventItemButtons.appendChild(deleteCloseBtn);

                eventItem.appendChild(eventItemInputs);
                eventItem.appendChild(eventItemButtons);

                eventContainer.appendChild(eventItem);
            })
        })
}

GetEvents();