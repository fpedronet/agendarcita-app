const button1 = document.getElementById("btnListar");
const button2 = document.getElementById("btnAgendar");
const button3 = document.getElementById("btnAlerta");

button1.addEventListener('click', () => {
    fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => (res.ok? Promise.resolve(res): Promise.reject(res)))
    .then((res) => res.json(res))
    .then((res) => console.log(res));

});

button2.addEventListener('click', () => {

    const objct ={
        vNombre:"FRANCISCO PEDRO",
        vApellido:"CONDOR MARTINEZ",
        vDocumento:"45036143",
        dFechaNac:"1988-03-01",
        vCelular:"965839805",
        vCorreo:"fpedro.martinez.net@gmail.com",
        dDia:"2022-08-16",
        vLugar:"lima",
        dFechaReg:"2022-08-16",
        Key:"!SDFT$$$$&F(/GF7&F7f))?=0'===IY(&&%$%$!H(U/GFD%VBN(MI YT% %RCGRCVBBUJNU(NN"
    }

    fetch("https://service.poclab.pe/agendarcita/api/cita/PostAgendarCita", {
        method: "POST",
        body: JSON.stringify(objct),
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then((res) => res.json())
    .then((response) =>
        $("#mensaje").text(response.mensaje),
        $("#btnAlerta").click()
     )
    .catch((error) => console.log("Error: ", error));
});

button3.addEventListener('click', () => {
    $('.alert').addClass("show");
    $('.alert').removeClass("hide");
    $('.alert').addClass("showAlert");
    setTimeout(function(){
      $('.alert').removeClass("show");
      $('.alert').addClass("hide");
    },5000);
});

