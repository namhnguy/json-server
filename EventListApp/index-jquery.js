const GetEvents = () => {
    $.ajax({
        url: 'http://localhost:3000/events',
        type: 'GET',
        success: function (results) {
            $('.event-data-container').empty();
            results.forEach(result => {
                $('.event-data-container').append(`<div class="event-data-item">
                    <div class="event-data__left-side">
                        <input type='text' id='name-${result.id}' name='name' disabled value=${result.eventName}>
                        <input type='date' id='start-${result.id}' name='start' disabled>
                        <input type='date' id='end-${result.id}' name='end' disabled>
                    </div>
                    <div class="event-data__right-side">
                        <button class="event-data__right-side__edit-save-btn-${result.id}" style="display:none;">OK</button>
                        <button class="event-data__right-side__edit-save-btn-${result.id}">EDIT</button>
                        <button class="event-data__right-side__delete-close-btn-${result.id}">DELETE</button>
                    </div>
                </div>`);

                const start = new Date();
                start.setTime(result.startDate);
                const end = new Date();
                end.setTime(result.endDate);
                const startDate = start.toISOString().substring(0, 10);
                const endDate = end.toISOString().substring(0, 10);
                $(`#start-${result.id}`).val(startDate);
                $(`#end-${result.id}`).val(endDate);

            });
        }
    });
};

$(".event-data-container").on('click', (event) => {
    if (event.target.innerHTML === 'DELETE') {
        let id = parseInt($(event.target).attr('class').substring(41, 42));
        $(event.target).parent().parent().remove();
        $.ajax({
            url: `http://localhost:3000/events/${id}`,
            type: 'DELETE',
            contentType: 'application/json',
        });
    }

    if (event.target.innerHTML === 'EDIT') {
        let id = parseInt($(event.target).attr('class').substring(38, 39));
        $(`#name-${id}`).removeAttr('disabled');
        $(`#start-${id}`).removeAttr('disabled');
        $(`#end-${id}`).removeAttr('disabled');
        $(`.event-data__right-side__edit-save-btn-${id}`).css('display', 'block');
    }

    if (event.target.innerHTML === 'OK') {
        let id = parseInt($(event.target).attr('class').substring(38, 39));
        if ($(`#name-${id}`).val() === '' || $(`#start-${id}`).val() === '' || $(`#end-${id}`).val() === '') {
            return;
        }
        let start = new Date($(`#start-${id}`).val());
        let end = new Date($(`#end-${id}`).val());
        $.ajax({
            url: `http://localhost:3000/events/${id}`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({
                eventName: $(`#name-${id}`).val(),
                startDate: start.getTime().toString(),
                endDate: end.getTime().toString(),
            }),
            success: () => { GetEvents(); }
        });
    }

    if (event.target.innerHTML === 'SAVE') {
        if ($('#name').val() === '' || $('#start').val() === '' || $('#end').val() === '') {
            return;
        }
        let start = new Date($('#start').val());
        let end = new Date($('#end').val());
        $.ajax({
            url: 'http://localhost:3000/events',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                eventName: $('#name').val(),
                startDate: start.getTime().toString(),
                endDate: end.getTime().toString(),
            }),
            success: () => { GetEvents(); }
        });
    }

    if (event.target.innerHTML === 'CLOSE') {
        $(event.target).parent().parent().remove();
    }

});

$(".add-btn__button").on('click', () => {
    $('.event-data-container').append(
        `<div class="event-data-item">
            <div class="event-data__left-side">
                <input type='text' id='name' name='name'>
                <input type='date' id='start' name='start'>
                <input type='date' id='end' name='end'>
            </div>
            <div class="event-data__right-side">
                <button class="event-data__right-side__edit-save-btn">SAVE</button>
                <button class="event-data__right-side__delete-close-btn">CLOSE</button>
            </div>
        </div>`
    );

});

GetEvents();