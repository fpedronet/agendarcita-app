onload=function(){
    var ejemplo = 'https://t3.ftcdn.net/jpg/04/19/17/68/360_F_419176802_9s4AoYMfzxDt3kaSYV55whCkTB76NsHN.jpg'
    /*Imágenes*/
    document.getElementById("logoCampana").src = ejemplo;
    document.getElementById("logoPTMS").src = './logo-PTMS.jpg';
    document.getElementById("logoDONAR").src = './logo-DONAR.jfif';
}

const btnAgendar = document.getElementById("btnAgendar");


btnAgendar.addEventListener('click', () => {
    const objct ={
        vNombre: document.getElementById('nombres').value,
        vApellido: document.getElementById('apellidos').value,
        vDocumento: document.getElementById('dni').value,
        dFechaNac: document.getElementById('fecnacimiento').value,
        vCelular: document.getElementById('celular').value,
        vCorreo: document.getElementById('correo').value,
        dDia: document.getElementById('dia').value,
        vLugar: document.getElementById('lugar').value,
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
    .then((response) => {
        $("#mensaje").text(response.mensaje);

        if(response.swt == 1){           
            $('.alert').addClass("show");
            $('.alert').removeClass("hide");
            $('.alert').addClass("showAlert");
            setTimeout(function(){
              $('.alert').removeClass("show");
              $('.alert').addClass("hide");
            },5000);
        }else{
            $('.alert').addClass("show");
            $('.alert').removeClass("hide");
            $('.alert').addClass("showAlert");
            setTimeout(function(){
              $('.alert').removeClass("show");
              $('.alert').addClass("hide");
            },5000);
        }
    })
    .catch((error) => console.log("Error: ", error));
});


 // $("#mensaje").text(response.mensaje);
        // if(response.swt == 1){           
        //     $('.alert').addClass("show");
        //     $('.alert').removeClass("hide");
        //     $('.alert').addClass("showAlert");
        //     setTimeout(function(){
        //       $('.alert').removeClass("show");
        //       $('.alert').addClass("hide");
        //     },5000);
        // }else{
        //     $('.alert').addClass("show");
        //     $('.alert').removeClass("hide");
        //     $('.alert').addClass("showAlert");
        //     setTimeout(function(){
        //       $('.alert').removeClass("show");
        //       $('.alert').addClass("hide");
        //     },5000);
        // }