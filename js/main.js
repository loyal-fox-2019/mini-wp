$(document).ready(function () {
    function hideAll() {
        $('.site-pages').hide();
        $('.new-article').hide()
    }
    hideAll()
    $('#btn-menu').click(function (e) {
        e.preventDefault();
        $('.left-sidebar').toggle();
    });
    $('#site-pages').on('click', function (e) {
        e.preventDefault();
        $('.list-active').toggleClass('list-active');
        $('#site-pages').toggleClass('list-active');
    });
    $('#blog-post').on('click', function (e) {
        e.preventDefault();
        $('.list-active').toggleClass('list-active');
        $('#blog-post').toggleClass('list-active');
        hideAll()
        $('.site-pages').show();
    });
    $('#add-post').on('click', function (e) {
        e.preventDefault();
        $('.list-active').toggleClass('list-active');
        $('#add-post').toggleClass('list-active');
        hideAll()
        $('.new-article').show()
    });
    $('#media').on('click', function (e) {
        e.preventDefault();
        $('.list-active').toggleClass('list-active');
        $('#media').toggleClass('list-active');
    });
    $('#comment').on('click', function (e) {
        e.preventDefault();
        $('.list-active').toggleClass('list-active');
        $('#comment').toggleClass('list-active');
    });
    $('#btn-check').click(function (e) {
        e.preventDefault();
        console.log($('textarea#article-new').ckeditor())
    });
});