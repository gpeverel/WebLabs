
$(function(){
    var toDos = [ "Закончить писать эту книгу",
     "Вывести Грейси на прогулку в парк", 
     "Ответить на электронные письма", 
     "Подготовиться к лекции в понедельник", 
     "Обновить несколько новых задач", "Купить продукты" ];
     addWorks(1)
    for(let i = 1; i <= 3;i++ ){
        const selector = '.action:nth-child(' + i + ')'
        $(selector).on('click', function(){
            $('.action').removeClass("active")
            $(this).addClass("active")
            $('.works').empty()
            if(i !== 3){
                addWorks(i)
            }else{
                openWorkPanel()
            }
        }) 
    }
    function addWorks(index){
        let works = $('.works')
        if(index === 2){
            for(let i = toDos.length - 1; i > -1; i--){
                works.append(createWork(toDos[i]))
            }
        }else{
            for(let i = 0; i < toDos.length; i++){
                works.append(createWork(toDos[i]))
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
})