## 🚀 Calculadora Interativa de Equações de Segundo Grau (Bhaskara)

Este projeto é uma calculadora interativa para resolver **equações quadráticas** ($ax^2 + bx + c = 0$), utilizando a **Fórmula de Bhaskara**. A ferramenta oferece uma solução detalhada, um gráfico visual da parábola gerado pelo **Plotly.js**, e recursos de usabilidade, como um **histórico de cálculos** e um **modo escuro** (Dark Mode).

***

### ✨ Funcionalidades Principais

* **Cálculo Detalhado:** Exibe o passo a passo da solução, incluindo o cálculo do **discriminante** ($\Delta$) e das **raízes** ($x$).
* **Gráfico Dinâmico:** Gera o gráfico da parábola em tempo real, destacando o **vértice** e as **raízes** (pontos de intersecção com o eixo X).
* **Análise de Raízes:** Fornece feedback claro para os três casos possíveis:
    * $\Delta > 0$ (Duas raízes reais e distintas).
    * $\Delta = 0$ (Uma raiz real).
    * $\Delta < 0$ (Duas raízes complexas e conjugadas).
* **Histórico de Cálculos:** Salva as últimas equações resolvidas no `localStorage` do navegador, permitindo a consulta rápida.
* **Alternância de Tema:** Possui um botão para alternar entre os modos **Claro** (`light-mode`) e **Escuro** (`dark-mode`).
* **Validação:** Impede o cálculo se o coeficiente $a$ for zero ou se os inputs não forem números válidos.

***

### 🛠️ Tecnologias Utilizadas

| Componente | Tecnologia | Finalidade |
| :--- | :--- | :--- |
| **Estrutura** | HTML5 | Base da página e campos de entrada. |
| **Estilização** | CSS3 | Design responsivo, temas Claro/Escuro e layout. |
| **Lógica** | JavaScript (Vanilla JS) | Cálculos de Bhaskara, lógica do histórico e manipulação do DOM. |
| **Gráficos** | Plotly.js | Biblioteca para renderização do gráfico interativo da parábola. |
| **Fórmulas** | MathJax | Renderização das fórmulas matemáticas ($\Delta$, Bhaskara) em LaTeX. |

***

### 📂 Estrutura do Projeto

O projeto é composto por três arquivos principais:

1.  **`index.html`**: Contém a estrutura da interface, os inputs para os coeficientes e os containers para os resultados, gráfico e histórico.
2.  **`style.css`**: Define a aparência visual da aplicação, incluindo a responsividade e as regras para o `dark-mode`.
3.  **`script.js`**: Contém toda a lógica da aplicação, desde o cálculo dos coeficientes até a renderização do histórico e do gráfico.

***

### ⚙️ Como Usar

1.  **Clone o Repositório** (ou crie os três arquivos localmente).
2.  **Abra o `index.html`** no seu navegador.
3.  **Insira os Coeficientes** ($a$, $b$ e $c$) nos campos de entrada.
4.  **Clique em "Calcular Raízes e Gerar Gráfico"**.

O resultado será exibido imediatamente, e o cálculo será salvo no histórico. Você pode usar o botão 🌙 / ☀️ no canto superior direito para alternar o tema.
