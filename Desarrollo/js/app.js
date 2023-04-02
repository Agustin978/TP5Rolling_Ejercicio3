let tareas = [];
let formulario = document.getElementById('formulario');
formulario.addEventListener('submit',compruebaFormulario);

class Tarea
{
    #id
    constructor(tarea, descripcion)
    {
        this.#id = Tarea.#incrementarID();
        this.tarea = tarea;
        this.descripcion = descripcion;
    }
    
    getTarea(){return this.tarea;}
    getDescripcion(){return this.descripcion;}
    get id(){return this.#id;}
    /*
    set tarea(nuevaTarea){this.tarea = nuevaTarea;}
    set descripcion(nuevaDescripcion){this.descripcion = nuevaDescripcion;}
    */
    static #incrementarID()
    {
        if(!this.lastID)
        {
            this.lastID = 1;
        }else
        {
            this.lastID++;
        }
        return this.lastID;
    }
}

function compruebaFormulario(e)
{
    e.preventDefault();
    let datoTarea = document.getElementById('ingresaTarea');
    let datoDescripcion = document.getElementById('ingresaDescripcion');
    let tarea = datoTarea.value;
    let descripcion = datoDescripcion.value;
    formulario.reset();
    //console.log(tarea);
    //console.log(descripcion);
    if(tarea.length < 2)
    {
        alert('No se ingreso correctamente la tarea. Intente nuevamente.');
    }else
    {
        let objTarea = new Tarea(tarea, descripcion);
        console.log(objTarea.getTarea());
        console.log(objTarea.getDescripcion());
        tareas.push(objTarea);
        cargaTareas();
    }
}

const cargaTareas = () =>
{
    let tareasHTML = '';
    tareas.map(tarea => {
        tareasHTML += creaTareaHTML(tarea.id, tarea.getTarea(), tarea.getDescripcion());
    })
    /*
    for(let tareaIngresada in tareas)
    {
        tareasHTML += creaTareaHTML(tareaIngresada.id, tareaIngresada.getTarea(), tareaIngresada.getDescripcion());
    }*/
    document.getElementById('tablaTareas').innerHTML = tareasHTML;
}

//let botones = document.getElementsByClassName();

const creaTareaHTML = (id, tarea, desc) =>
{
    let datoHTML;
    if( desc !== '')
    {
        //datoHTML = '<tr class="fs-4 fw-bold"><th>'+id+'</th><th>'+tarea+'</th><th><button class="btn btn-outline-success btn-sm" onclick="detalle('+desc+')">+</button></th><th><button class="btn btn-outline-danger btn-sm" onclick="eliminar(tarea)">Eliminar</button></th></tr>';
        datoHTML = '<tr class="fs-4 fw-bold"><th>'+id+'</th><th>'+tarea+'</th><th><button class="btn btn-outline-success btn-sm" onclick="detalle(\''+desc+'\')">+</button></th><th><button class="btn btn-outline-danger btn-sm" onclick="eliminar(\''+id+'\')">Eliminar</button></th></tr>';
    }else
    {
        datoHTML = '<tr class="fs-4 fw-bold"><th>'+id+'</th><th>'+tarea+'</th><th><button class="btn btn-outline-success btn-sm" disabled>+</button></th><th><button class="btn btn-outline-danger btn-sm" onclick="eliminar(\''+id+'\')">Eliminar</button></th></tr>';
    }
    return datoHTML;
}

let detalle = (desc) => 
{
    alert('Descripción de la tarea: '+desc);
}

let eliminar = (id) =>
{
    let tareasFiltradas = tareas.filter(tarea => tarea.id != id);
    tareas = tareasFiltradas;
    cargaTareas();
}