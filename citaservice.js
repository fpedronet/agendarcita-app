$(document).on('click','#btnAlerta', function(){

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
        $('#exampleModal').modal('show');
    })
    .catch((error) => console.log("Error: ", error));
});
