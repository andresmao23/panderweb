var database = firebase.database();
var chilangoRef = database.ref("chilango");
var cancionesChild = chilangoRef.child("canciones");

cancionesChild.on('value', function(snapshot){        
    $("#canciones").html(""); // Limpiamos el cotenedor de canciones
    
    snapshot.forEach(function(e){
        var obj= e.val();
        if(obj.nombre!=null){
            console.log("Canción: "+ obj.nombre);
            $("#canciones").append('<section class="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">' +
                    '<div class="mdl-card mdl-cell mdl-cell--9-col-desktop mdl-cell--6-col-tablet mdl-cell--4-col-phone"><div class="mdl-card__supporting-text"><h2>Nombre: '+ 
                    obj.nombre + "</h2><h2>Autor: "+ 
                    obj.autor + "</h2><h2>Votos: "+ 
                    obj.votos + "</h2></div></div>" + 
                    '<header class="section__play-btn mdl-cell mdl-cell--3-col-desktop mdl-cell--2-col-tablet mdl-cell--4-col-phone mdl-color--teal-100 mdl-color-text--white"><button onclick="remover(\''+e.key+'\')" class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"><i class="material-icons">delete_forever</i></button></header></section>');
        }
    });
});

function remover(key){
    console.log("Key: "+ key);
    cancionesChild.child(key).remove(function(error){
       console.log("Eliminado el nodo: "+ key); 
    });
}
    