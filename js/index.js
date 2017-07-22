var database = firebase.database();
var chilangoRef = database.ref("chilango");
var cancionesChild = chilangoRef.child("canciones").orderByChild("votos");

function mostrarDatos(){
    cancionesChild.on("child_added", snap => {
    var id = snap.key;
    var datos = snap.val();
    console.log(id);
    console.log(datos.autor);

    $("#canciones").append('<section class="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">' +
                        '<div class="mdl-card mdl-cell mdl-cell--9-col-desktop mdl-cell--6-col-tablet mdl-cell--4-col-phone"><div class="mdl-card__supporting-text"><h2>Nombre: '+ 
                        datos.nombre + "</h2><h2>Autor: "+ 
                        datos.autor + "</h2><h2>Votos: "+ 
                        datos.votos + "</h2></div></div>" + 
                        '<header class="section__play-btn mdl-cell mdl-cell--3-col-desktop mdl-cell--2-col-tablet mdl-cell--4-col-phone mdl-color--teal-100 mdl-color-text--white"><button onclick="eliminarDisco(\''+id+'\')" class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"><i class="material-icons">delete_forever</i></button></header></section>');
    });
}

mostrarDatos();

cancionesChild.on('child_changed', function(data) {
    console.log("Detectado cambio en ", data.key);
    console.log("El nuevo valor es ", data.val());
    refresh();
});


function eliminarDisco(id){
    console.log("Borrando: "+id);
}


function refresh(){
    location.reload(true);
}
