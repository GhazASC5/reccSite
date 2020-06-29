function tryLogin(){
    $.ajax({
        type: 'GET',
        url: '/loginInput',
        data: {username: document.getElementById('username').value, password: document.getElementById('password').value}
        
    })
}