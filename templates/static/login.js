async function login(){

    const resp = await fetch("/api/login/log", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "login": document.getElementById("login").value,
            "password": document.getElementById("password").value
        })
    })

    if(resp.status != 200){
        alert("Помилка при вході")
    }
    else{
        window.location.href = "/"
    }

    console.log(await resp.json())
}

document.getElementById("loginbutton").addEventListener("click", login, true)  