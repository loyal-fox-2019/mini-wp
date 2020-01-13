$(document).ready(()=>{
    $(document).on('click', '#account', function(){
        $('.account').slideToggle()
    })

    $(document).on('click', '#manage', function(){
        $('.manage').slideToggle()
    })

    $(document).on('click', '#personalize', function(){
        $('.personalize').slideToggle()
    })

    $(document).on('click', '#tag', function(){
        $('#tags').slideToggle()
    })

    $(document).on('click', '#write', function(){
      $('#post').load("formpost.html")
    })

    $(document).on('click', '#post-btn', function(event){
        console.log($('textarea#editor1').val())
        event.preventDefault()
      })

})