const Tag = require('../model/Tag')

module.exports = (req,res,next)=>{
    console.log(`
        TAG CREATION IS RUNNING
        =======================
    `);
    let createTag = []
    let updateTag =[]


    if(!req.body.TagList || req.body.TagList.length === 0)
        res.status(201).json(req.createdArticle)
    else 
      {
        const { tagName } = req.body.tagName

        Tag.find({
            name : tagName
        })
        .then(result=>{
            if(!result || result.length === 0)
              {
                  tagName.forEach(element => {
                        createTag.push({
                            name: element,
                            ArticleList: [req.createdArticle._id]
                        })
                  });
              }
            else
              {
                  let foundNameArray =[]
                  result.forEach(element => {
                        foundNameArray.push(element.name)
                  });

                  
                  tagName.forEach(element => {
                        if(foundNameArray.indexOf(element) === -1)
                          {
                              createTag.push({
                                  name: element,
                                  ArticleList: [req.createArticle._id]
                              })
                          }
                        else
                          {
                              updateTag.push({
                                // nanti lanjut dari sini
                              })
                          }
                  });
              }  

            
            console.log("TCL: createTag\n=====================\n", createTag)

            
        })
        .catch(err=>{
            next(err)
        })
      }
        
    



}