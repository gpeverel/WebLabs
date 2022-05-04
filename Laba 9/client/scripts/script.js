const baseUrl = 'http://localhost:5300'
let username;
$(function(){
    username = getUserName()
    $.get(baseUrl + '/toDos?username=' + username, function(toDoObjects){
        main(toDoObjects)
    })
})
function main(toDoObjects){
     addWorks(1)
     $('.append-button').on('click', function(){
         const newWork = $('.append-input').val()
         const tags = $('.tags-input').val().split(",")
         $.ajax({
            type: "POST",
            url: baseUrl + "/toDos",
            data: JSON.stringify({tags, description:newWork, username}),
            dataType : 'json',
            headers: {
                "Content-Type": "application/json"
            },
          }).then((data) =>{
            console.log(data)
            toDoObjects.push({description:newWork, tags, _id:data._id})
          })
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
    function organizeByTags(){
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
        let works = $('.works')
        let orginizedToDoObjects = organizeByTags();
        orginizedToDoObjects.forEach(toDo => {
            if(toDo.toDos.length !== 0){
                works.append(createWorkWithTag(toDo))
            }
        });
    }
    function createWorkWithTag(toDo){
        const work = $('<div>',{
            class:'work-with-tag'
        }).append($('<h3>',{
            class:'work-tag',
            text:toDo.tag
        }))
        toDo.toDos.forEach(element => {
            work.append($('<span>',{
                class:'work-description',
                text:element
            }))
        });
        return work
    }
    function addWorks(index){
        let works = $('.works')
        works.html("")
        if(index === 1){
            for(let i = toDoObjects.length - 1; i > -1; i--){
                works.append(createWork(toDoObjects[i]))
            }
        }else{
            for(let i = 0; i < toDoObjects.length; i++){
                works.append(createWork(toDoObjects[i]))
            }
        }
    }
    function createWork(toDoObject){
        const but = $('<button>',{
            class:'delete-work',
            text:"X",
            id:toDoObject._id
        })
        but.on('click', deleteToDo)
        const span = $('<span>',{
            class:'text-work',
            text:toDoObject.description,
            id:toDoObject._id
        })
        span.on('click', toChangeToDo)
        const work = $('<div>',{
            class:'work',
        }).append(span).append(but)
        return work
    }
    function openWorkPanel(){
        $('.append-panel').css("display", 'block')
    }
    function hideWorkPanel(){
        $('.append-panel').css("display", 'none')
    }
    function deleteToDo(e){
        const id = e.currentTarget.id
        $.ajax({
            type: "DELETE",
            url: baseUrl + "/toDos",
            data: JSON.stringify({id, username}),
            dataType : 'json',
            headers: {
                "Content-Type": "application/json"
            },
          }).then((data) =>{
            toDoObjects = toDoObjects.filter((obj) => obj._id !== data._id)
            addWorks(1)
          })
    }
    function toChangeToDo(e){
        let work = e.currentTarget.parentElement
        let val = work.getElementsByClassName('text-work')[0].innerText
        let id = e.currentTarget.id
        let toDoObject = toDoObjects.find(toDo => toDo._id === id)
        work.innerHTML = ""
        let inputToDo = document.createElement("input")
        inputToDo.type = 'text'
        inputToDo.value = val
        inputToDo.className = "toDoInput"
        let inputTags = document.createElement("input")
        inputTags.type = 'text'
        inputTags.value = toDoObject.tags.join(",")
        inputTags.className = "toDoTags"

        let chnageBut = document.createElement("button")
        chnageBut.innerText = 'Изменить'
        chnageBut.id = id
        chnageBut.onclick = changeToDo

        work.append(inputToDo)
        work.append(inputTags)
        work.append(chnageBut)
    }
    function changeToDo(e){
            let work = e.currentTarget.parentElement
            let id = e.currentTarget.id
            let description = work.getElementsByClassName("toDoInput")[0].value
            let tags = work.getElementsByClassName("toDoTags")[0].value.split(',')
            $.ajax({
                type: "POST",
                url: baseUrl + "/toDos/update",
                data: JSON.stringify({id, username, description, tags}),
                dataType : 'json',
                headers: {
                    "Content-Type": "application/json"
                },
              }).then((data) =>{
                toDoObject = toDoObjects.find((obj) => obj._id === id)
                toDoObject.description = description
                toDoObject.tags = tags
                addWorks(1)
              })
    }

}
function getUserName(){
    return window.location.href.slice(window.location.href.indexOf("?") + 1).split("=")[1];
}