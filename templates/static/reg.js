async function reg(){
    console.log(document.getElementById("login").value)
    const resp = await fetch("/api/login/reg", {
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
        alert("Помилка при реєстрації")
    }
    else{
        window.location.href = "/"
    }

    console.log(await resp.json())
}

document.getElementById("regbutton").addEventListener("click", reg, true)