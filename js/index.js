var database = firebase.database();
var chilangoRef = database.ref("chilango");
var cancionesChild = chilangoRef.child("canciones");
var saludosChild = chilangoRef.child("saludos");

var fabSearch = document.getElementById('add');
var dialog = document.querySelector('dialog');
var btnBuscar = document.getElementById('btnBuscar');
var cajaResultado = document.getElementById('resultado');
fabSearch.addEventListener('click', function() {
    cajaResultado.innerHTML = "";
    dialog.showModal();
    /* Or dialog.show(); to show the dialog without a backdrop. */
});
dialog.querySelector('.close').addEventListener('click', function() {
    dialog.close();
});
btnBuscar.addEventListener('click', function() {
    buscarCancion($('#txtBuscar').val());
});

var cajaSaludos = document.getElementById('saludos-dos');
var cajaCanciones = document.getElementById('canciones-dos');
cancionesChild.orderByChild('votos').limitToLast(6).on('value', function(snapshot){        
    $("#canciones-dos").html(""); // Limpiamos el cotenedor de canciones
    snapshot.forEach(function(e){
        var obj = e.val();
        if(obj.nombre!=null){
            console.log("Canción: "+ obj.nombre);
            cajaCanciones.innerHTML = '<section class="mdl-cell mdl-cell--4-col section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">' +
                    '<div class="mdl-card mdl-cell mdl-cell--9-col-desktop mdl-cell--6-col-tablet mdl-cell--4-col-phone"><div class="mdl-card__supporting-text"><h4><b>Nombre:</b> '+ 
                    obj.nombre + "</h4><h4><b>Autor:</b> "+ 
                    obj.autor + "</h4><h4><b>Votos:</b> "+ 
                    obj.votos + "</h4></div></div>" + 
                    '<header class="section__play-btn mdl-cell mdl-cell--3-col-desktop mdl-cell--2-col-tablet mdl-cell--4-col-phone mdl-color--teal-100 mdl-color-text--white"><button onclick="remover(\''+e.key+'\')" class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"><i class="material-icons">delete_forever</i></button></header></section>' + cajaCanciones.innerHTML;
        }
    });
});

// Ordenar los saludos el más reciente de primero
/*saludosChild.on('value', function(snapshot){        
    $("#saludos-dos").html(""); // Limpiamos el cotenedor de saludos
    snapshot.forEach(function(e){
        var obj = e.val();
        var url = "data:image/jpeg;base64," + obj.url;
        var urlDef = url.trim();
        if(obj.url!=null){
            console.log("Saludos: "+ obj.detalle);
            cajaSaludos.innerHTML = '<section class="mdl-cell mdl-cell--4-col section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">' +
                    '<div class="mdl-card mdl-cell mdl-cell--9-col-desktop mdl-cell--6-col-tablet mdl-cell--4-col-phone"><div class="mdl-card__supporting-text"><h4><b>Emisor:</b> '+ 
                    obj.emisor + "</h4><h4><b>Receptor:</b> "+ 
                    obj.receptor + "</h4><h4><b>Detalle:</b> "+ 
                    obj.detalle + "</h4></div>" +
                    '<img src="'+ urlDef +'" class="imagen"></div>' +
                    '<header class="section__play-btn mdl-cell mdl-cell--3-col-desktop mdl-cell--2-col-tablet mdl-cell--4-col-phone mdl-color--teal-100 mdl-color-text--white"><button onclick="removerSaludo(\''+e.key+'\')" class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"><i class="material-icons">delete_forever</i></button></header></section>' + cajaSaludos.innerHTML;
        }else{
            console.log("Saludos: "+ obj.detalle);
            cajaSaludos.innerHTML = '<section class="mdl-cell mdl-cell--4-col section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">' +
                    '<div class="mdl-card mdl-cell mdl-cell--9-col-desktop mdl-cell--6-col-tablet mdl-cell--4-col-phone"><div class="mdl-card__supporting-text"><h4><b>Emisor:</b> '+ 
                    obj.emisor + "</h4><h4><b>Receptor:</b> "+ 
                    obj.receptor + "</h4><h4><b>Detalle:</b> "+ 
                    obj.detalle + "</h4></div>" +
                    '<img src="https://firebasestorage.googleapis.com/v0/b/pander-6374e.appspot.com/o/fotos%2Fdiscoteca.jpg?alt=media&token=cd89459b-cf8c-43a5-bb04-5e56eaf53a8b" class="imagen"></div>' +
                    '<header class="section__play-btn mdl-cell mdl-cell--3-col-desktop mdl-cell--2-col-tablet mdl-cell--4-col-phone mdl-color--teal-100 mdl-color-text--white"><button onclick="removerSaludo(\''+e.key+'\')" class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"><i class="material-icons">delete_forever</i></button></header></section>' + cajaSaludos.innerHTML;
            
        }
    });
});*/

// Método viejo, canciones sin ordenar
/*cancionesChild.on('value', function(snapshot){        
    $("#canciones-dos").html(""); // Limpiamos el cotenedor de canciones
    snapshot.forEach(function(e){
        var obj = e.val();
        if(obj.nombre!=null){
            console.log("Canción: "+ obj.nombre);
            $("#canciones-dos").append('<section class="mdl-cell mdl-cell--4-col section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">' +
                    '<div class="mdl-card mdl-cell mdl-cell--9-col-desktop mdl-cell--6-col-tablet mdl-cell--4-col-phone"><div class="mdl-card__supporting-text"><h4><b>Nombre:</b> '+ 
                    obj.nombre + "</h4><h4><b>Autor:</b> "+ 
                    obj.autor + "</h4><h4><b>Votos:</b> "+ 
                    obj.votos + "</h4></div></div>" + 
                    '<header class="section__play-btn mdl-cell mdl-cell--3-col-desktop mdl-cell--2-col-tablet mdl-cell--4-col-phone mdl-color--teal-100 mdl-color-text--white"><button onclick="remover(\''+e.key+'\')" class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"><i class="material-icons">delete_forever</i></button></header></section>');
        }
    });
});*/

