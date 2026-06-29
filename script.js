// 1. MENU RESPONSIVO (HAMBÚRGUER)
const inicializarMenuMobile = () => {
    const navbar = document.querySelector('.navbar');
    const menu = document.querySelector('.menu');
    
    // Cria o botão dinamicamente caso ele não exista no HTML
    if (!document.querySelector('.menu-toggle') && menu) {
        const toggleBtn = document.createElement('button');
        toggleBtn.classList.add('menu-toggle');
        toggleBtn.innerHTML = '&#9776;'; // Ícone de três linhas
        toggleBtn.style.cssText = `
            background: none;
            border: none;
            font-size: 1.8rem;
            color: var(--azul-nascente);
            cursor: pointer;
            display: none;
        `;
        
        navbar.insertBefore(toggleBtn, menu);
        
        // Alterna a classe de ativação
        toggleBtn.addEventListener('click', () => {
            menu.classList.toggle('menu-ativo');
        });
    }
};

// 2. CONTADOR ANIMADO (IMPACTO AMBIENTAL)
// Ativa a animação de números subindo quando a seção aparece na tela
const animarContadores = () => {
    const contadores = document.querySelectorAll('.numero-contador');
    const velocidade = 200; // Quanto maior, mais lenta é a animação

    contadores.forEach(contador => {
        const atualizarTexto = () => {
            const alvo = +contador.getAttribute('data-target');
            const textoAtual = +contador.innerText;
            const incremento = alvo / velocidade;

            if (textoAtual < alvo) {
                contador.innerText = Math.ceil(textoAtual + incremento);
                setTimeout(atualizarTexto, 15);
            } else {
                contador.innerText = alvo;
            }
        };
        
        atualizarTexto();
    });
};

// 3. ANIMAÇÃO DE REVELAÇÃO AO ROLAR (SCROLL REVEAL)
const observarElementosScroll = () => {
    const elementos = document.querySelectorAll('.grid-card, .hero-section');
    
    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.style.opacity = '1';
                entrada.target.style.transform = 'translateY(0)';
                
                // Se a seção de dados/contadores for atingida, dispara a animação numérica
                if (entrada.target.classList.contains('secao-dados')) {
                    animarContadores();
                }
            }
        });
    }, { threshold: 0.15 }); // Dispara quando 15% do elemento estiver visível

    elementos.forEach(elemento => {
        elemento.style.opacity = '0';
        elemento.style.transform = 'translateY(30px)';
        elemento.style.transition = 'all 0.6s ease-out';
        observador.observe(elemento);
    });
};

// INICIALIZAÇÃO GERAL
document.addEventListener('DOMContentLoaded', () => {
    inicializarMenuMobile();
    observarElementosScroll();
});

