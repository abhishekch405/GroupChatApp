window.addEventListener('DOMContentLoaded',screenready);

function screenready(){
    getUsers();
    const chatSection=document.getElementsByClassName('chat__section')[0];
    const form=document.getElementById("send__message__form");
    form.addEventListener('submit',sendMessage);

    const newgroupform=document.getElementById("form__newGroup");
    newgroupform.addEventListener('submit',createnewgroup);
}

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
    let singlecontacts=document.getElementById('single__contacts');
    singlecontacts.innerHTML='';
    if (users.length>0){
        users.forEach(user=>{
            let newDiv=`<div class="single__contact" id=${user.id}>
            <h5>${user.name}</h5>
        </div>`
            singlecontacts.innerHTML+=newDiv;
        })
    }
}


async function sendMessage(e){
    e.preventDefault();

    const messagedata={
        message_text:document.getElementById('msgtext').value
    }
    console.log(messagedata);
    const url='http://localhost:3000/sendmessage';
    try {
        const response=await axios.post(url,messagedata,{headers:{"Authorization":`Bearer ${localStorage.getItem('token')}`}});
    } catch (error) {
        console.log(error);
    }
}


async function createnewgroup(e){
    e.preventDefault();

    const newgroupdata={
        groupname:document.getElementById('newGroup__input').value
    }
    console.log(newgroupdata);
    const url='http://localhost:3000/newgroup';
    try {
        const response=await axios.post(url,newgroupdata,{headers:{"Authorization":`Bearer ${localStorage.getItem('token')}`}});
    } catch (error) {
        console.log(error);
    }
}