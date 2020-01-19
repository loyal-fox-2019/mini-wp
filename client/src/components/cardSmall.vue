<template>
    <div class="divIdentifier">
        <h3 class="elementIdentifier"> component card small</h3>
        
        <div class="col mb-4 div-hover" @click.prevent="$emit('switchToArticleReader', articleDetail._id)">
            <div class="card ">
                <div v-if="articleDetail.Author._id === author" style="width:8%; height:15%; position:absolute; top:5px; right:8px; ">
                    <div class="edit-hover">
                    <button 
                        type="button" 
                        class="close" 
                        data-dismiss="modal" aria-label="Close"
                        @click.prevent="$emit('switchToArticleEditPage', {mode:'editMode', articleDetail})">
                        <font-awesome-icon icon="edit" class="edit-hover" />
                    </button>
                    </div>
                </div>

                <!-- <img src="../assets/images/6901412-photography-wallpaper.jpg" class="card-img-top" alt="..."> -->
                <img 
                    v-if="articleDetail.featuredImage !== 'null' 
                            && articleDetail.featuredImage.length !== 0" 
                    :src="articleDetail.featuredImage" 
                    class="card-img-top" alt="...">

                <div class="card-body p-2">
                    <h5 class="card-title">{{ articleDetail.title }}</h5>
                    <p class="card-text" v-html="plainTextContent"></p>
                    <small> 
                        <a 
                            v-if="plainTextContent.length > maxContentLength" 
                            href="">read more</a> 
                    </small>
                </div>

                <div class="dropdown-divider"></div>



                <!-- accordion collapse -->
                <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                    <div class="panel panel-default">
                       

                        <!-- panel teaser -->
                        <div class="panel-teaser panel-body" >
                        <!--form Group tag -->
                            <div v-if="teaserTagList" class="form-group" data-toggle="tooltip" data-placement="top"  >
                                <button  
                                    v-for="tag in teaserTagList" :key="tag"
                                    type="button" 
                                    class="btn btn-outline-info tagButton"
                                    @click.prevent="$emit('switchToFilterResultPage', { tagList: tag })"
                                    >{{tag}}
                                </button>

                                <!-- panel heading -->
                                <small>
                                    <a 
                                        v-if="articleDetail.tagList.length>3"
                                        :href="toggleId"  
                                        data-toggle="collapse" 
                                        data-parent="#accordion"
                                        aria-expanded="true" 
                                        aria-controls="collapseOne"
                                        >more tags</a> 
                                </small>
                                <!-- end of panel heading -->
                                
                            </div>
                            <!-- end of form Group tag -->
                        </div>
                        <!-- end of panel teaser -->


                        <!-- panel complete -->
                        <div :id="targetId" class="panel-collapse collapse in" 
                            role="tabpanel" aria-labelledby="headingOne">
                            <!--form Group tag -->
                            <div  class="form-group" data-toggle="tooltip" data-placement="top"  >
                                <button  
                                    v-for="remainTag in remainsTagList" :key="remainTag"
                                    type="button" 
                                    class="btn btn-outline-info tagButton"
                                    @click.prevent="$emit('switchToFilterResultPage', { tagList: remainTag })"
                                    >{{ remainTag }}
                                </button>
                            </div>
                            <!-- end of form Group tag -->
                        </div>
                        <!-- end of panel complete -->
                    </div>
                </div>


                <div class="card-footer" style="text-align:center">
                    <a href="#" @click.prevent="$emit('switchToUserContentPage', articleDetail.Author._id)">
                        <small style="color:#c61bf5" >@{{articleDetail.Author.username}}</small>
                    </a>
                </div>
            </div>
        </div>

    </div>
</template>




<script>


export default {
    props:[
        'author',
        'articleDetail'
    ],
    data(){
        return{
            plainTextContent: '',
            maxContentLength: 200,
            toggleId: `#${this.articleDetail.Author.username}${this.articleDetail._id}`,
            targetId: `${this.articleDetail.Author.username}${this.articleDetail._id}`,
            maxTeaserLength: 3,
            teaserTagList: this.articleDetail.tagList.slice(0,3),
            remainsTagList : this.articleDetail.tagList.slice(3)
        }
    },
    methods:{
        stripHtmlTag(){
            // this.plainTextContent = this.articleDetail.content.replace(/(<([^>]+)>)/ig, '')

            var parser = new DOMParser();
            var dom = parser.parseFromString(this.articleDetail.content, "text/html");
            var text = "";
            var walkDOM = function (node, func) {
                func(node);
                node = node.firstChild;
                while (node) {
                    walkDOM(node,func);
                    node = node.nextSibling;
                }
            };

            walkDOM(dom, function (node) {
                if (node.tagName === 'BR') {
                    text += node.outerHTML;
                }
                else if (node.nodeType === 3) { // Text node
                    text += node.nodeValue;
                }        
            });
            this.plainTextContent = text
            // this.$set(this.data, 'plainTextContent', 2)
        },
        minimizedContent(){
            if(this.plainTextContent.length > this.maxContentLength)
                this.plainTextContent = this.plainTextContent.slice(0,this.maxContentLength) + ' ...'
        },
    },
    created(){
        this.stripHtmlTag()
        this.minimizedContent()
    }

    


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
.tagButton{
    border: dashed 1px grey;
    border-radius: 10px;
    font-size: 80%;
    padding: 5px
}

</style>