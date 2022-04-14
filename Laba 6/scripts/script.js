$(function(){
    $.getJSON("../localeState.json", function(toDoObjects){
        main(toDoObjects)
    })
})
function main(toDoObjects){
     addWorks(1)
     $('.append-button').on('click', function(){
         const newWork = $('.append-input').val()
         toDoObjects.push(newWork)
     })
    for(let i = 1; i <= 4;i++ ){
        const selector = '.action:nth-child(' + i + ')'
        $(selector).on('click', function(){
            $('.action').removeClass("active")
            $(this).addClass("active")
            $('.works').empty()
            hideWorkPanel()
            if(i < 3){
                addWorks(i)
            }else if(i === 4){
                openWorkPanel()
            }else{
                addWorksWithTag()
            }
        }) 
    }
    function organizeByTags(toDoObjects){
        let tags = []
        toDoObjects.forEach(toDo => {
            toDo.tags.forEach(tag => {
                if(tags.indexOf(tag) === -1){
                    tags.push(tag)
                }
            });
        });
        let resultObjects = tags.map(tag => {
        let toDoObjectsWithTags = []
            toDoObjects.forEach(toDo => {
                if(toDo.tags.indexOf(tag) !== -1){
                    toDoObjectsWithTags.push(toDo.description)
                }
            });
            return {tag, toDos:toDoObjectsWithTags}
        });
        return resultObjects;
    }
    function addWorksWithTag(){

    }
    function addWorks(index){
        let works = $('.works')
        if(index === 1){
            for(let i = toDoObjects.length - 1; i > -1; i--){
                works.append(createWork(toDoObjects[i].description))
            }
        }else{
            for(let i = 0; i < toDoObjects.length; i++){
                works.append(createWork(toDoObjects[i].description))
            }
        }
    }
    function createWork(title){
        const work = $('<div>',{
            class:'work'
        })
        work.html(title)
        return work
    }
    function openWorkPanel(){
        $('.append-panel').css("display", 'block')
    }
    function hideWorkPanel(){
        $('.append-panel').css("display", 'none')
    }

}