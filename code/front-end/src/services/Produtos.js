    
    
export default  [
    {
      id: 1,
      title: 'Carro Completo',
      codigoPai: null,
      quantidade: 1,
      children: [
        {
          id: 2,
          title: 'Chassi',
          codigoPai: 1,
          quantidade: 1,
          children: [
            {
              id: 3,
              title: 'Estrutura de Aço',
              codigoPai: 2,
              quantidade: 1,
            },
            {
              id: 4,
              title: 'Suspensão',
              codigoPai: 2,
              quantidade: 2,
            },
          ],
        },
        {
          id: 5,
          title: 'Motor',
          codigoPai: 1,
          quantidade: 1,
          children: [
            {
              id: 6,
              title: 'Bloco do Motor',
              codigoPai: 5,
              quantidade: 1,
            },
            {
              id: 7,
              title: 'Pistões',
              codigoPai: 5,
              quantidade: 4,
            },
            {
              id: 8,
              title: 'Vela de Ignição',
              codigoPai: 5,
              quantidade: 4,
            },
          ],
        },
        {
          id: 9,
          title: 'Sistema de Transmissão',
          codigoPai: 1,
          quantidade: 1,
          children: [
            {
              id: 10,
              title: 'Caixa de Câmbio',
              codigoPai: 9,
              quantidade: 1,
            },
            {
              id: 11,
              title: 'Embreagem',
              codigoPai: 9,
              quantidade: 1,
            },
          ],
        },
        {
          id: 12,
          title: 'Sistema Elétrico',
          codigoPai: 1,
          quantidade: 1,
          children: [
            {
              id: 13,
              title: 'Bateria',
              codigoPai: 12,
              quantidade: 1,
            },
            {
              id: 14,
              title: 'Fiação',
              codigoPai: 12,
              quantidade: 20,
            },
          ],
        },
        {
          id: 15,
          title: 'Rodas',
          codigoPai: 1,
          quantidade: 4,
          children: [
            {
              id: 16,
              title: 'Pneus',
              codigoPai: 15,
              quantidade: 4,
            },
            {
              id: 17,
              title: 'Aros',
              codigoPai: 15,
              quantidade: 4,
            },
          ],
        },
        {
          id: 18,
          title: 'Carroceria',
          codigoPai: 1,
          quantidade: 1,
          children: [
            {
              id: 19,
              title: 'Portas',
              codigoPai: 18,
              quantidade: 4,
            },
            {
              id: 20,
              title: 'Capô',
              codigoPai: 18,
              quantidade: 1,
            },
            {
              id: 21,
              title: 'Teto',
              codigoPai: 18,
              quantidade: 1,
            },
          ],
        },
        {
          id: 22,
          title: 'Interior',
          codigoPai: 1,
          quantidade: 1,
          children: [
            {
              id: 23,
              title: 'Bancos',
              codigoPai: 22,
              quantidade: 5,
            },
            {
              id: 24,
              title: 'Painel',
              codigoPai: 22,
              quantidade: 1,
            },
            {
              id: 25,
              title: 'Volante',
              codigoPai: 22,
              quantidade: 1,
            },
          ],
        },
      ],
    },
  ];
  