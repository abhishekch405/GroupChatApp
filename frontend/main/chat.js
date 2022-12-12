window.addEventListener('DOMContentLoaded',getUsers);

async function getUsers(){
    const url='http://localhost:3000/users';
    try {
        const response=await axios.get(url,{headers:{"Authorization":`Bearer ${localStorage.getItem('token')}`}});
        showUsers(response.data.users);
    } catch (error) {
        console.log(error);
    }
    
}

function showUsers(users){
    const container=document.getElementById('members');
    const ul=document.createElement('ul');
    if (users.length>0){
        users.forEach(user=>{
            const li=document.createElement('li');
            li.innerHTML=`<h1>${user.name}</h1>`;
            ul.appendChild(li);
        })
        container.appendChild(ul);
    }
}
