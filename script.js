const inputA = document.getElementById('a');
const inputB = document.getElementById('b');
const inputC = document.getElementById('c');
const btnCalcular = document.getElementById('calcular');
const resultadoDiv = document.getElementById('resultado');
const graficoDiv = document.getElementById('grafico'); 
const historicoDiv = document.getElementById('historico');
const themeToggleBtn = document.getElementById('themeToggle');
const body = document.body;

const formatar = (num) => parseFloat(num.toFixed(4));

function exibirAlerta(mensagem) {
    resultadoDiv.innerHTML = `<div class="alerta-erro"><strong>Atenção!</strong> ${mensagem}</div>`;
    graficoDiv.innerHTML = '';
}

function salvarHistorico(a, b, c, equacaoFormatada, raizes) {
    const historicoAtual = JSON.parse(localStorage.getItem('bhaskaraHistorico')) || [];
    
    const novoRegistro = {
        a: formatar(a),
        b: formatar(b),
        c: formatar(c),
        equacao: equacaoFormatada,
        raizes: raizes.length > 0 ? raizes.join(', ') : "Complexas",
        timestamp: new Date().toLocaleString('pt-BR')
    };
    
    historicoAtual.unshift(novoRegistro);
    
    if (historicoAtual.length > 10) {
        historicoAtual.pop();
    }
    
    localStorage.setItem('bhaskaraHistorico', JSON.stringify(historicoAtual));
    renderizarHistorico(); 
}

function renderizarHistorico() {
    if (!historicoDiv) return;

    const historico = JSON.parse(localStorage.getItem('bhaskaraHistorico')) || [];
    
    if (historico.length === 0) {
        historicoDiv.innerHTML = '<p class="texto-secundario" style="text-align: center; font-style: italic;">Nenhum cálculo no histórico.</p>';
        return;
    }
    
    let htmlHistorico = `<ul class="lista-historico">`;

    // A numeração (index + 1) foi removida daqui
    historico.forEach((item) => { 
        htmlHistorico += `
            <li>
                <span class="eq-historico">${item.a}x² + ${item.b}x + ${item.c} = 0</span>
                <span class="raizes-historico">Raízes: ${item.raizes}</span>
                <span class="data-historico">(${item.timestamp})</span>
            </li>
        `;
    });
    
    htmlHistorico += `</ul><button id="limparHistorico" class="btn-secundario">Limpar Histórico</button>`;
    
    historicoDiv.innerHTML = htmlHistorico;
    
    const btnLimpar = document.getElementById('limparHistorico');
    if (btnLimpar) {
        btnLimpar.addEventListener('click', limparHistorico);
    }
}

function limparHistorico() {
    localStorage.removeItem('bhaskaraHistorico');
    renderizarHistorico();
}

