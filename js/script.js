// Criação dos gráficos
var ctxPorMes = document.getElementById('grafPorMes').getContext('2d');
var ctxPorLocal = document.getElementById('grafPorLocal').getContext('2d');

var dadosPorMes = {
  labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  datasets: [{
    label: 'Quantidade de Lixo Reciclado por Mês',
    backgroundColor: 'rgba(54, 162, 235, 0.5)',
    borderColor: 'rgba(54, 162, 235, 1)',
    borderWidth: 1,
    data: []
  }]
};

var dadosPorLocal = {
  labels: [],
  datasets: [{
    label: 'Quantidade de Lixo Reciclado por Local',
    backgroundColor: [],
    borderColor: [],
    borderWidth: 1,
    data: []
  }]
};

var grafPorMes = new Chart(ctxPorMes, {
  type: 'line',
  data: dadosPorMes,
  options: {
    responsive: false,
    scales: {
      xAxes: [{
        display: false // Remover eixo x
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});

var grafPorLocal = new Chart(ctxPorLocal, {
  type: 'pie',
  data: dadosPorLocal,
  options: {
    responsive: false,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});

// Função para adicionar dados
function adicionarDados() {
  var local = document.getElementById('local').value;
  var quantidade = parseInt(document.getElementById('quantidade').value);
  var data = document.getElementById('data').value;

  if (local && !isNaN(quantidade) && data) {
    var mes = data.split('-')[1];
    var indiceMes = dadosPorMes.labels.indexOf(mes);
    if (indiceMes === -1) {
      dadosPorMes.labels.push(mes);
      dadosPorMes.datasets[0].data.push(quantidade);
    } else {
      dadosPorMes.datasets[0].data[indiceMes] += quantidade;
    }
    grafPorMes.update();

    var indiceLocal = dadosPorLocal.labels.indexOf(local);
    if (indiceLocal === -1) {
      dadosPorLocal.labels.push(local);
      dadosPorLocal.datasets[0].data.push(quantidade);
      dadosPorLocal.datasets[0].backgroundColor.push(gerarCorAleatoria());
      dadosPorLocal.datasets[0].borderColor.push(gerarCorAleatoria());
    } else {
      dadosPorLocal.datasets[0].data[indiceLocal] += quantidade;
    }
    grafPorLocal.update();

    var tabela = document.getElementById('tabelaDados');
    var linha = tabela.insertRow(-1);
    var cell1 = linha.insertCell(0);
    var cell2 = linha.insertCell(1);
    var cell3 = linha.insertCell(2);
    cell1.innerHTML = local;
    cell2.innerHTML = quantidade;
    cell3.innerHTML = data;
  } else {
    alert('Por favor, preencha todos os campos corretamente.');
  }
}

// Função para limpar os dados
function limparDados() {
  dadosPorMes.labels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  dadosPorMes.datasets[0].data = [];
  grafPorMes.update();
  
  dadosPorLocal.labels = [];
  dadosPorLocal.datasets[0].data = [];
  dadosPorLocal.datasets[0].backgroundColor = [];
  dadosPorLocal.datasets[0].borderColor = [];
  grafPorLocal.update();

  var tabela = document.getElementById('tabelaDados');
  tabela.getElementsByTagName('tbody')[0].innerHTML = '';
} 

// Função para gerar uma cor aleatória
function gerarCorAleatoria() {
  var letras = '0123456789ABCDEF';
  var cor = '#';
  for (var i = 0; i < 6; i++) {
    cor += letras[Math.floor(Math.random() * 16)];
  }
  return cor;
}