const topo = document.getElementById('topo');
const menuBotao = document.querySelector('.menu-botao');

function fecharMenu() {
  topo.classList.remove('aberto');
  menuBotao.setAttribute('aria-expanded', 'false');
  menuBotao.setAttribute('aria-label', 'Abrir menu');
}

menuBotao.addEventListener('click', () => {
  const abrir = !topo.classList.contains('aberto');
  topo.classList.toggle('aberto', abrir);
  menuBotao.setAttribute('aria-expanded', String(abrir));
  menuBotao.setAttribute('aria-label', abrir ? 'Fechar menu' : 'Abrir menu');
});

document.querySelectorAll('.menu a').forEach((link) => link.addEventListener('click', fecharMenu));
document.addEventListener('keydown', (evento) => {
  if (evento.key === 'Escape') fecharMenu();
});

const marcarRolagem = () => topo.classList.toggle('rolado', window.scrollY > 24);
marcarRolagem();
window.addEventListener('scroll', marcarRolagem, { passive: true });

// Aberto ou fechado, no horário de Araranguá
function textoDoStatus() {
  const agora = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
  if (agora.getDay() === 1) return { aberto: false, texto: 'Fechado hoje. Abre terça às 19h' };
  if (agora.getHours() >= 19) return { aberto: true, texto: 'Aberto agora, até a meia-noite' };
  return { aberto: false, texto: 'Abre hoje às 19h' };
}

const status = document.getElementById('status');
const { aberto, texto } = textoDoStatus();
status.textContent = texto;
status.classList.toggle('aberto', aberto);

// Entrada ao rolar
const revelar = document.querySelectorAll('.revela');
if ('IntersectionObserver' in window) {
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      entrada.target.classList.add('visivel');
      observador.unobserve(entrada.target);
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  revelar.forEach((elemento) => observador.observe(elemento));
} else {
  revelar.forEach((elemento) => elemento.classList.add('visivel'));
}

document.getElementById('ano').textContent = new Date().getFullYear();