function toggleTheme() {
    if (body.classList.contains('light-mode')) {
        body.classList.replace('light-mode', 'dark-mode');
        localStorage.setItem('theme', 'dark-mode');
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        body.classList.replace('dark-mode', 'light-mode');
        localStorage.setItem('theme', 'light-mode');
        themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }
    calcularBhaskara(false);
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light-mode';
    body.classList.add(savedTheme);
    themeToggleBtn.innerHTML = savedTheme === 'dark-mode' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

function calcularBhaskara(updateHistory = true) {
    const a = parseFloat(inputA ? inputA.value : 1); 
    const b = parseFloat(inputB ? inputB.value : -5);
    const c = parseFloat(inputC ? inputC.value : 6);
    
    if (resultadoDiv) resultadoDiv.innerHTML = '';
    if (graficoDiv) graficoDiv.innerHTML = ''; 

    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        exibirAlerta("Por favor, insira valores numéricos válidos para todos os coeficientes (a, b, c).");
        return;
    }

    if (a === 0) {
        exibirAlerta("O coeficiente 'a' deve ser diferente de zero para ser uma equação de segundo grau (ax² + bx + c = 0).");
        return;
    }
    
    const delta = b * b - 4 * a * c;
    
    const eq_a = (a === 1) ? "x^2" : (a === -1) ? "-x^2" : `${formatar(a)}x^2`;
    const eq_b_val = formatar(b);
    const eq_c_val = formatar(c);

    let eq_b_str = "";
    if (eq_b_val !== 0) {
        eq_b_str = (eq_b_val > 0) ? `+ ${eq_b_val}x` : `- ${Math.abs(eq_b_val)}x`;
    }

    let eq_c_str = "";
    if (eq_c_val !== 0) {
        eq_c_str = (eq_c_val > 0) ? `+ ${eq_c_val}` : `- ${Math.abs(eq_c_val)}`;
    }
    const equacaoCompleta = `${eq_a} ${eq_b_str} ${eq_c_str} = 0`;
    
    let htmlResultado = `
        <div class="equacao-box">
            <p>Equação Analisada:</p>
            <p>$$${equacaoCompleta}$$</p>
        </div>
        
        <h3 class="secao-titulo">1. Cálculo do Discriminante ($\\Delta$)</h3>
        
        <div class="calculo-passo">
            <p>Fórmula: $$\\Delta = b^2 - 4ac$$</p>
            <p style="margin-top: 5px; font-weight: 600;">Cálculo: $$\\Delta = (${formatar(b)})^2 - 4 \\cdot (${formatar(a)}) \\cdot (${formatar(c)}) = ${formatar(delta)}$$</p>
            <p style="margin-top: 10px; font-weight: 800;">Resultado: $$\\mathbf{\\Delta = ${formatar(delta)}}$$</p>
        </div>

        <h3 class="secao-titulo">2. Cálculo das Raízes (x)</h3>
        <p style="margin-bottom: 10px;">Fórmula: $$x = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}$$</p>
    `;

    let raizes = [];
    
    if (delta > 0) {
        const raizDelta = Math.sqrt(delta);
        const denominador = 2 * a;
        const x1 = (-b + raizDelta) / denominador;
        const x2 = (-b - raizDelta) / denominador;
        raizes = [formatar(x1), formatar(x2)];
        
        htmlResultado += `
            <p class="analise-positiva">Análise: $\\Delta > 0$ (${formatar(delta)}). Duas raízes reais e distintas.</p>
            
            <div class="grid-raizes">
                <div class="calculo-passo">
                    <p style="font-weight: 700;">Raiz $x_1$ (+):</p>
                    <p style="margin-top: 5px;">$$x_1 = \\frac{${formatar(-b)} + \\sqrt{${formatar(delta)}}}{${formatar(denominador)}} = \\mathbf{${formatar(x1)}}$$</p>
                </div>
                <div class="calculo-passo">
                    <p style="font-weight: 700;">Raiz $x_2$ (-):</p>
                    <p style="margin-top: 5px;">$$x_2 = \\frac{${formatar(-b)} - \\sqrt{${formatar(delta)}}}{${formatar(denominador)}} = \\mathbf{${formatar(x2)}}$$</p>
                </div>
            </div>

            <p class="solucao-final">Conjunto Solução: $$S = \\{${formatar(x2)}; ${formatar(x1)}\\}$$</p>
        `;
        
    } else if (delta === 0) {
        const x = -b / (2 * a);
        raizes = [formatar(x)];
        
        htmlResultado += `
            <p class="analise-neutra">Análise: $\\Delta = 0$. Uma única raiz real (ou duas raízes iguais).</p>
            
            <div class="calculo-passo">
                <p style="font-weight: 700;">Raiz Única ($x$):</p>
                <p style="margin-top: 5px;">$$x = \\frac{${formatar(-b)}}{${formatar(2 * a)}} = \\mathbf{${formatar(x)}}$$</p>
            </div>

            <p class="solucao-final">Conjunto Solução: $$S = \\{${formatar(x)}\\}$$</p>
        `;
        
    } else {
        const parteReal = -b / (2 * a);
        const parteImaginaria = Math.sqrt(-delta) / (2 * a);
        
        const x1_complexo = `${formatar(parteReal)} + ${formatar(parteImaginaria)}i`;
        const x2_complexo = `${formatar(parteReal)} - ${formatar(parteImaginaria)}i`;
        
        htmlResultado += `
            <p class="analise-negativa">Análise: $\\Delta < 0$ (${formatar(delta)}). Duas raízes complexas e conjugadas.</p>
            
            <p class="texto-secundario">A fórmula resulta em: $$x = \\frac{-b}{2a} \\pm \\frac{\\sqrt{|\\Delta|}}{2a}i$$</p>

            <div class="complexas-box">
                <p style="font-weight: 700;">Raízes Complexas:</p>
                <p style="margin-top: 5px;">$x_1 = \\mathbf{${x1_complexo}}$</p>
                <p>$x_2 = \\mathbf{${x2_complexo}}$</p>
            </div>
            <p class="analise-negativa texto-centro" style="font-weight: 600;">A parábola não intercepta o eixo X.</p>
        `;
    }

    if (resultadoDiv) resultadoDiv.innerHTML = htmlResultado;
    
    if (typeof MathJax !== 'undefined' && MathJax.typesetPromise) {
        MathJax.typesetPromise([resultadoDiv]).catch((err) => console.error("MathJax Error:", err));
    }

    if (graficoDiv) {
        plotarGrafico(a, b, c, raizes, delta);
    }
    
    if (updateHistory) {
        salvarHistorico(a, b, c, equacaoCompleta, raizes);
    }
}

