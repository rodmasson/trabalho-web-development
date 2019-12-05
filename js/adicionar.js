window.onload = function () {
    var bttAdicDesp = document.getElementById("botAdicDesp");

    //inicializando o DB
    if(window.indexedDB){
        var db =null;
        var objBanco = window.indexedDB.open("despesasApp",2);
        
        objBanco.onsuccess = function(evento){
            console.log ("Conexao ok");
            db = evento.target.result;
        }

        objBanco.onerror = function(evento){
            console.log ("Conexao falhou")
        }

        objBanco.onupgradeneeded = function(evento){
            db = evento.target.result;
            var objDespesas = db.createObjectStore("despesas",
            {keypath:"codigo", autoIncrement:true});
        }

        bttAdicDesp.onclick = function(){
            var sData  = document.getElementById("data").value;
            var sTipo  = document.getElementById("tipo").value;
            var sDesc  = document.getElementById("desc").value;
            var fValor = parseFloat(document.getElementById("valor").value);
    
            //JSAON
            var despesa = {data: sData,
                           tipo: sTipo,
                           descricao: sDesc,
                           valor: fValor };
    
            console.log(despesa);

            var tx = db.transaction(["despesas"],"readwrite");
            var despesaColl = tx.objectStore("despesas");
            despesaColl.put(despesa);

            window.location.href = "index.html";
        }
    }

    // Evento do botao adicionar despesa
    bttAdicDesp.onmouseover = function (){
        bttAdicDesp.value = "Adicionando";
    }

    bttAdicDesp.onmouseout = function(){
        bttAdicDesp.value = "Adicionar despesa";
    }   
}