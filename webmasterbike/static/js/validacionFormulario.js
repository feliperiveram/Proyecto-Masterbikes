$(document).ready(function() {
    var flag = true;

    $("#nombre").on("keyup blur", function(){
        var nombre = $("#nombre").val();
        if (nombre.length > 0) {
            if (String(nombre).length > 4){
                $("#nombre").css("border","2px solid rgb(0, 204, 102)");
                $("#errorNombre").empty();
            }else{
                $("#nombre").css("border","2px solid red");
                $("#errorNombre").html("<span class='error-message'>* El nombre debe tener al menos 4 carácteres</span><br>");
            };        
        }else{
            $('#nombre').css("border", "")
            $("#errorNombre").empty();
        };
    });
    
    $("#rut").on("blur keyup", function() {
        var rut = ($("#rut").val()); // Se elimina cualquier espacio en blanco al inicio o al final
    
        if (rut.length > 0) {
            if (Valida_Rut(rut)){
                $("#rut").css("border","2px solid rgb(0, 204, 102)");
                $("#errorRut").empty();
            }else{
                $("#rut").css("border", "2px solid red");
                $("#errorRut").html("<span class='error-message'>* El RUT no es válido</span><br>");
            }
        } else {
            // El campo está vacío
            $("#rut").css("border", "");
            $("#errorRut").empty();
        }
    });

    $("#regiones").on("change blur", function() {
        var opcionSelec = $("#regiones").val();

        if (opcionSelec == 0) {
            $("#regiones").css("border", "2px solid red");
            $("#errorRegion").html("<span class='error-message'>* Debe seleccionar una región válida</span><br>");
            $("#comunas").css("border", "");
            $("#errorComuna").empty();
        } else {
            $("#regiones").css("border", "");
            $("#errorRegion").empty();
            $("#regiones").css("border","2px solid rgb(0, 204, 102)");
            $("#errorRegion").empty();
        }
    });

    $("#comunas").on("change blur", function() {
        var opcionSelec = $("#comunas").val();

        if (opcionSelec == 0 && $("#regiones").val() != 0) {
            $("#comunas").css("border", "2px solid red");
            $("#errorComuna").html("<span class='error-message'>* Debe seleccionar una comuna válida</span><br>");
        } else {
            $("#comunas").css("border", "");
            $("#errorComuna").empty();
            $("#comunas").css("border","2px solid rgb(0, 204, 102)");
            $("#errorComuna").empty();
        }

        if ($("#regiones").val() == 0) {
            $("#comunas").css("border", "");
            $("#errorComuna").empty();
        }
    });
    
    $("#direccion").on("keyup blur", function(){
        var direccion = $("#direccion").val();
        if (direccion.length > 0) {
            if (direccion.length >= 5 && direccion.length <= 40) {
                $("#direccion").css("border", "2px solid rgb(0, 204, 102)");
                $("#errorDireccion").empty();
            } else {
                $("#direccion").css("border", "2px solid red");
                $("#errorDireccion").html("<span class='error-message'>* Dirección debe tener entre 5 y 40 carácteres</span><br>");
            }        
        } else {
            $('#direccion').css("border", "");
            $("#errorDireccion").empty();
        }
    });
    
    $("#numero").on("click", function(){
        if ($("#numero").val() === "") {
            $("#numero").val('+569');
        }
    });
    
    $("#numero").on("blur keyup", function(){
        var numero = $("#numero").val();
        if (numero.length > 0) {
            if (formatearCelular(numero).length == 11) {
                $("#numero").css("border", "2px solid rgb(0, 204, 102)");
                $("#errorNumero").empty();
            } else {
                $("#numero").css("border", "2px solid red");
                $("#errorNumero").html("<span class='error-message'>* Número de celular debe tener 11 dígitos</span><br>");
            }
        } else {
            $('#numero').css("border", "");
            $("#errorNumero").empty();
        }
    });
    
    function formatearCelular(numero) {
        var numFormateado = numero.replace(/[^0-9]/g, "");
        return numFormateado;
    }
    
    $("#correo").on("keyup blur", function() {
        var correo = $("#correo").val();
        if (correo.length > 0) {
            if (correo.length > 4) {
                if (/^[\w._]+@(gmail|live|outlook)\.(com|cl)$/.test(correo)) {
                    $("#correo").css("border", "1.5px solid green");
                    $("#errorCorreo").empty();
                } else {
                    console.log('error en correo?')
                    $("#correo").css("border", "1.5px solid red");
                    $("#errorCorreo").html("<span class='error-message'>* Solamente se admiten correos del dominio gmail, live y outlook</span><br>");
                }
            } else {
                $("#correo").css("border", "1.5px solid red");
                $("#errorCorreo").html("<span class='error-message'>* Correo al menos debe tener 4 carácteres</span><br>");
            }
        } else {
            $("#correo").css("border", ""); // Restablecer el estilo de borde si el campo está vacío
            $("#errorCorreo").empty();
        }
    });
    
    $("#contraseña").on("keyup blur", function(){
        var contraseña = $("#contraseña").val();
        if (contraseña.length > 0) {
            if (contraseña.length >= 5 && contraseña.length <= 8) {
                $("#contraseña").css("border", "2px solid rgb(0, 204, 102)");
                $("#errorContraseña").empty();
            } else {
                $("#contraseña").css("border", "2px solid red");
                $("#errorContraseña").html("<span class='error-message'>* Contraseña debe tener entre 5 y 8 dígitos</span><br>");
            }        
        } else {
            $('#contraseña').css("border", "");
            $("#errorContraseña").empty();
        }
    });
    
    $("#verifContraseña").on("keyup blur input", function(){
        if ($("#verifContraseña").val().length > 0) {
            if ($("#verifContraseña").val() === $("#contraseña").val()) {
                $("#verifContraseña").css("border", "2px solid rgb(0, 204, 102)");
                $("#errorVerifContra").empty();
            } else {
                $("#verifContraseña").css("border", "2px solid red");
                $("#errorVerifContra").html("<span class='error-message'>* Campo debe ser igual que la contraseña ingresada anteriormente</span><br>");
            }
        } else {
            if ($('#contraseña').val().length > 0) {
                $("#verifContraseña").css("border", "2px solid red");
                $("#errorVerifContra").html("<span class='error-message'>* Campo debe ser igual que la contraseña ingresada anteriormente</span><br>");
            } else {
                $('#verifContraseña').css("border", "");
                $("#errorVerifContra").empty();
            }
        }
    });
    
    $("#contraseña").on("keyup blur input", function(){
        $("#verifContraseña").trigger("input");
    });

    $("#btn-limpiar").click(function(event) {
        // Limpiar campos del formulario
        $("#nombre").css("border", "");
        $("#rut").css("border", "");
        $("#regiones").css("border", "");
        $("#comunas").css("border", "");
        $("#direccion").css("border", "");
        $("#numero").css("border", "");
        $("#correo").css("border", "");
        $("#contraseña").css("border", "");
        $("#verifContraseña").css("border", "");
        $("[id^='error']").empty();
        $(".comunas").prop("disabled", true);
    });

    $(".btn-registro").click(function(event) {
        event.preventDefault();
        //Validación
        $("#formulario").submit();
    });

    function Valida_Rut(rut) {
        var tmpstr = "";
        for (i = 0; i < rut.length; i++) {
            if (rut.charAt(i) != ' ' && rut.charAt(i) != '.') {
                tmpstr = tmpstr + rut.charAt(i);
                rut = tmpstr;
            }
        }
        if (rut.indexOf('-') != -1) {
            var digito = rut.substring(rut.indexOf('-') + 1, rut.length);
            rut = rut.substring(0, rut.indexOf('-'));
        } else {
            return false;
        }
        var suma = 0;
        var res;
        var dvr = '0';
        var dvi, dv;
        var largo = rut.length;
        if (largo > 8 || largo < 7) {
            return false;
        } else {
            var mu1 = 2;
            for (var i = rut.length - 1; i >= 0; i--) {
                suma = suma + rut.charAt(i) * mu1;
                if (mu1 == 7) {
                    mu1 = 2;
                } else {
                    mu1++;
                }
            }
            res = suma % 11;
            if (res == 1) {
                dvr = 'K';
            } else if (res == 0) {
                dvr = '0';
            } else {
                dvi = 11 - res;
                dvr = dvi + "";
            }
            if (dvr != digito.toUpperCase()) {
                return false;
            } else {
                return true;
            }
        }
    }
});