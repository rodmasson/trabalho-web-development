import productdb,{
    bulkcreate,
    getData,
    createEle
} from './Module.js';


let db = productdb("myDB",{
    itens:`++id,produto,fabricante,preco`
});

//input tags
const userid     = document.getElementById("userid");
const proname    = document.getElementById("proname");
const fabricante = document.getElementById("fabricante");
const preco      = document.getElementById("preco");

//buttons
const btncreate = document.getElementById("btn-create");
const btnread   = document.getElementById("btn-read");
const btnupdate = document.getElementById("btn-update");
const btndelete = document.getElementById("btn-delete");

//insert value using creating button
btncreate.onclick=(event)=>{
   let flag = bulkcreate(db.itens, {
        produto:proname.value,
        fabricante: fabricante.value,
        preco: preco.value 
    });

    proname.value    = "";
    fabricante.value = "";
    preco.value      = "";

    getData(db.itens,(data) => {
      userid.value = data.id + 1 || 1;
    });
}

//create event on btn read
btnread.onclick = table;

function table(){
    const tbody = document.getElementById("tbody");

    while (tbody.hasChildNodes()){
        tbody.removeChild(tbody.firstChild);
    }

    getData(db.itens,(data) => {
        if(data){
            createEle("tr",tbody,tr =>{
                for(const value in data){
                    createEle("td",tr,td =>{
                        td.textContent = data[value];
                    })
                }
                    createEle("td",tr,td=>{
                        createEle("i",td,i=>{
                            i.className +="fas fa-edit btnedit"
                        })
                    })

                    createEle("td",tr,td=>{
                        createEle("i",td,i=>{
                            i.className +="fas fa-trash btndelete"
                      })
                    })
            })
        }

    })

}