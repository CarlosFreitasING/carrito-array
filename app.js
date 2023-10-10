console.log("CONECTADO");

/* <li class="list-group-item d-flex justify-content-between align-items-center">
    <span class="lead">Frutilla</span>
    <span class="badge bg-primary rounded-pill">12</span>
</li> */

const carrito = document.getElementById('carrito');
const template = document.getElementById('template');
const footer = document.getElementById('footer')
const templateFooter = document.getElementById('templateFooter')
const fragment = document.createDocumentFragment();
//const btnBotones = document.querySelectorAll('.card .btn');
console.log(template)

let carritoArray = [];

const agregarAlCarrito = (e) => {
    //console.log(e.target.dataset.fruta); 
    const producto = {
        titulo: e.target.dataset.fruta,
        id: e.target.dataset.fruta,
        cantidad: 1,
        precio: parseInt(e.target.dataset.precio)
    };

    const indice = carritoArray.findIndex((item) => item.id === producto.id);
    // console.log(indice);

    if(indice === -1){
        carritoArray.push(producto);
    }else{
        carritoArray[indice].cantidad ++;
        //carritoArray[indice].precio = carritoArray[indice].cantidad * producto.precio;
    };

    pintarCarrito();
};

const pintarCarrito = () => {
    carrito.textContent =""; //recetea el ul

    carritoArray.forEach((item) => { 
        const clone = template.content.cloneNode(true); //creo el clon del template
        clone.querySelector('.text-white .lead').textContent = item.titulo; //inserto el titulo en el clon del template
        clone.querySelector('.badge').textContent = item.cantidad; //inserto la cantidad del clon del template
        clone.querySelector('div .lead span').textContent = item.precio * item.cantidad;
        
        clone.querySelector(".btn-success").dataset.id = item.id;
        clone.querySelector(".btn-danger").dataset.id = item.id;

        fragment.appendChild(clone); //agrego el template clon editado al fragment para evitar reflow
    });
    
    carrito.appendChild(fragment); //cuando termina ahora si agredo el fragmento al carrito del DOM 

    pintarFooter();
}

const pintarFooter = () => {
    //console.log("pintar footer");
    footer.textContent = ""; //recetea el footer

    const total = carritoArray.reduce((acm, current) => 
        acm + current.cantidad * current.precio, 0
    );
    //console.log("TOTAL:",total);
    if(total === 0){
        footer.textContent = "";
    }else{
        const clone = templateFooter.content.cloneNode(true); //creo el clon del template
        clone.querySelector('span').textContent = total; 
        
        footer.appendChild(clone); //empujo directo al footer porque no es un ciclo repetitivo y no vale la pena usar fragment
    };
};

const btnAumentar = ((e)=>{
    //console.log("me diste click", e.target.dataset.id);
    carritoArray = carritoArray.map((item => {
        if(item.id === e.target.dataset.id){
            item.cantidad ++;
        };
        return item; 
    }));
    pintarCarrito();
});

const btnDisminuir = ((e) => {
    carritoArray = carritoArray.filter(item => {
        if(item.id === e.target.dataset.id){

            if(item.cantidad > 0){
                item.cantidad --;
                if(item.cantidad === 0){
                    return
                }else{
                    return item;
                };
            }
        }else{
            return item;
        };
    });
    pintarCarrito();
});

const btnCompra = ((e) => {
    carritoArray = [];
    pintarCarrito();
});

//btnBotones.forEach((btn) => btn.addEventListener("click",agregarAlCarrito)); //agrego un adeventlistener a cada boton

document.addEventListener('click', e => {
    //console.log(e.target.matches(".card .btn-outline-primary"));
    if(e.target.matches(".card .btn-outline-primary")){
        //console.log('ejecutar agregar al carro')
        agregarAlCarrito(e);
    };
    //console.log(e.target.matches(".list-group-item .btn-success"));
    if(e.target.matches("#carrito .list-group-item .btn-success")){
        btnAumentar(e);
    };
    if(e.target.matches("#carrito .list-group-item .btn-danger")){
        btnDisminuir(e);
    };
    //console.log(e.target.matches("#footer .btn-outline-info"));
    if(e.target.matches("#footer .btn-outline-info")){
        btnCompra(e);
    };
});


