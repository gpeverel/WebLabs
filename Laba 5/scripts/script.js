
$(function(){
    var toDos = [ "Закончить писать эту книгу",
     "Вывести Грейси на прогулку в парк", 
     "Ответить на электронные письма", 
     "Подготовиться к лекции в понедельник", 
     "Обновить несколько новых задач", "Купить продукты" ];
     function makeActionActive(actionNumber){
         const selector = '.action:nth-child(' + actionNumber + ')'
         $('.action').removeClass("active")
         $(selector).addClass("active")
         $('.works').empty()
     }
    $('.action:nth-child(1)').on('click', function(){
        makeActionActive(1)
    })
    $('.action:nth-child(2)').on('click', function(){
        makeActionActive(2)
    })
    $('.action:nth-child(3)').on('click', function(){
        makeActionActive(3)
    })

})