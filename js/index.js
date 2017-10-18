var database = firebase.database();
var chilangoRef = database.ref("chilango");
var cancionesChild = chilangoRef.child("canciones");
var saludosChild = chilangoRef.child("saludos");

//var cajaSaludos = document.getElementById('saludos');

cancionesChild.on('value', function(snapshot){        
    $("#canciones-dos").html(""); // Limpiamos el cotenedor de canciones
    snapshot.forEach(function(e){
        var obj = e.val();
        if(obj.nombre!=null){
            console.log("Canción: "+ obj.nombre);
            $("#canciones-dos").append('<section class="mdl-cell mdl-cell--4-col section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">' +
                    '<div class="mdl-card mdl-cell mdl-cell--9-col-desktop mdl-cell--6-col-tablet mdl-cell--4-col-phone"><div class="mdl-card__supporting-text"><h2>Nombre: '+ 
                    obj.nombre + "</h2><h2>Autor: "+ 
                    obj.autor + "</h2><h2>Votos: "+ 
                    obj.votos + "</h2></div></div>" + 
                    '<header class="section__play-btn mdl-cell mdl-cell--3-col-desktop mdl-cell--2-col-tablet mdl-cell--4-col-phone mdl-color--teal-100 mdl-color-text--white"><button onclick="remover(\''+e.key+'\')" class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"><i class="material-icons">delete_forever</i></button></header></section>');
        }
    });
});

saludosChild.on('value', function(snapshot){        
    $("#saludos-dos").html(""); // Limpiamos el cotenedor de saludos
    snapshot.forEach(function(e){
        var obj = e.val();
        if(obj.url!=null){
            console.log("Saludos: "+ obj.detalle);
            $("#saludos-dos").append('<section class="mdl-cell mdl-cell--4-col section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">' +
                    '<div class="mdl-card mdl-cell mdl-cell--9-col-desktop mdl-cell--6-col-tablet mdl-cell--4-col-phone"><div class="mdl-card__supporting-text"><h4>Emisor: '+ 
                    obj.emisor + "</h4><h4>Receptor: "+ 
                    obj.receptor + "</h4><h4>Detalle: "+ 
                    obj.detalle + "</h4></div>" +
                    '<img src="'+ obj.url +'" class="imagen"></div>' +
                    '<header class="section__play-btn mdl-cell mdl-cell--3-col-desktop mdl-cell--2-col-tablet mdl-cell--4-col-phone mdl-color--teal-100 mdl-color-text--white"><button onclick="removerSaludo(\''+e.key+'\')" class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"><i class="material-icons">delete_forever</i></button></header></section>');
        }else{
            console.log("Saludos: "+ obj.detalle);
            $("#saludos-dos").append('<section class="mdl-cell mdl-cell--4-col section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">' +
                    '<div class="mdl-card mdl-cell mdl-cell--9-col-desktop mdl-cell--6-col-tablet mdl-cell--4-col-phone"><div class="mdl-card__supporting-text"><h4>Emisor: '+ 
                    obj.emisor + "</h4><h4>Receptor: "+ 
                    obj.receptor + "</h4><h4>Detalle: "+ 
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
    