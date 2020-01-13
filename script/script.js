$(document).ready(function () {
    $('.cust-dropdown').hide()
    $('.main-content-article').hide()
    $('.add-an-article-section').hide()

    $(document).on('click', '#site-dropdown-1', function() {
        $('.cust-dropdown-1').slideToggle()
    })

    $(document).on('click', '#site-dropdown-2', function() {
        $('.cust-dropdown-2').slideToggle()
    })

    $(document).on('click', '#site-dropdown-3', function() {
        $('.cust-dropdown-3').slideToggle()
    })

    $(document).on('click', '#site-dropdown-4', function() {
        $('.cust-dropdown-4').slideToggle()
    })

    $(document).on('click', '#posts-button', function(){
        $('.add-an-article-section').hide()
        $('.main-content-article').fadeIn(1000)
    })

    $(document).on('click', '#write-button', function(){
        $('.main-content-article').hide()
        $('.add-an-article-section').fadeIn(1000)
    })

    
})
    
