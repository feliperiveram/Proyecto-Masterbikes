$(document).ready(function(){
    $.get("/static/json/regionesComunas.json" , function(data) {
        $.each(data.regions, function (i, item) {
            $(".regiones").append(
                "<option value=" + item.number + ">" + item.name + "</option>"
            );
        });
    });

    // Cuando se cambia la selección de la región
    $(".regiones").change(function() {
        // Obtener el valor seleccionado de la región
        var regionSeleccionada = $(".regiones").val();
        $(".comunas").empty();
        $(".comunas").append("<option value='0'>Seleccione su comuna</option>");

        // Verificar si se ha seleccionado una región
        if (regionSeleccionada == 0) {
            // Si no se ha seleccionado una región, deshabilitar el select de comunas
            $(".comunas").prop("disabled", true);
        } else {
            // Si se ha seleccionado una región, habilitar el select de comunas y cargar las comunas correspondientes a la región
            $(".comunas").prop("disabled", false);
            
            $.get("/static/json/regionesComunas.json", function(data) {
                // Filtrar las comunas de la región seleccionada
                var comunas = data.regions.find(function(region) {
                    return region.number === regionSeleccionada;
                }).communes;

                // Agregar las opciones al select de comunas
                $.each(comunas, function(i, comuna) {
                    $(".comunas").append(
                        "<option value=" + comuna.number + ">" + comuna.name + "</option>"
                    );
                });
            });
        }
    });
});