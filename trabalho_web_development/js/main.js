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

//notfound 
const notfound = document.getElementById("notfound");

//insert value using creating button
btncreate.onclick=(event)=>{
   let flag = bulkcreate(db.itens, {
        produto:    proname.value,
        fabricante: fabricante.value,
        preco:      preco.value 
    });

    proname.value = fabricante.value = preco.value = "";

    
    notfound.textContent = "";

    getData(db.itens,(data) => {
      userid.value = data.id + 1||1;
    });

    table();
    
    let insertmsg = document.querySelector(".insertmsg");

    getMsg(flag,insertmsg);
}

//create event on btn read
btnread.onclick = table;

// update event on btn update
btnupdate.onclick = () =>{
    const id = parseInt(userid.value || 0);

    if(id){
        db.itens.update(id,{
            produto:    proname.value,
            fabricante: fabricante.value,
            preco:      preco.value   
        }).then ((updated)=>{
            let get = updated ? true: false;

            let updatemsg =  document.querySelector(".updatemsg");
            
            getMsg(get,updatemsg);
            proname.value = fabricante.value = preco.value = "";

        })

        table();
    }
}

// delete event on btn delete
btndelete.confirm =()=>{
    
    // db.delete();
    // db = productdb("myDB",{
    //     itens:`++id,produto,fabricante,preco`
    // });
    // db.open();
    // table();
    // textID(userid);

    // let deletemsg =  document.querySelector(".deletemsg");
    // getMsg(true,deletemsg)
}

//window onload table
window.onload =() => {
    textID(userid);
}

function textID (textboxid){
    getData(db.itens,data =>{
        textboxid.value = data.id +1||1;
    })
}

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
                            i.setAttribute('data-id',data.id)
                            i.onclick = editbtn;
                        })
                    })

                    createEle("td",tr,td=>{
                        createEle("i",td,i=>{
                            i.className +="fas fa-trash btndelete"
                            i.setAttribute('data-id',data.id)
                            i.onclick = deletebtn;
                          })
                        })
                      })
        }else{
            notfound.textContent = "Nenhum registro encontrado no banco de dados....!!!";
        }

    })

}

function editbtn(event){
    
    let id = parseInt(event.target.dataset.id);
    db.itens.get(id,data=>{
        userid.value = data.id || 0;
        proname.value = data.produto || "";
        fabricante.value = data.fabricante || "";
        preco.value = data.preco || 0;
    })
}

function deletebtn(event){
    
    let id = parseInt(event.target.dataset.id);
    db.itens.delete(id,data=>{
        userid.value = data.id || 0;
        proname.value = data.produto || "";
        fabricante.value = data.fabricante || "";
        preco.value = data.preco || 0;
    })
    
    let deletemsg =  document.querySelector(".deletemsg");
    getMsg(true,deletemsg)
    table();
}

function getMsg (flag,element){
    if(flag){
        element.className += " movedown";

        setTimeout(()=>{
            element.classList.forEach(classname => {
                classname=="movedown"?undefined:element.classList.remove("movedown");
            });
        },4000);
    }
}