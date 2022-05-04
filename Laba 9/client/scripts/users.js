let users;
let baseUrl = "http://localhost:5300/"
$(function(){
    $('.add-user-button').on('click', addUserOnServer);
    addUsers()
    function addUserOnServer(){
        let val = $(".add-user-input").val();
        let formData = new FormData();
        formData.append("username", val)
        let settings = {
            "method": "POST",
            "data":formData,
            dataType : 'json',
            cache: false,
            contentType: false,
            processData: false,
        }
        settings.url = baseUrl + "user";
        $.ajax(settings).then(() => {
            addUsers();
        })
    }
    function getUsers(){
        let settings = {
            "method": "GET",
        }
        settings.url = baseUrl + "user";
        return $.ajax(settings)
    }
    function addUsers(){
        $('.users').html("")
        getUsers().then(data =>{
            users = data;
            for(let i = 0; i < users.length; i++){
                let user = document.createElement('div')
                user.className = 'user'
                let userName = document.createElement('h4')
                userName.className = "username"
                userName.innerHTML = users[i].username;
                let deleteBut = document.createElement('p')
                deleteBut.className = "user-delete-but"
                deleteBut.innerHTML = "X"
                deleteBut.id = users[i]._id
                deleteBut.addEventListener('click', deleteUser)
                user.append(userName)
                user.append(deleteBut)
                $(".users")[0].append(user)}
        })
    }
    function deleteUser(event){
        let settings = {
            "type": "DELETE",
            "url":baseUrl + "user?" + $.param({id:event.currentTarget.id})
        }
        $.ajax(settings).then(() =>{
            addUsers();
        })
    }
})