saludosChild.limitToFirst(6).on('value', function(snapshot){        
    $("#saludos-dos").html(""); // Limpiamos el cotenedor de saludos
    snapshot.forEach(function(e){
        var obj = e.val();
        var url = "data:image/jpeg;base64," + obj.url;
        var urlDef = url.trim();
        if(obj.url!=null){
            console.log("Saludos: "+ obj.detalle);
            $("#saludos-dos").append('<section class="mdl-cell mdl-cell--4-col section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">' +
                    '<div class="mdl-card mdl-cell mdl-cell--9-col-desktop mdl-cell--6-col-tablet mdl-cell--4-col-phone"><div class="mdl-card__supporting-text"><h4><b>Emisor:</b> '+ 
                    obj.emisor + "</h4><h4><b>Receptor:</b> "+ 
                    obj.receptor + "</h4><h4><b>Detalle:</b> "+ 
                    obj.detalle + "</h4></div>" +
                    '<img src="'+ urlDef +'" class="imagen"></div>' +
                    '<header class="section__play-btn mdl-cell mdl-cell--3-col-desktop mdl-cell--2-col-tablet mdl-cell--4-col-phone mdl-color--teal-100 mdl-color-text--white"><button onclick="removerSaludo(\''+e.key+'\')" class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"><i class="material-icons">delete_forever</i></button></header></section>');
        }else{
            console.log("Saludos: "+ obj.detalle);
            $("#saludos-dos").append('<section class="mdl-cell mdl-cell--4-col section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">' +
                    '<div class="mdl-card mdl-cell mdl-cell--9-col-desktop mdl-cell--6-col-tablet mdl-cell--4-col-phone"><div class="mdl-card__supporting-text"><h4><b>Emisor:</b> '+ 
                    obj.emisor + "</h4><h4><b>Receptor:</b> "+ 
                    obj.receptor + "</h4><h4><b>Detalle:</b> "+ 
                    obj.detalle + "</h4></div>" +
                    '<img src="https://firebasestorage.googleapis.com/v0/b/pander-6374e.appspot.com/o/fotos%2Fdiscoteca.jpg?alt=media&token=cd89459b-cf8c-43a5-bb04-5e56eaf53a8b" class="imagen"></div>' +
                    '<header class="section__play-btn mdl-cell mdl-cell--3-col-desktop mdl-cell--2-col-tablet mdl-cell--4-col-phone mdl-color--teal-100 mdl-color-text--white"><button onclick="removerSaludo(\''+e.key+'\')" class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"><i class="material-icons">delete_forever</i></button></header></section>');
            
        }
    });
});

/*saludosChild.on('child_changed', function(snapshot) {
  console.log(snapshot.val());
  var obj = snapshot.val();
  cajaSaludos.innerHTML = '<section class="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">' +
                    '<div class="mdl-card mdl-cell mdl-cell--9-col-desktop mdl-cell--6-col-tablet mdl-cell--4-col-phone"><div class="mdl-card__supporting-text"><h4>Emisor: '+ 
                    obj.emisor + "</h4><h4>Receptor: "+ 
                    obj.receptor + "</h4><h4>Detalle: "+ 
                    obj.detalle + "</h4></div>" +
                    '<img src="'+ obj.url +'" class="imagen"></div>' +
                    '<header class="section__play-btn mdl-cell mdl-cell--3-col-desktop mdl-cell--2-col-tablet mdl-cell--4-col-phone mdl-color--teal-100 mdl-color-text--white"><button onclick="removerSaludo(\''+snapshot.key+'\')" class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"><i class="material-icons">delete_forever</i></button></header></section>' + cajaSaludos.innerHTML;
  console.log(cajaSaludos);
});*/

function remover(key){
    console.log("Key: "+ key);
    cancionesChild.child(key).remove(function(error){
       console.log("Eliminado el nodo: "+ key); 
    });
}

function removerSaludo(key){
    console.log("Key: "+ key);
    saludosChild.child(key).remove(function(error){
       console.log("Eliminado el nodo: "+ key); 
    });
}

function buscarCancion(texto){
    var res = 0;
    var obj = null;
    var obj2 = null;
    cad1 = quitarAcentos(texto.toLowerCase());
    console.log("Nombre de la canción: "+ texto);
    cancionesChild.on('value', function(snapshot){
        snapshot.forEach(function(e){
            obj = e.val();
            cad2 = quitarAcentos(obj.nombre.toLowerCase());
            if(cad1==cad2){
                res = 1;
                obj2 = obj;
            }
        });
    });
    console.log("Res: "+ res);
    if(res == 1){
        console.log("Búsqueda: "+ obj2.nombre +" "+ obj2.autor);
        cajaResultado.innerHTML = "<h4><b>Nombre:</b> "+ 
                obj2.nombre + "</h4><h4><b>Autor:</b> "+ 
                obj2.autor + "</h4><h4><b>Votos:</b> "+ 
                obj2.votos + "</h4></div></div>";
    }else{
        cajaResultado.innerHTML = "<h4><b>No hay datos</b></h4>";
    }
    $('#txtBuscar').val("");
}

function quitarAcentos(cadena){
    cadena = cadena.replace(/á/gi,"a");
    cadena = cadena.replace(/é/gi,"e");
    cadena = cadena.replace(/í/gi,"i");
    cadena = cadena.replace(/ó/gi,"o");
    cadena = cadena.replace(/ú/gi,"u");
    return cadena;
}