$(document).ready(function(){

    $('#datetimepicker12').datepicker({
        inline: true,
        sideBySide: true
    });

    var itemDia = "";
    var itemMeses = "";
    var itemAnio = "";
    var fecha = new Date();
	var anio = fecha.getFullYear();

    var count = 1;
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
        itemMeses += "<option value="+count+">"+mes+"</option>";
        $("#cbmeses").html(itemMeses);
        count++;
    });

    for (let index = aniodesde; index <= aniohasta; index++) {
        itemAnio += "<option value="+index+">"+index+"</option>";
        $("#cbanio").html(itemAnio);
    }


});

$(document).on('click','#btnAlerta', function(){

    var $month = $("#cbmeses").val();
    month = ($month < 10)?  ('0' + $month) : $month;

    var fecha = $("#cbanio").val() +"-"+ month +"-"+$("#cbdia").val();

    const objct ={
        vNombreCompleto: $("#nombrecompleto").val(),
        vDocumento: $("#documento").val(),
        dFechaNac: fecha,       
        vCelular: $("#celular").val(),
        vCorreo: $("#correo").val(),
        dCita: $("#datetimepicker12").val(),       

        // vLugar: document.getElementById('lugar').value,
        Key:"!SDFT$$$$&F(/GF7&F7f))?=0'===IY(&&%$%$!H(U/GFD%VBN(MI YT% %RCGRCVBBUJNU(NN"
    }


    console.log(objct);
    
    // fetch("https://service.poclab.pe/agendarcita/api/cita/PostAgendarCita", {
    //     method: "POST",
    //     body: JSON.stringify(objct),
    //     headers:{
    //         'Content-Type': 'application/json'
    //     }
    // })
    // .then((res) => res.json())
    // .then((response) => {
    //     $('#exampleModal').modal('show');
    // })
    // .catch((error) => console.log("Error: ", error));
});


