<template>
    <div class="divIdentifier">
        <h3 class="elementIdentifier"> compenent card small</h3>

        <div class="col mb-4 div-hover">
            <div class="card ">
                <div style="width:8%; height:15%; position:absolute; top:5px; right:8px; ">
                    <div class="edit-hover">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <!-- <font-awesome-icon icon="user-secret" /> -->
                        <font-awesome-icon icon="edit" class="edit-hover" />
                    </button>
                    </div>
                </div>
                <img src="../assets/images/6901412-photography-wallpaper.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Card title {{idNeh}}</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                </div>
                <div class="card-footer" style="text-align:center">
                    <a href="" @click.prevent="$emit('seeUserArticles', `yang ngclick barusan ${idNeh}`)">
                        <large style="color:#c61bf5" >@jap</large>
                    </a>
                </div>
            </div>
        </div>

    </div>
</template>




<script>


export default {
    props:[
        'idNeh'
    ]

    


}
</script>




<style scoped>
.edit-hover 
{
    visibility: hidden;
}
.div-hover:hover .edit-hover
{
    visibility: visible
}


</style>