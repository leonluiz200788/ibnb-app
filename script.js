const week = document.getElementById('week');
const date = document.getElementById('date');
const pulpito = document.getElementById('pulpito');
const pregador = document.getElementById('pregador');
const devocional = document.getElementById('devocional');
const dirigente = document.getElementById('dirigente');
const avisosList = document.getElementById('avisosList');
const notasList = document.getElementById('notasList');
const ordemList = document.getElementById('ordemList');

function fillAvisos(avisosArray) {

    avisosList.innerHTML = ''; // limpa antes de preencher

    if (!avisosArray || avisosArray.length === 0) {
        avisosList.innerHTML = `
            <div class="list-item empty">
                <span>Nenhum aviso</span>
            </div>
        `;
        return;
    }

    avisosArray.forEach((aviso, index) => {
        const item = document.createElement('div');
        item.classList.add('list-item');

        item.innerHTML = `
            <span class="badge">${index + 1}</span>
            <span class="text">${aviso}</span>
        `;

        avisosList.appendChild(item);
    });
}

function fillNotas(notasArray) {

    notasList.innerHTML = ''; // limpa antes de preencher

    if (!notasArray || notasArray.length === 0) {
        notasList.innerHTML = `
            <div class="list-item empty">
                <span>Nenhuma nota</span>
            </div>
        `;
        return;
    }

    notasArray.forEach((nota, index) => {

        const item = document.createElement('div');
        item.classList.add('list-item');

        item.innerHTML = `
            <span class="badge">${index + 1}</span>
            <span class="text">${nota}</span>
        `;

        notasList.appendChild(item);

    });
}

function fillOrdem(ordem) {

    ordemList.innerHTML = '';


    if (!ordem || ordem.length === 0) {
        ordemList.innerHTML = `
            <div class="list-item empty">
                <span>Nenhuma ordem</span>
            </div>
        `;
        return;
    }

    let index = 1;

    while (ordem[`Item${index}`]) {

        const itemText = ordem[`Item${index}`];
        const descriptionText = ordem[`Description${index}`];

        const itemDiv = document.createElement('div');
        itemDiv.classList.add('list-item');

        let html = `
            <span class="badge">${index}</span>
            <div class="text-wrapper">
                <span class="text">${itemText}</span>
                ${descriptionText && descriptionText.trim() !== ''
                ? `<p class="description">${descriptionText}</p>`
                : ''
            }
            </div>
        `;

        itemDiv.innerHTML = html;
        ordemList.appendChild(itemDiv);

        index++;
    }
}

async function fillFields(program) {

    week.textContent = program.SEMANA + ' ' + 'Semana';
    date.textContent = program.DATA;
    pulpito.textContent = program.PROG_PULPITO;
    pregador.textContent = program.PREGADOR;
    devocional.textContent = program.PROG_DEVOCIONAL;
    dirigente.textContent = program.DIRIGENTE;

    fillAvisos(program.AVISOS_ARRAY);
    fillNotas(program.NOTAS_ARRAY);
    fillOrdem(program.ORDEM);

    return true;

}

async function getProgram() {

    const username = "ibnb_dev";
    const pass = "1bnb_d3v";
    const auth = btoa(`${username}:${pass}`);

    const response = await fetch('https://ibnb-backend-n8n.onrender.com/webhook/get-program', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${auth}`
        }
    });

    const program = await response.json();

    return await fillFields(program);

}

async function startPage() {

    let programLoaded = await getProgram();

    if (!programLoaded) {
        console.error('Erro ao carregar o programa');
        return;
    }

    document.querySelector('.splash-screen').style.display = 'none';
    document.querySelector('.app').style.display = 'block';

}

startPage();