$(document).ready(function() {
    $('.nav-link').click(function() {
        $('.tab-pane').hide();
        $(`.tab-pane#${this.id}-content`).fadeIn();
        $(`.sidebar-link`).parent().removeClass('active');
    })

    $('.sidebar-link').click(function() {
        $('.tab-pane').hide();
        $(`.tab-pane#${this.id}-content`).fadeIn();
        $(`.sidebar-link`).parent().removeClass('active');
        $(`.sidebar-link#${this.id}`).parent().addClass('active');
    })
})