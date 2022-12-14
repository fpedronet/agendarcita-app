var $aniodesde = 0;

$(document).ready(function(){

    console.log(location.href)

    $('#take-over').modal({backdrop: 'static', keyboard: false});

    $('#datetimepicker12').datepicker({
        inline: true,
        sideBySide: true,
        startDate: '+0d',
        language: 'es'
    });

    var itemDia = "";
    var itemMeses = "";
    var itemAnio = "";
    var itemLugar = "";
    var fecha = new Date();
	var anio = fecha.getFullYear();

    var count = 1;
    var aniohasta = anio - 18
    var aniodesde = anio - 65

    $aniodesde = aniodesde;

    $("#cbdia").html("");
    $("#cbmeses").html("");
    $("#cbanio").html("");
    $("#cblugar").html("");

    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio","Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",];
    const lugar = ["Los Olivos", "San Miguel", "Lince", "San Borja", "La Molina", "San Juan de Lurigancho", "Miraflores", "Surco", "Villa El Salvador"];

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

    lugar.forEach(lugares => {
        itemLugar += "<option value='"+lugares+"'>"+lugares+"</option>";
        $("#cblugar").html(itemLugar);
    });

    GetFirstHashtag();

    PostGuardarVisita();
});

$(document).on('click','#btnAlerta', function(){
    var $validate = true;
    var $step1= true;
    var $step2= true;

    $('.nombrecompleto, .documento, .celular, .correo, .datetimepicker12').hide();

    if($("#nombrecompleto").val()=="" || $("#nombrecompleto").val()==null){
        $validate = false;
        $step1 = false;
        $('.nombrecompleto').show();
    }
    if($("#documento").val()=="" || $("#documento").val()==null){
        $validate = false;
        $step1 = false;
        $('.documento').show();
    }
    if($("#celular").val()=="" || $("#celular").val()==null){
        $validate = false;
        $step1 = false;
        $('.celular').show();
    }
    if($("#correo").val()=="" || $("#correo").val()==null){
        $validate = false;
        $step1 = false;
        $('.correo').show();
    }
    if( $('div#datetimepicker12').datepicker('getDate')=="" ||  
        $('div#datetimepicker12').datepicker('getDate')==null ||  
        $('div#datetimepicker12').datepicker('getDate')==undefined){
            $validate = false;
            $step2 = false;
            $('#idefechacita').text('la fecha cita es obligatorio');
            $('.datetimepicker12').show();
    }

    if(!$step1){
        $('a[href="#step1"]').click();
    }else if(!$step2){
        $('a[href="#step2"]').click();
    }


    if($validate && $step1 && $step2){
        $('#btnAlerta').prop('disabled', true);

        /*Fecha Nacimiento */
            var $month = $("#cbmeses").val();
            var $day = $("#cbdia").val();

            $month = ($month < 10)?  ('0' + $month) : $month;
            $day = ($day < 10)?  ('0' + $day) : $day;
            var fecha = $("#cbanio").val() +"-"+ $month +"-"+$day;

        /*Fecha de la cita*/
            var $fechacita =  $('div#datetimepicker12').datepicker('getDate');
            if($fechacita!=null && $fechacita!='' && $fechacita!=undefined){

                var $yearcita = $fechacita.getFullYear();
                var $monthcita = $fechacita.getMonth() + 1;
                var $daycita = $fechacita.getDate();

                $monthcita = ($monthcita < 10)?  ('0' + $monthcita) : $monthcita;
                $daycita  = ($daycita < 10)?  ('0' + $daycita) : $daycita;
                $fechacita = $yearcita +"-"+ $monthcita +"-"+$daycita;
            }

            const objct ={
                vNombreCompleto: $("#nombrecompleto").val(),
                vDocumento: $("#documento").val(),
                dFechaNac: fecha,       
                vCelular: $("#celular").val(),
                vCorreo: $("#correo").val(),
                dCita: $fechacita,   
                vLugar: $("#cblugar").val(),
                hashtag: $('#hashtag').text(),   
                Key:"!SDFT$$$$&F(/GF7&F7f))?=0'===IY(&&%$%$!H(U/GFD%VBN(MI YT% %RCGRCVBBUJNU(NN"
            }

            $('#btnAlerta').prop('disabled', true);

            fetch("https://service.poclab.pe/agendarcita/api/cita/PostAgendarCita", {
                method: "POST",
                body: JSON.stringify(objct),
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => res.json())
            .then((response) => {
                $('#btnAlerta').prop('disabled', false);
                if(response.swt==1){
                    $('a[href="#step1"]').click();
                    $('#exampleModal').modal({backdrop: 'static', keyboard: false});
                }else{
                    $('#exampleModal2').modal({backdrop: 'static', keyboard: false});
                }
            })
            .catch((error) =>  $('#btnAlerta').prop('disabled', false));
    }
});

$(document).on('click','#btnCerrarModal', function(){
    $("#nombrecompleto").val("");
    $("#documento").val("");
    $("#celular").val("");
    $("#correo").val("");
    $("#cbdia").val("1");
    $("#cbmeses").val("1");
    $("#cbanio").val($aniodesde);
});

$(document).on('keyup', '#documento', function(){
    this.value = this.value.replace(/[^0-9]/g,''); 
});

$(document).on('keyup', '#celular', function(){
    this.value = this.value.replace(/[^0-9]/g,''); 
});


// ------------step-wizard-------------
$(document).ready(function () {
    $('.nav-tabs > li a[title]').tooltip();
    
    //Wizard
    $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {

        var $target = $(e.target);
    
        if ($target.parent().hasClass('disabled')) {
            return false;
        }
    });

    $(".next-step").click(function (e) {

        var $active = $('.wizard .nav-tabs li.active');
        $active.next().removeClass('disabled');
        nextTab($active);

    });
    $(".prev-step").click(function (e) {

        var $active = $('.wizard .nav-tabs li.active');
        prevTab($active);

    });
});

