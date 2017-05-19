const o = {
  specs: [{
    summaries: [],
    images: [
      [
        "original",
        "thumnbail"
      ]
    ],
    details: [{
      price: 0,
      main: "",
      marks: []
    }]
  }],
  init: () => {
    o.s.id = 0
    o.s.vd = 0
    o.s.prodMap = o.getProdMap() // prodMap[id][vd]
    return o
  },
  s: {
    id: -1,                      // product ID
    vd: -1,                      // product variant ID
    prodMap: [[0]],
    modalIsOpen: false           // modal Dialog
  },
  p: [{                          // p[id].tag[vd]
    _vd: [
      1, 2, 3, 4, 5, 6, 7        // TODO will be automatically calculated and filled in.
    ],
    summaries: [
      "Sport Shoes Black",
      "Sport Shoes Blue",
      "Sport Shoes Grey",
      "Sport Shoes Pink",
      "Sport Shoes Pink Stripe",
      "Sport Shoes White",
      "Sport Shoes Green Bright"
    ],
    images: [[""]], // TODO product part of assets.json (product images, etc) comes here.
                    // TODO distilled version of products.js contents goes to assets.json for intelligent fetch.
                    // TODO distilled version of assets.json contents hosts true assets (logos, buttons, etc) with import.
    details: [{
      main: `main 1 contents`,
      marks: [
        "marks 1 1",
        "marks 1 2",
        "marks 1 3",
        "marks 1 4"
      ],
      price: 9.98
    }, {
      main: `main 2 contents`,
      marks: [
        "marks 2 1",
        "marks 2 2",
        "marks 2 3",
        "marks 2 4"
      ],
      price: 19.98
    }, {
      main: `main 3 contents`,
      marks: [
        "marks 3 1",
        "marks 3 2",
        "marks 3 3",
        "marks 3 4"
      ],
      price: 29.98
    }, {
      main: `main 4 contents`,
      marks: [
        "marks 4 1",
        "marks 4 2",
        "marks 4 3",
        "marks 4 4"
      ],
      price: 39.98
    }, {
      main: `main 5 contents`,
      marks: [
        "marks 5 1",
        "marks 5 2",
        "marks 5 3",
        "marks 5 4"
      ],
      price: 49.98
    }, {
      main: `main 6 contents`,
      marks: [
        "marks 6 1",
        "marks 6 2",
        "marks 6 3",
        "marks 6 4"
      ],
      price: 59.98
    }, {
      main: `main 7 contents`,
      marks: [
        "marks 7 1",
        "marks 7 2",
        "marks 7 3",
        "marks 7 4"
      ],
      price: 69.98
    }]
  }],
  getProdMap: () => {
    let r = []
    for (let i = 0, l = o.getProdNum(); i < l; i++) {
      for (let j = 0, m = o.getProdMutNum(i); j < m; j++) {
        r[i] = j
      }
    }
    return r
  },
  getProdNum: () => {
    return o.p.length
  },
  getProdMutNum: (i) => {
    return o.p[i]._vd.length
  },
  getProdItem: (i, j, item) => {
    return i <= o.getProdNum()
      ? j <= o.getProdMutNum(i)
        ? o.p[i][item][j]
        : o.badProdMutNum
      : o.badProdNum
  },
  notFound: 'no item name found.',
  badProdNum: 'product number out of range',
  badProdMutNum: 'product mutation number out of range'
}
export default o