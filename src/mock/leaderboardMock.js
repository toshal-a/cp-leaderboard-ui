import mock from 'utils/mock';

mock.onGet('/user/').reply(200, 
  [
    {
      id: '5e887a62195cc5aef7e8ca5d',
      full_name: 'Ekaterina Tankova',
      email: 'ekaterina.tankova@devias.io',
      handle: 'ekaterinarocks',
      class_type: 'FE',
      overall_score: 50,
    },
    {
      id: '5e887a62dgfg195cc5aef7e8ca5d',
      full_name: 'Eric Bakcman',
      email: 'eric.bakcman@devias.io',
      handle: 'ericrocks',
      class_type: 'FE',
      overall_score: 500,
    },
    {
      id: '5e8fgzfdg87a62195cc5aef7e8ca5d',
      full_name: 'Jin Ynag',
      email: 'jin.yang@devias.io',
      handle: 'jinrocks',
      class_type: 'SE',
      overall_score: 40
    },
    {
      id: '5e887a62195cc5aef7e8ca5dDFDSF',
      full_name: 'Gil Foyle',
      email: 'gil.foyle@devias.io',
      handle: 'gilrocks',
      class_type: 'SE',
      overall_score: 20
    },
    {
      id: '5e887agdfgcbc62195cc5aef7e8ca5d',
      full_name: 'Big Head',
      email: 'big.head@devias.io',
      handle: 'bigrocks',
      class_type: 'TE',
      overall_score: 700
    },
    {
      id: '5e887a62195cdhzfghfhc5aef7e8ca5d',
      full_name: 'Gavin Belson',
      email: 'gavin.belson@devias.io',
      handle: 'gavinrocks',
      class_type: 'TE',
      overall_score: 90
    },
    {
      id: '5e887a62195cxgzdfgdgzdc5aef7e8ca5d',
      full_name: 'Jared Dunn',
      email: 'jared.dunn@devias.io',
      handle: 'jaredrocks',
      class_type: 'BE',
      overall_score: 200
    },
    {
      id: '5e887a62195cxfgsddggcdfgdfg5aef7e8ca5d',
      full_name: 'richard hendriks',
      email: 'richard.hendriks@devias.io',
      handle: 'richardrocks',
      class_type: 'BE',
      overall_score: 350
    },
    {
      id: '5e887a62195CFHXGFcc5aef7e8ca5d',
      full_name: 'Abizer Lokhandwala',
      email: 'abizerL123@gmail.com',
      handle: 'reziba',
      class_type: 'OTHER',
      overall_score: 1000
    }
  ]
);

