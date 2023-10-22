const DATE = document.querySelector('#date');
const LIST = document.querySelector('#list');
const INPUT = document.querySelector('#input');
const BTNENTER = document.querySelector('#enter');
const CHECK = 'fa-check-circle';
const UNCHECK = 'fa-circle'; 
const LINETHROUGH = 'line-through'; 

let id;

let list;

const date = new Date()

DATE.innerHTML = date.toLocaleDateString('es-MX', {weekday: 'long', month: 'short', day:'numeric'})

function addTask(task, id, realized, removed ){ 

    if (removed){ 
        return
    }

    const REALIZED = realized ?CHECK : UNCHECK;
    const LINE = realized ? LINETHROUGH: '';
    
    const element = 
    `<li id="elemento">
    <i class="far  ${REALIZED}" data="realizado" id="${id}"></i>
    <p class="text ${LINE}">${task}</p>
    <i class="fas fa-trash de"  data="eliminado" id="${id}"></i>
    </li>`

    LIST.insertAdjacentHTML("beforeend", element);
}


function realizedTask(element){ 
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector('.text').classList.toggle(LINETHROUGH);
    list[element.id].realized = list[element.id].realized ?false :true;
}

function removedTask(element){
    element.parentNode.parentNode.removeChild(element.parentNode)
    list[element.id].removed = true;
}

BTNENTER.addEventListener('click',  () =>{
    const task = INPUT.value;
    if(task){ 
        addTask(task,id,false,false);
        list.push({
            name: task, 
            id: id,
            realized: false,
            removed: false
     })
    }
    localStorage.setItem('List',JSON.stringify(list));
    INPUT.value="";
    id++;
});


// Funtion key Enter
document.addEventListener('keyup', function(event){ 
    if(event.key=='Enter'){ 
        const task = INPUT.value;
        if(task){ 
            addTask(task,id,false,false);
            list.push({
                name: task, 
                id: id,
                realized: false,
                removed: false,
         })
        }
        localStorage.setItem('List',JSON.stringify(list));
        INPUT.value="";   
        id++ 
    }
});    

LIST.addEventListener('click', function(event){ 
    const element = event.target;
    const elementData = element.attributes.data.value;

    if(elementData == 'realizado'){ 
        realizedTask(element);
    }
    else if (elementData == 'eliminado'){ 
        removedTask(element);
      } 
    localStorage.setItem('List',JSON.stringify(list));
 });

 let data = localStorage.getItem('List')
 if(data){ 
    list = JSON.parse(data);
    id = list.length;
    chargeList(list);
 }else { 
    list = [];
    id = 0;

 }

 function chargeList(array){
    array.forEach(function (item){
        addTask(item.name, item.id, item.realized, item.removed);
    });
 }