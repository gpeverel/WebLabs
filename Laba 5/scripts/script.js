
$(function(){
    var toDos = [ "Закончить писать эту книгу",
     "Вывести Грейси на прогулку в парк", 
     "Ответить на электронные письма", 
     "Подготовиться к лекции в понедельник", 
     "Обновить несколько новых задач", "Купить продукты" ];
    for(let i = 1; i <= 3;i++ ){
        const selector = '.action:nth-child(' + i + ')'
        $(selector).on('click', function(){
            $('.action').removeClass("active")
            $(this).addClass("active")
            $('.works').empty()
        }) 
    }

})