document.getElementById('getText').addEventListener('click', getText);
document.getElementById('getUsers').addEventListener('click', getUsers);
document.getElementById('getPosts').addEventListener('click', getPosts);
document.getElementById('addPost').addEventListener('submit', addPost);

//fetch tem como parâmetro oq vc quer buscar (url, arquivo etc) e retorna uma promessa (como se fosse um placeholder da resposta que queremos). Essa promessa começa com then que retorna uma resposta que ainda não está no formato que queremos (pode ser texto, json etc). Então, é necessário outro then para transformar a promessa em algum retorno real (pode ser um console.log, pode ser um evento etc). Catch para pegar erros.


//buscando informações em um .txt
function getText() {
    //opção sem arrow function
    // fetch('sample.txt')
    //     .then(function (res) {
    //         return res.text();
    //     })
    //     .then(function (data) {
    //         document.getElementById('output').innerHTML = data;
    //     })
    //     .catch(function(err){
    //         console.log(err);
    //     })

    //opção com arrow function
    fetch('sample.txt')
        .then((res) => res.text())
        .then((data) => {
            document.getElementById('output').innerHTML = data;
        })
        .catch((err) => console.log(err))
}

//buscando informações em um json
function getUsers() {
    fetch('users.json')
        .then((res) => res.json())
        .then((data) => {
            let output = '<h2>Users</h2>';
            data.forEach((user) => {
                output += `
                    <ul>
                    <li>ID: ${user.id}</li>    
                    <li>Name: ${user.name}</li>    
                    <li>Email: ${user.email}</li> 
                    <ul>   
                `;
            });
            document.getElementById('output').innerHTML = output;
        })
}

//buscando informações em uma API
function getPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then((res) => res.json())
        .then((data) => {
            let output = '<h2>Posts</h2>';
            data.forEach((post) => {
                output += `
                    <div>
                        <h3>${post.title}</h3>
                        <p>${post.body}</p>
                    </div>
                `;
            });
            document.getElementById('output').innerHTML = output;
        })
}

//adicionando 
//como é um formuário, é necessário passar um parâmetro evento. E para impedir que a tela execute rapidamente o submit sem mostrar o resultado, é usado o e.preventDeafult().
function addPost(e) {
    e.preventDefault();

    //pegando os valores dos campos título e corpo
    let title = document.getElementById('title').value;
    let body = document.getElementById('body').value;

    //enviando as informações via POST /posts. Para isso, precisa passar outro parâmetro que é um objeto com informações do envio.
    fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                body: body
            })
        })
        .then((res) => res.json())
        .then((data) => console.log(data))
}