var o = {
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
    prodMap: [[0]]
  },
  p: [{                          // p[id].tag[vd]
    _vd: [
      1, 2, 3, 4
    ],
    summaries: [
      "Williams-Sonoma Classic Apron, French Blue",
      "Williams-Sonoma Classic Apron, Black White Stripe",
      "Williams-Sonoma Classic Apron, Light Green White Stripe",
      "Williams-Sonoma Classic Apron, Red"
    ],
    images: [
      [
        "product-large-a.jpg",
        "product-small-a.jpg"
      ],
      [
        "product-large-b.jpg",
        "product-small-b.jpg"
      ],
      [
        "product-large-c.jpg",
        "product-small-c.jpg"
      ],
      [
        "product-large-d.jpg",
        "product-small-d.jpg"
      ]
    ],
    details: [{
      main: `A generously sized apron is a necessity in any kitchen, and ours will brighten yours with lively color. 
      Sewn of thick cotton, it can be personalized or monogrammed with up to nine characters. all the same height,
      embroidered in your choice of color. An apron of this quality makes a welcome gift for any cook.`,
      marks: [
        "Durable 100% cotton construction.",
        "Adjustable neckband ensures a good fit.",
        "Roomy front pockets hold small tools.",
        "Machine-wash."
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
    }]
  }],
  getProdMap: () => {
    var r = []
    for (var i = 0, l = o.getProdNum(); i < l; i++) {
      for (var j = 0, m = o.getProdMutNum(i); j < m; j++) {
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