$(document).ready(function () {
    $(window).on('load', function () {
        $('#published').empty();
        setContent('#published')
        $(`published-badge`).text(Math.round(Math.random() * 20));
        $('#draft').empty();
        setContent('#draft')
        $(`draft-badge`).text(Math.round(Math.random() * 20));
    });

    $(document).on('click', '#published-tab', function (event) {
        event.preventDefault()
        $('#published').empty();
        setContent('#published')
    });

    $(document).on('click', '#draft-tab', function (event) {
        event.preventDefault()
        $('#draft').empty();
        setContent('#draft')
    });

    function setContent(target) {
        for (let i = 0; i < Math.random() * 200; i++) {
            $(`${target}`).append(`
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                Veniam illo quae quasi nisi voluptas expedita quisquam, ea voluptates labore error, 
                explicabo exercitationem hic itaque enim aliquid tempore ab tenetur praesentium?</p>
            `);
        }
    }
});