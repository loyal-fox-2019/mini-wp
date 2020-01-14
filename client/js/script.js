$(document).ready(function(){
    $('#right-content').hide()
    $(document).on('click', '#account-icon', function(e){
        e.preventDefault()
        $('#account-menu').slideToggle()
    })
    $(document).on('click', '#manage-icon', function(e){
        e.preventDefault()
        $('#manage-menu').slideToggle()
    })
    $(document).on('click', '#person-icon', function(e){
        e.preventDefault()
        $('#person-menu').slideToggle()
    })

    $(document).on('click', '#blog-post', function(e){
        e.preventDefault()
        let show = $('#right-content').data('show')
        if(show == 'true'){
            $('#right-content').data('show', 'false')
            $('#right-content').fadeOut()
        }else{
            $('#right-content').data('show', 'true')
            $('#right-content').fadeIn()
        }
    })

    $(document).on('click', '#save-btn', function(e){
        e.preventDefault()
        let title = $('#title').val()
        let description = $('#description').val()
        $('#article-list').append(
            `
            <div class="card">
                <div class="card-body row">
                    <div class="col-md-9">
                        <h4 class="card-title"><b>${title}</b></h4>
                        <p>${description}</p>
                    </div>
                    <div class="col-md-3">
                        <img src="./assets/sawah.jpg" alt="img" width="120" height="80">
                        <a href="#"><span id="titik"> ... </span></a>
                    </div>
                </div>
            </div>
            `
        )
        $('#title').val('')
        $('#description').val('')
        $('#body-content').val('')
    })
})