
$(function(){
    var toDos = [ "Закончить писать эту книгу",
     "Вывести Грейси на прогулку в парк", 
     "Ответить на электронные письма", 
     "Подготовиться к лекции в понедельник", 
     "Обновить несколько новых задач", "Купить продукты" ];
    $('.action:nth-child(1)').on('click', function(){
        $('.action').removeClass("active")
        $('.action:nth-child(1)').addClass("active")
        $('.works').empty()
    })
    $('.action:nth-child(2)').on('click', function(){
        $('.action').removeClass("active")
        $('.action:nth-child(2)').addClass("active")
        $('.works').empty()
    })
    $('.action:nth-child(3)').on('click', function(){
        $('.action').removeClass("active")
        $('.action:nth-child(3)').addClass("active")
        $('.works').empty()
    })

})