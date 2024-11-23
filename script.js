const cell_height = 60;
const cell_width = 60; 

const table = document.createElement('table');
const jogo = document.querySelector('.jogo');
var table_array = [];
var table_array_cont = [];
var pausa = false;
var loop = setInterval(() => {}, 10);

function criar() {
    jogo.innerHTML = "";
    for (let i = 0; i < cell_height; i++) {
    let line = [];
    let l = [];
    let tr = document.createElement('tr');
    for (let j = 0; j < cell_width; j++) {
        td = document.createElement('td');
        td.setAttribute('life', 0)
        
        tr.appendChild(td);
        line.push(td);
        l.push(0);
        td.addEventListener('click', (e) => {
            if (e.target.getAttribute('life') == "0") {
                e.target.setAttribute('life', '1');
            } else {
                e.target.setAttribute('life', '0');
            }
        })
    }
    table_array.push(line);
    table.appendChild(tr);
    table_array_cont.push(l);
}

jogo.appendChild(table);

}


function aleatorizar() {
    for (let i = 0; i < table_array.length; i ++) {
        for (let j = 0; j < table_array[i].length; j++) {
            if (Math.floor(Math.random() * 10) + 1 < 3) {
                table_array[i][j].setAttribute('life', '1')
            } else {
                table_array[i][j].setAttribute('life', '0');
            }
        }
    }
    
}

function limpar() {
    for (let i = 0; i < table_array.length; i ++) {
        for (let j = 0; j < table_array[i].length; j++) {
            table_array[i][j].setAttribute('life', '0');
        }
    }
}

function checkLife(y, x) {
    let cont = 0;
    if (y - 1 >= 0) {
        if (x - 1 >= 0) {if (table_array[y - 1][x - 1].getAttribute('life') == '1') {cont += 1}};
        if (x + 1 < cell_width) {if (table_array[y - 1][x + 1].getAttribute('life') == '1') {cont += 1}};
        if (table_array[y - 1][x].getAttribute('life') == '1') {cont += 1}; 
    }
    if (y + 1 < cell_height) {
        if (x - 1 >= 0) {if (table_array[y + 1][x - 1].getAttribute('life') == '1') {cont += 1}};
        if (x + 1 < cell_width) {if (table_array[y + 1][x + 1].getAttribute('life') == '1') {cont += 1}};
        if (table_array[y + 1][x].getAttribute('life') == '1') {cont += 1};
    }
    
    if (x - 1 >= 0) {if (table_array[y][x - 1].getAttribute('life') == '1') {cont += 1}};
    if (x + 1 < cell_width) {if (table_array[y][x + 1].getAttribute('life') == '1') {cont += 1}};
    
    // if (table_array[y][x].getAttribute('life') == '1') {
    //     if (cont >= 4 || cont <= 1) table_array[y][x].setAttribute('life', '0');
    // }
    // if (table_array[y][x].getAttribute('life') == '0' && cont == 3) table_array[y][x].setAttribute('life', '1');
    table_array_cont[y][x] = cont;
    // console.log(table_array_cont[y][x]);
}

function executeLife(y, x) {
    let cont = table_array_cont[y][x];
    if (table_array[y][x].getAttribute('life') == '1') {
        if (cont >= 4 || cont <= 1) table_array[y][x].setAttribute('life', '0');
    }
    if (table_array[y][x].getAttribute('life') == '0' && cont == 3) table_array[y][x].setAttribute('life', '1');
}

function checkLifes() {
    for (let i = 0; i < table_array.length; i ++) {
        for (let j = 0; j < table_array[i].length; j++) {
            checkLife(i, j);
        }
    }
}

function executeLifes() {
    for (let i = 0; i < table_array.length; i ++) {
        for (let j = 0; j < table_array[i].length; j++) {
            executeLife(i, j);
        }
    }
}

function passo() {
    checkLifes();
    executeLifes();

}

// setInterval(() => {
//     if (pausa) {
//         for (let i = 0; i < table_array.length; i ++) {
//             for (let j = 0; j < table_array[i].length; j++) {
//                 if (table_array[i][j].getAttribute('life') == '0') {
//                     table_array[i][j].setAttribute('life', '1');
//                 } else {
//                     table_array[i][j].setAttribute('life', '0');
//                 }
//             }
//         }
//     }
// }, 100)

function criarLoop(time) {
clearInterval(loop);
loop = setInterval(() => {
    if (pausa) {
        passo()
    }
}, time)
}

criarLoop(100);
criar()