function plotarGrafico(a, b, c, raizes, delta) {
    const xv = -b / (2 * a);
    const yv = a * xv * xv + b * xv + c;

    const rangeFactor = 4;
    let xMin = xv - rangeFactor;
    let xMax = xv + rangeFactor;
    
    if (raizes.length > 0) {
        const minRoot = Math.min(...raizes);
        const maxRoot = Math.max(...raizes);
        xMin = Math.min(xMin, minRoot - 1.5);
        xMax = Math.max(xMax, maxRoot + 1.5);
    }
    
    if (xMax - xMin < 4) { xMax += 2; xMin -= 2; }

    let x = [];
    let y = [];
    const numPoints = 100;
    
    for (let i = 0; i < numPoints; i++) {
        const currentX = xMin + (xMax - xMin) * i / (numPoints - 1);
        const currentY = a * currentX * currentX + b * currentX + c;
        x.push(formatar(currentX));
        y.push(formatar(currentY));
    }

    const isDarkMode = body.classList.contains('dark-mode');
    const eixoColor = isDarkMode ? '#e2e8f0' : '#374151';
    const gridColor = isDarkMode ? '#374151' : '#e5e7eb';
    const bgColor = isDarkMode ? '#1f2937' : '#ffffff';

    const parabola = {
        x: x,
        y: y,
        mode: 'lines',
        name: 'Função f(x)',
        line: { color: 'rgb(79, 70, 229)', width: 3 }
    };

    let pontosRaizes = [];
    if (delta >= 0) {
        pontosRaizes = [{
            x: raizes,
            y: raizes.map(() => 0), 
            mode: 'markers',
            name: 'Raízes (x)',
            marker: { color: 'rgb(220, 38, 38)', size: 10, symbol: 'circle-open', line: {width: 2} }
        }];
    }
    
    const pontoVertice = [{
        x: [formatar(xv)],
        y: [formatar(yv)],
        mode: 'markers',
        name: 'Vértice',
        marker: { color: 'rgb(251, 191, 36)', size: 10 }
    }];

    const layout = {
        title: {
            text: `Gráfico da Função: ${formatar(a)}x² + ${formatar(b)}x + ${formatar(c)}`,
            font: { size: 16, color: eixoColor } 
        },
        xaxis: {
            title: 'x',
            zeroline: true, 
            zerolinecolor: gridColor,
            gridcolor: gridColor,
            range: [xMin, xMax],
            tickfont: { color: eixoColor },
            titlefont: { color: eixoColor }
        },
        yaxis: {
            title: 'y',
            zeroline: true, 
            zerolinecolor: gridColor,
            gridcolor: gridColor,
            tickfont: { color: eixoColor },
            titlefont: { color: eixoColor }
        },
        paper_bgcolor: bgColor,
        plot_bgcolor: bgColor,
        margin: { t: 40, b: 40, l: 40, r: 20 },
        showlegend: true,
        legend: { x: 1, xanchor: 'right', y: 1.1, font: { color: eixoColor } }
    };

    if (typeof Plotly !== 'undefined') {
        Plotly.newPlot('grafico', [parabola, ...pontosRaizes, ...pontoVertice], layout, {responsive: true, displayModeBar: false});
    } else {
        graficoDiv.innerHTML = '<div class="alerta-erro">Biblioteca Plotly.js não carregada!</div>';
    }
}

themeToggleBtn.addEventListener('click', toggleTheme);

if (btnCalcular) {
    btnCalcular.addEventListener('click', () => calcularBhaskara(true));
} 

document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    calcularBhaskara(false);
    renderizarHistorico();
});