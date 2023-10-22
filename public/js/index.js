const DATE = document.querySelector('#date');
const LIST = document.querySelector('#list');
const elemento = document.querySelector('#elemento')
const INPUT = document.querySelector('#input');
const BTNENTER = document.querySelector('#enter');
const CHECK = 'fa-check-circle';
const UNCHECK = 'fa-circle'; 
const LINETHROUGH = 'line-through'; 

let id;

let list = [];

const date = new Date()

DATE.innerHTML = date.toLocaleDateString('es-MX', {weekday: 'long', month: 'short', day:'numeric'})

function isTask(list){ 
    var mensajeElement = document.getElementById("task-list");
    if(list.length === 0){ 
        mensajeElement.textContent = "Aun no has agregado ninguna tarea";
    }else {
        mensajeElement.textContent = "Estas son tus tareas pendientes";
    }
}
isTask(list);

function addTask(task, id, realized, removed ){ 

    if (removed){ 
        return
    }

    const REALIZED = realized ?CHECK : UNCHECK;
    const LINE = realized ? LINETHROUGH: '';
    
    const elemento = 
    `<li id="elemento">
    <i class="far  ${REALIZED}" data="realizado" id="${id}"></i>
    <p class="text ${LINE}">${task}</p>
    <i class="fas fa-trash de"  data="eliminado" id="${id}"></i>
    </li>`

    LIST.insertAdjacentHTML("beforeend", elemento);
    isTask(list);
}


function realizedTask(element){ 
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector('.text').classList.toggle(LINETHROUGH);
    list[element.id].realized = list[element.id].realized ?false :true;
}

function removedTask(element){
    const taskId = element.id;
    
    // Verifica si el elemento existe en el array list
    if (list[taskId]) {
        element.parentNode.parentNode.removeChild(element.parentNode);
        list[taskId].removed = true;
        
        // Comprueba si todas las tareas han sido eliminadas
        if (list.every(task => task.removed)) {
            list = []; // Vacía el array
        }
        
        localStorage.setItem('List', JSON.stringify(list));
        
        isTask(list); // Llama a la función para actualizar el mensaje
    }
  
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
    isTask(list);
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
        isTask(list);
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
        isTask(list);
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