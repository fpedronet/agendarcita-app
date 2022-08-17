$(document).ready(function(){

    

    var itemDia = "";
    var itemMeses = "";
    var itemAnio = "";
    var fecha = new Date();
	var anio = fecha.getFullYear();

    var aniohasta = anio - 18
    var aniodesde = anio - 65

    $("#cbdia").html("");
    $("#cbmeses").html("");
    $("#cbanio").html("");

    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio","Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",];

    for (let index = 1; index <= 31; index++) {
        itemDia += "<option value="+index+">"+index+"</option>";
        $("#cbdia").html(itemDia);
    }

    meses.forEach(mes => {
        itemMeses += "<option value="+mes+">"+mes+"</option>";
        $("#cbmeses").html(itemMeses);
    });

    for (let index = aniodesde; index <= aniohasta; index++) {
        itemAnio += "<option value="+index+">"+index+"</option>";
        $("#cbanio").html(itemAnio);
    }


});

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


