import { Component, OnInit } from '@angular/core';
import * as Papa from 'papaparse'; // Utilizado para parsing de CSV
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-grafico-echarts',
  templateUrl: './grafico-echarts.component.html',
  styleUrls: ['./grafico-echarts.component.scss']
})
export class GraficoEchartsComponent implements OnInit {

  mapZonaSecaoBairro: any = new Map();
  mapDadosIndicadoresGraficos: any = new Map();
  mapOptionGraficos: any = new Map();
  
  bairrosEleicaoPrimeiroTurno: any = [];  
  selectedBairrosPrimeiroTurno: any = [];
  mapVotosPorCanditadoPorBairroPrimeiroTurno = new Map();

  bairrosEleicaoSegundoTurno: any = [];  
  selectedBairrosSegundoTurno: any = [];
  mapVotosPorCanditadoPorBairroSegundoTurno = new Map();

  isLoading: boolean = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.carregarMapZonaSecaoBairro();

    this.http.get('assets/dataPrimeiroTurno.csv', { responseType: 'text' }).subscribe((data) => {
      Papa.parse(data, {        
        complete: (result) => {
          this.processarCSVDataPrimeiroTurno(result.data);
          this.isLoading = false;
        },
        encoding: 'UTF-8'
      });
    });

    this.http.get('assets/dataSegundoTurno.csv', { responseType: 'text' }).subscribe((data) => {
      Papa.parse(data, {        
        complete: (result) => {
          this.processarCSVDataSegundoTurno(result.data);
        },
        encoding: 'UTF-8'
      });
    });
  }

  processarCSVDataPrimeiroTurno(dadosCSV: any) {
    let votacaoPorSecaoArrayObjeto: any = [];
    
    dadosCSV.forEach((secao: any, index: any) => {
      if(index > 0) {
        let objetoSecao = {
          "DT_GERACAO": secao[0],
          "HH_GERACAO": secao[1],
          "ANO_ELEICAO": secao[2],
          "CD_TIPO_ELEICAO": secao[3],
          "NM_TIPO_ELEICAO": secao[4],
          "CD_PLEITO": secao[5],
          "DT_PLEITO": secao[6],
          "NR_TURNO": secao[7],
          "CD_ELEICAO": secao[8],
          "DS_ELEICAO": secao[9],
          "SG_UF": secao[10],
          "CD_MUNICIPIO": secao[11],
          "NM_MUNICIPIO": secao[12],
          "NR_ZONA": secao[13],
          "NR_SECAO": secao[14],
          "NR_LOCAL_VOTACAO": secao[15],
          "CD_CARGO_PERGUNTA": secao[16],
          "DS_CARGO_PERGUNTA": secao[17],
          "NR_PARTIDO": secao[18],
          "SG_PARTIDO": secao[19],
          "NM_PARTIDO": secao[20],
          "DT_BU_RECEBIDO": secao[21],
          "QT_APTOS": secao[22],
          "QT_COMPARECIMENTO": secao[23],
          "QT_ABSTENCOES": secao[24],
          "CD_TIPO_URNA": secao[25],
          "DS_TIPO_URNA": secao[26],
          "CD_TIPO_VOTAVEL": secao[27],
          "DS_TIPO_VOTAVEL": secao[28],
          "NR_VOTAVEL": secao[29],
          "NM_VOTAVEL": secao[30],
          "QT_VOTOS": secao[31],
          "NR_URNA_EFETIVADA": secao[32],
          "CD_CARGA_1_URNA_EFETIVADA": secao[33],
          "CD_CARGA_2_URNA_EFETIVADA": secao[34],
          "CD_FLASHCARD_URNA_EFETIVADA": secao[35],
          "DT_CARGA_URNA_EFETIVADA": secao[36],
          "DS_CARGO_PERGUNTA_SECAO": secao[37],
          "DS_SECOES_AGREGADAS": secao[38],
          "DT_ABERTURA": secao[39],
          "DT_ENCERRAMENTO": secao[40],
          "QT_ELEI_BIOM_SEM_HABILITACAO": secao[41],
          "DT_EMISSAO_BU": secao[42],
          "NR_JUNTA_APURADORA": secao[43],
          "NR_TURMA_APURADORA": secao[44]
        }

        if(objetoSecao.NM_MUNICIPIO == 'FORTALEZA') {
          votacaoPorSecaoArrayObjeto.push(objetoSecao);
        }
      }
    });

    this.votacaoPorCandidato(votacaoPorSecaoArrayObjeto, 'PrimeiroTurno');
    this.votacaoPorCandidatoPorSecao(votacaoPorSecaoArrayObjeto, 'PrimeiroTurno');
    this.votacaoPorCandidatoPorZona(votacaoPorSecaoArrayObjeto, 'PrimeiroTurno');
    this.votacaoPorCandidatoPorBairro(votacaoPorSecaoArrayObjeto, 'PrimeiroTurno');
  }

  processarCSVDataSegundoTurno(dadosCSV: any) {
    let votacaoPorSecaoArrayObjeto: any = [];
    
    dadosCSV.forEach((secao: any, index: any) => {
      if(index > 0) {
        let objetoSecao = {
          "DT_GERACAO": secao[0],
          "HH_GERACAO": secao[1],
          "ANO_ELEICAO": secao[2],
          "CD_TIPO_ELEICAO": secao[3],
          "NM_TIPO_ELEICAO": secao[4],
          "CD_PLEITO": secao[5],
          "DT_PLEITO": secao[6],
          "NR_TURNO": secao[7],
          "CD_ELEICAO": secao[8],
          "DS_ELEICAO": secao[9],
          "SG_UF": secao[10],
          "CD_MUNICIPIO": secao[11],
          "NM_MUNICIPIO": secao[12],
          "NR_ZONA": secao[13],
          "NR_SECAO": secao[14],
          "NR_LOCAL_VOTACAO": secao[15],
          "CD_CARGO_PERGUNTA": secao[16],
          "DS_CARGO_PERGUNTA": secao[17],
          "NR_PARTIDO": secao[18],
          "SG_PARTIDO": secao[19],
          "NM_PARTIDO": secao[20],
          "DT_BU_RECEBIDO": secao[21],
          "QT_APTOS": secao[22],
          "QT_COMPARECIMENTO": secao[23],
          "QT_ABSTENCOES": secao[24],
          "CD_TIPO_URNA": secao[25],
          "DS_TIPO_URNA": secao[26],
          "CD_TIPO_VOTAVEL": secao[27],
          "DS_TIPO_VOTAVEL": secao[28],
          "NR_VOTAVEL": secao[29],
          "NM_VOTAVEL": secao[30],
          "QT_VOTOS": secao[31],
          "NR_URNA_EFETIVADA": secao[32],
          "CD_CARGA_1_URNA_EFETIVADA": secao[33],
          "CD_CARGA_2_URNA_EFETIVADA": secao[34],
          "CD_FLASHCARD_URNA_EFETIVADA": secao[35],
          "DT_CARGA_URNA_EFETIVADA": secao[36],
          "DS_CARGO_PERGUNTA_SECAO": secao[37],
          "DS_SECOES_AGREGADAS": secao[38],
          "DT_ABERTURA": secao[39],
          "DT_ENCERRAMENTO": secao[40],
          "QT_ELEI_BIOM_SEM_HABILITACAO": secao[41],
          "DT_EMISSAO_BU": secao[42],
          "NR_JUNTA_APURADORA": secao[43],
          "NR_TURMA_APURADORA": secao[44]
        }

        if(objetoSecao.NM_MUNICIPIO == 'FORTALEZA') {
          votacaoPorSecaoArrayObjeto.push(objetoSecao);
        }
      }
    });

    this.votacaoPorCandidato(votacaoPorSecaoArrayObjeto, 'SegundoTurno');
    this.votacaoPorCandidatoPorSecao(votacaoPorSecaoArrayObjeto, 'SegundoTurno');
    this.votacaoPorCandidatoPorZona(votacaoPorSecaoArrayObjeto, 'SegundoTurno');
    this.votacaoPorCandidatoPorBairro(votacaoPorSecaoArrayObjeto, 'SegundoTurno');
  }

  votacaoPorCandidato(votacaoPorSecaoArrayObjeto: any, turno: string) {
    let mapVotosPorCanditado = new Map();

    votacaoPorSecaoArrayObjeto.forEach((secao: any) => {
      let votosPorcandidato = mapVotosPorCanditado.get(secao.NM_VOTAVEL) || 0;
      votosPorcandidato+=Number(secao.QT_VOTOS);

      mapVotosPorCanditado.set(secao.NM_VOTAVEL, votosPorcandidato);
    });

    this.graficoDonutsVotosPorCandidato(mapVotosPorCanditado, turno);
  }

  graficoDonutsVotosPorCandidato(mapVotosPorCanditado: any, turno: string) {
    // Convertendo o Map em um array de pares [key, value] e ordenando
    let sortedEntries: any = Array.from(mapVotosPorCanditado.entries()).sort((a: any, b: any) => {
      // Usando localeCompare para ordenar as chaves
      return a[0].localeCompare(b[0]);
    });

    // Criando um novo Map a partir do array ordenado
    let sortedMap = new Map(sortedEntries);

    // Agora você pode usar forEach no Map ordenado
    let dataGrafico: any = [];

    sortedMap.forEach((value, key) => {
      dataGrafico.push({
          value: value,
          name: key
      });
    });

    let option = {
      color: turno == 'SegundoTurno' ? ['#0074fe', '#4ade80', '#e4142c', '#a78bfa']  : 
      [
        '#0074fe',
        '#4ade80',
        '#6b7280',
        '#65a30d',
        '#a78bfa',
        '#e4142c',
        '#65a30d',
        '#b45309',
        '#ec4899',
        '#eab308',
        '#ea580c'
      ],
      tooltip: {
        trigger: 'item'
      },
      legend: {
        show: false,
        top: '5%',
        left: 'center'
      },
      series: [
        {
          top: '10%',
          bottom: '7%',
          name: 'Votos',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          labelLine: {
            length: 30
          },
          label: {
            formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
            backgroundColor: '#F6F8FC',
            borderColor: '#8C8D8E',
            borderWidth: 1,
            borderRadius: 4,
            rich: {
              a: {
                color: '#6E7079',
                lineHeight: 22,
                align: 'center'
              },
              hr: {
                borderColor: '#8C8D8E',
                width: '100%',
                borderWidth: 1,
                height: 0
              },
              b: {
                color: '#4C5058',
                fontSize: 14,
                fontWeight: 'bold',
                lineHeight: 33
              },
              per: {
                color: '#fff',
                backgroundColor: '#4C5058',
                padding: [3, 4],
                borderRadius: 4
              }
            }
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold'
            }
          },
          data: dataGrafico
        }
      ]
    };

    this.mapOptionGraficos.set(`graficoDonutsVotosPorCandidato${turno}`, option);
  }

  votacaoPorCandidatoPorSecao(votacaoPorSecaoArrayObjeto: any, turno: string) {    
    let mapVotosPorCanditadoPorSecao = new Map();

    votacaoPorSecaoArrayObjeto.forEach((secao: any) => {
      let votosPorcandidato = mapVotosPorCanditadoPorSecao.get(`ZN: ${secao.NR_ZONA} | SC: ${secao.NR_SECAO}-${secao.NM_VOTAVEL.toUpperCase()}`) || 0;
      votosPorcandidato+=Number(secao.QT_VOTOS);

      if(secao.NM_VOTAVEL.toUpperCase() != 'BRANCO' && secao.NM_VOTAVEL.toUpperCase() != 'NULO') {
        mapVotosPorCanditadoPorSecao.set(`ZN: ${secao.NR_ZONA} | SC: ${secao.NR_SECAO}-${secao.NM_VOTAVEL.toUpperCase()}`, votosPorcandidato);
      }
    });

    this.graficoBarraVotosPorCandidatoPorSecao(mapVotosPorCanditadoPorSecao, turno);
  }

  graficoBarraVotosPorCandidatoPorSecao(mapVotosPorCanditadoPorSecao: any, turno: string) {
    let dataLegend: any = [];    
    let dataXAxis: any = [];
    let dataSeries: any = [];

    mapVotosPorCanditadoPorSecao.forEach((value: any, key: any) => {      
      let secaoVotacao = (key.split('-')[0]);
      let nomeCandidato = (key.split('-')[1]);

      if(!(dataLegend.includes(nomeCandidato))) {
        dataLegend.push(nomeCandidato);
      }
      
      if(!(dataXAxis.includes(secaoVotacao))) {
        dataXAxis.push(secaoVotacao);        
      }
    });

    dataXAxis.sort((a: string, b: string) => {
      // Extrai ZN e SC das strings
      const [zonaA, secaoA] = a.split('|').map(part => part.trim());
      const [zonaB, secaoB] = b.split('|').map(part => part.trim());
    
      // Extrai os números de ZN
      const numZonaA = parseInt(zonaA.replace('ZN: ', ''), 10);
      const numZonaB = parseInt(zonaB.replace('ZN: ', ''), 10);
    
      // Extrai o número de SC
      const numSecaoA = parseInt(secaoA.split('-')[0].replace('SC: ', ''), 10);
      const numSecaoB = parseInt(secaoB.split('-')[0].replace('SC: ', ''), 10);
    
      // Primeiro, compara pelos números de ZN
      if (numZonaA !== numZonaB) {
        return numZonaA - numZonaB; // Ordena pela zona
      }
    
      // Se os números de ZN forem iguais, compara pelos números de SC
      return numSecaoA - numSecaoB; // Ordena pela seção
    });

    dataLegend.sort();    

    dataLegend.forEach((legend: any) => {
      let votosSecaoCandidato: any = [];

      dataXAxis.forEach((xAxis: any) => {
        let votosCandidatoNaSecao = mapVotosPorCanditadoPorSecao.get(`${xAxis}-${legend}`) || 0;
        votosSecaoCandidato.push(votosCandidatoNaSecao);                
      });

      dataSeries.push(
        {
          name: legend,
          type: 'bar',
          barGap: 0,
          emphasis: {
            focus: 'series'
          },
          data: votosSecaoCandidato,
          label: {
            show: true, // Habilita a exibição do label
            position: 'inside', // Coloca o label dentro da barra
            rotate: 90, // Rotaciona o texto em 90 graus
            color: '#fff' // Cor do texto
          }
        }
      );
    });

    let option = {
      height: 130,
      color: turno == 'SegundoTurno' ? ['#0074fe', '#e4142c'] :
      [
        '#0074fe',
        '#6b7280',        
        '#4ade80',
        '#a78bfa',
        '#e4142c',
        '#65a30d',
        '#b45309',
        '#eab308',
        '#ea580c'
      ],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: dataLegend
      },
      xAxis: [
        {
          type: 'category',
          axisTick: { show: false },
          data: dataXAxis,
          axisLabel: {
            rotate: 45
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      dataZoom: [
        {
          bottom: 20,
          type: 'slider', // Tipo de dataZoom
          show: true,
          xAxisIndex: [0], // Aplica ao primeiro eixo X
          start: 0, // Começa com o primeiro item
          end: turno == 'SegundoTurno' ? 0.3 : 0.1, // Exibe os primeiros 10 itens
          handleSize: 20, // Tamanho do manipulador
          moveHandleSize: 15,
          left: '5%', // Distância da esquerda
          right: '5%', // Distância da direita
        }
      ],
      series: dataSeries
    };

    this.mapOptionGraficos.set(`graficoBarrasVotosPorCandidatoPorSecao${turno}`, option);
  }

  votacaoPorCandidatoPorZona(votacaoPorSecaoArrayObjeto: any, turno: string) {
    let mapVotosPorCanditadoPorSecao = new Map();

    votacaoPorSecaoArrayObjeto.forEach((secao: any) => {
      let votosPorcandidato = mapVotosPorCanditadoPorSecao.get(`${secao.NR_ZONA}-${secao.NM_VOTAVEL.toUpperCase()}`) || 0;
      votosPorcandidato+=Number(secao.QT_VOTOS);

      if(secao.NM_VOTAVEL.toUpperCase() != 'BRANCO' && secao.NM_VOTAVEL.toUpperCase() != 'NULO') {
        mapVotosPorCanditadoPorSecao.set(`${secao.NR_ZONA}-${secao.NM_VOTAVEL.toUpperCase()}`, votosPorcandidato);
      }
    });

    this.graficoBarraVotosPorCandidatoPorZona(mapVotosPorCanditadoPorSecao, turno);
  }

  graficoBarraVotosPorCandidatoPorZona(mapVotosPorCanditadoPorSecao: any, turno: string) {
    let dataLegend: any = [];    
    let dataXAxis: any = [];
    let dataSeries: any = [];

    mapVotosPorCanditadoPorSecao.forEach((value: any, key: any) => {      
      let secaoVotacao = (key.split('-')[0]);
      let nomeCandidato = (key.split('-')[1]);

      if(!(dataLegend.includes(nomeCandidato))) {
        dataLegend.push(nomeCandidato);
      }
      
      if(!(dataXAxis.includes(secaoVotacao))) {
        dataXAxis.push(secaoVotacao);        
      }
    });

    dataXAxis.sort((a: string, b: string) => {
      return parseInt(a) - parseInt(b);
    });

    dataLegend.sort();    

    dataLegend.forEach((legend: any) => {
      let votosSecaoCandidato: any = [];

      dataXAxis.forEach((xAxis: any) => {
        let votosCandidatoNaSecao = mapVotosPorCanditadoPorSecao.get(`${xAxis}-${legend}`) || 0;
        votosSecaoCandidato.push(votosCandidatoNaSecao);                
      });

      dataSeries.push(
        {
          name: legend,
          type: 'bar',
          barGap: 0,
          emphasis: {
            focus: 'series'
          },
          data: votosSecaoCandidato,
          label: {
            show: true, // Habilita a exibição do label
            position: 'inside', // Coloca o label dentro da barra
            rotate: 90, // Rotaciona o texto em 90 graus
            color: '#fff' // Cor do texto
          }
        }
      );
    });

    let option = {
      height: 130,
      color: turno == 'SegundoTurno' ? ['#0074fe', '#e4142c'] :
      [
        '#0074fe',
        '#6b7280',        
        '#4ade80',
        '#a78bfa',
        '#e4142c',
        '#65a30d',
        '#b45309',
        '#eab308',
        '#ea580c'
      ],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: dataLegend
      },
      xAxis: [
        {
          type: 'category',
          axisTick: { show: false },
          data: dataXAxis,
          axisLabel: {
            rotate: 45
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      dataZoom: [
        {
          bottom: 20,
          type: 'slider', // Tipo de dataZoom
          show: true,
          xAxisIndex: [0], // Aplica ao primeiro eixo X
          start: 0, // Começa com o primeiro item
          end: turno == 'SegundoTurno' ? 100 : 50, // Exibe os primeiros 10 itens
          handleSize: 20, // Tamanho do manipulador
          moveHandleSize: 15,
          left: '5%', // Distância da esquerda
          right: '5%', // Distância da direita
        }
      ],
      series: dataSeries
    };

    this.mapOptionGraficos.set(`graficoBarrasVotosPorCandidatoPorZona${turno}`, option);
  }

  votacaoPorCandidatoPorBairro(votacaoPorBairroArrayObjeto: any, turno: string) {    
    votacaoPorBairroArrayObjeto.forEach((secao: any) => {
      let votosPorcandidato: any = null;
      if(turno == 'PrimeiroTurno') {
        votosPorcandidato = this.mapVotosPorCanditadoPorBairroPrimeiroTurno.get(this.mapZonaSecaoBairro.get(`${secao.NR_ZONA}_${secao.NR_SECAO}`) + '|' + secao.NM_VOTAVEL.toUpperCase()) || 0;
      } else if(turno == 'SegundoTurno') {
        votosPorcandidato = this.mapVotosPorCanditadoPorBairroSegundoTurno.get(this.mapZonaSecaoBairro.get(`${secao.NR_ZONA}_${secao.NR_SECAO}`) + '|' + secao.NM_VOTAVEL.toUpperCase()) || 0;
      }

      votosPorcandidato+=Number(secao.QT_VOTOS);

      if(secao.NM_VOTAVEL.toUpperCase() != 'BRANCO' && secao.NM_VOTAVEL.toUpperCase() != 'NULO') {        
        if(turno == 'PrimeiroTurno') {
          this.mapVotosPorCanditadoPorBairroPrimeiroTurno.set(this.mapZonaSecaoBairro.get(`${secao.NR_ZONA}_${secao.NR_SECAO}`) + '|' + secao.NM_VOTAVEL.toUpperCase(), votosPorcandidato);
        } else if(turno == 'SegundoTurno') {
          this.mapVotosPorCanditadoPorBairroSegundoTurno.set(this.mapZonaSecaoBairro.get(`${secao.NR_ZONA}_${secao.NR_SECAO}`) + '|' + secao.NM_VOTAVEL.toUpperCase(), votosPorcandidato);
        }
      }
    });

    if(turno == 'PrimeiroTurno') {
      this.graficoBarraVotosPorCandidatoPorBairro(this.mapVotosPorCanditadoPorBairroPrimeiroTurno, turno, false);
    } else if(turno == 'SegundoTurno') {
      this.graficoBarraVotosPorCandidatoPorBairro(this.mapVotosPorCanditadoPorBairroSegundoTurno, turno, false);
    }
  }

  graficoBarraVotosPorCandidatoPorBairro(mapVotosPorCanditadoPorBairro: any, turno: string, multiselect: boolean = false) {
    let dataLegend: any = [];
    let dataXAxis: any = [];

    let dataSeries: any = [];

    const bairrosSelecionados = turno === 'PrimeiroTurno' ? this.selectedBairrosPrimeiroTurno : this.selectedBairrosSegundoTurno;

    mapVotosPorCanditadoPorBairro.forEach((value: any, key: any) => {
      let bairroVotacao = (key.split('|')[0]);
      let nomeCandidato = (key.split('|')[1]);

      if(multiselect) {
        if (bairrosSelecionados.includes(bairroVotacao)) {
          if (!dataLegend.includes(nomeCandidato)) {
            dataLegend.push(nomeCandidato);
          }
  
          if (!dataXAxis.includes(bairroVotacao)) {
            dataXAxis.push(bairroVotacao);
          }
        }
      } else {
        if(!(dataLegend.includes(nomeCandidato))) {
          dataLegend.push(nomeCandidato);
        }
  
        if(!(dataXAxis.includes(bairroVotacao))) {
          dataXAxis.push(bairroVotacao);        
        }
      }
      
      if(multiselect == false) {
        if(turno == 'PrimeiroTurno') {
          if(!(this.selectedBairrosPrimeiroTurno.includes(bairroVotacao))) {
            this.selectedBairrosPrimeiroTurno.push(bairroVotacao);
            this.bairrosEleicaoPrimeiroTurno.push(
              {
                label: bairroVotacao,
                value: bairroVotacao
              }
            );
          }
        } else if(turno == 'SegundoTurno') {
          if(!(this.selectedBairrosSegundoTurno.includes(bairroVotacao))) {
            this.selectedBairrosSegundoTurno.push(bairroVotacao);
            this.bairrosEleicaoSegundoTurno.push(
              {
                label: bairroVotacao,
                value: bairroVotacao
              }
            );
          }
        }
      }
    });

    dataXAxis.sort();

    if(turno == 'PrimeiroTurno') {
      this.selectedBairrosPrimeiroTurno.sort();
    } else if(turno == 'SegundoTurno') {
      this.selectedBairrosSegundoTurno.sort();
    }

    dataLegend.sort();    

    dataLegend.forEach((legend: any) => {
      let votosBairroCandidato: any = [];

      dataXAxis.forEach((xAxis: any) => {
        let votosCandidatoNaSecao = mapVotosPorCanditadoPorBairro.get(`${xAxis}|${legend}`) || 0;
        votosBairroCandidato.push(votosCandidatoNaSecao);                
      });

      dataSeries.push(
        {
          name: legend,
          type: 'bar',
          barGap: 0,
          emphasis: {
            focus: 'series'
          },
          data: votosBairroCandidato,
          label: {
            show: true, // Habilita a exibição do label
            position: 'inside', // Coloca o label dentro da barra
            rotate: 90, // Rotaciona o texto em 90 graus
            color: '#fff' // Cor do texto
          }
        }
      );
    });

    let option = {
      height: 130,
      color: turno == 'SegundoTurno' ? ['#0074fe', '#e4142c'] :
      [
        '#0074fe',
        '#6b7280',        
        '#4ade80',
        '#a78bfa',
        '#e4142c',
        '#65a30d',
        '#b45309',
        '#eab308',
        '#ea580c'
      ],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: dataLegend
      },
      xAxis: [
        {
          type: 'category',
          axisTick: { show: false },
          data: dataXAxis,
          axisLabel: {
            rotate: 45
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      dataZoom: [
        {
          bottom: 20,
          type: 'slider', // Tipo de dataZoom
          show: true,
          xAxisIndex: [0], // Aplica ao primeiro eixo X
          start: 0, // Começa com o primeiro item
          end: turno == 'SegundoTurno' ? 10 : 5, // Exibe os primeiros 10 itens
          handleSize: 20, // Tamanho do manipulador
          moveHandleSize: 15,
          left: '5%', // Distância da esquerda
          right: '5%', // Distância da direita
        }
      ],
      series: dataSeries
    };

    this.mapOptionGraficos.set(`graficoBarrasVotosPorCandidatoPorBairro${turno}`, option);
  }

  carregarMapZonaSecaoBairro() {
    this.http.get('assets/trece-ele2024-votacao-FORTALEZA-1T-SECAO-22-60002029263 - ANDRÉ.csv', { responseType: 'text' }).subscribe((data) => {
      Papa.parse(data, {        
        complete: (result) => {
          let dadosCsv: any = result.data;

          dadosCsv.forEach((dado: any) => {
            let zona = dado[5];
            let secao = dado[6];
            let bairro = dado[11];

            this.mapZonaSecaoBairro.set(`${zona}_${secao}`, bairro);            

          });
        },
        encoding: 'UTF-8'
      });
    });

    this.http.get('assets/trece-ele2024-votacao-FORTALEZA-2T-SECAO-22-60002029263 - ANDRÉ.csv', { responseType: 'text' }).subscribe((data) => {
      Papa.parse(data, {        
        complete: (result) => {
          let dadosCsv: any = result.data;

          dadosCsv.forEach((dado: any) => {
            let zona = dado[5];
            let secao = dado[6];
            let bairro = dado[11];

            this.mapZonaSecaoBairro.set(`${zona}_${secao}`, bairro);            

          });
        },
        encoding: 'UTF-8'
      });
    });

    this.http.get('assets/trece-ele2024-votacao-FORTALEZA-1T-SECAO-13-60002129518 - EVANDRO.csv', { responseType: 'text' }).subscribe((data) => {
      Papa.parse(data, {        
        complete: (result) => {          
          let dadosCsv: any = result.data;

          dadosCsv.forEach((dado: any) => {
            let zona = dado[5];
            let secao = dado[6];
            let bairro = dado[11];

            this.mapZonaSecaoBairro.set(`${zona}_${secao}`, bairro);            

          });
        },
        encoding: 'UTF-8'
      });
    });

    this.http.get('assets/trece-ele2024-votacao-FORTALEZA-2T-SECAO-13-60002129518 - EVANDRO.csv', { responseType: 'text' }).subscribe((data) => {
      Papa.parse(data, {        
        complete: (result) => {
          let dadosCsv: any = result.data;

          dadosCsv.forEach((dado: any) => {
            let zona = dado[5];
            let secao = dado[6];
            let bairro = dado[11];

            this.mapZonaSecaoBairro.set(`${zona}_${secao}`, bairro);            

          });
        },
        encoding: 'UTF-8'
      });
    });
  }
}
