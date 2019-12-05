$(document).ready(function(){
    //inicializando o DB
if(window.indexedDB){
        var db =null;
        var objBanco = window.indexedDB.open("despesasApp",2);
        
        objBanco.onsuccess = function(evento){
            console.log ("Conexao ok");
            db = evento.target.result;

            //Consulta
            var tx = db.transaction(["despesas"],"readonly");
            var despesaColl = tx.objectStore("despesas")
        }
    }
})