function nextTab(elem) {
    $(elem).next().find('a[data-toggle="tab"]').click();
}
function prevTab(elem) {
    $(elem).prev().find('a[data-toggle="tab"]').click();
}

function GetFirstHashtag(){
    fetch("https://service.poclab.pe/agendarcita/api/cita/GetFirstHashtag")
        .then((res) => res.json())
        .then((response) => {
            if(response.hashtag!=null && response.hashtag!=""){
                $('#hashtag').text(response.hashtag);
            }else{
                $('#hashtag').text("");
            }
           
        })
        .catch((error) => $('#hashtag').text("No hay hashtag..!"));
}

function PostGuardarVisita(){
    
    var ip = "";
    var url = window.location.toString();
    var detector = new MobileDetect(window.navigator.userAgent)

    //Origen
    var marca = "";
    var dispositivo = "Escritorio";
    var sisOperativo = "";
    var navegador = "";

    /*var p = detector.phone();
    var t = detector.tablet()
    var m = detector.mobile();*/

    if(detector.phone()!=null || detector.tablet()!=null){
        marca = detector.mobile();

        if(detector.phone()!=null)
            dispositivo = "Celular";
        
        if(detector.tablet()!=null)
            dispositivo = "Tableta"
    }

    if(detector.os()!=null){
        sisOperativo = detector.os();
    }
    if(detector.userAgent()!=null){
        navegador = detector.userAgent();
    }

    const objct = {        
        vUrl: url,
        vTipo: dispositivo,
        vMarca: marca,
        vSO: sisOperativo,
        vNavegador: navegador,
        Key:"!SDFT$$$$&F(/GF7&F7f))?=0'===IY(&&%$%$!H(U/GFD%VBN(MI YT% %RCGRCVBBUJNU(NN"
    }

    $.getJSON("https://api.ipify.org?format=json",
    function(data) {
        ip = data.ip;
        objct.vIp = ip;
    });

    //Le da tiempo para que se obtenga el IP
    setTimeout(() => { GuardarVisita(objct); }, 500);
}

function GuardarVisita(objct){
    fetch("https://service.poclab.pe/agendarcita/api/cita/PostGuardarVisita", {
        method: "POST",
        body: JSON.stringify(objct),
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then((res) => res.json())
    .then((response) => {
    })
    .catch((error) =>  console.log(error));
}


