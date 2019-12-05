//window.onload = function () {
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
                var despesaColl = tx.objectStore("despesas");

                var request = despesaColl.openCursor();
                request.onerror = function (evento){
                    console.log("Erro na consulta");

               var tabela = document.getElementById("tabela")

                }
                // caso requisicao deu certo!
                request.onsuccess = function (evento){
                    var cursor = evento.target.result
                        if (cursor){
                            var linha = tabela.insertRow(-1);
                            var celData = linha.insertCell(0);
                            var celTipo = linha.insertCell(1);
                            var celDescricao = linha.insertCell(2);
                            var celValor = linha.insertCell(3);
                            var celBotoes = linha.insertCell(4);

                            var despesa = cursor.value;
                            console.log(despesa);
                            
                            sdata = despesa.data.substring(8,10)+"/"+
                            despesa.data.substring(5,7)+"/"+
                            despesa.data.substring(0,4);
                            celData.innerHTML = sdata;
                            celTipo.innerHTML = despesa.tipo;
                            celDescricao.innerHTML = despesa.descricao;
                            var sValor = "R$ "+despesa.valor
                            celValor.innerHTML = sValor.replace(".",",");
                            celBotoes.innerHTML = "<a class='btn btn-primary' href='editar.html?codigo="+despesa.codigo+"'>Editar</a><a class='btn btn-danger' href='apagar.html?codigo="+despesa.codigo+"'>Apagar</a>";

                            cursor.continue();
                        }
                }
            }
            
            objBanco.onerror = function(evento){
                console.log ("Conexao falhou")
            }
    
            objBanco.onupgradeneeded = function(evento){
                db = evento.target.result;
                var objDespesas = db.createObjectStore("despesas",
                { keypath:"codigo", autoIncrement:true });
            }
    }
});