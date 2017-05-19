import {Component} from 'react'

export default class LoadAssets extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.loadFiles = this.loadFiles.bind(this)
  }

  componentDidMount() {
    var _props = this.props
    this.loadFiles()
      .then(assets => {
        _props.setAppState({
          assets: assets
        })
      })
  }

  loadFiles() {
    var promise = new Promise((resolve, reject) => {
      var pms = []
      var assets = {
        cts: {
          pairs: [],
          solos: []
        },
        pts: {
          reactImageGallery: {
            images: []
          },
          pairs: [],
          solos: []
        }
      }
      var cts = assets.cts
      var pts = assets.pts
      var igs = pts.reactImageGallery.images
      fetch('assets.json')
        .then(res => res.json())
        .then(json => {
          var pairTagNames = json.pairs.shift()        // pairs[0] === pair tag names
          var l = json.pairs.length
          json.pairs.forEach((e, i, a) => {
            var p0Name = e[0], p1Name = e[1], o = {}
            pms[i * 2 + 0] = fetch(`assets/${p0Name}`)
            pms[i * 2 + 1] = fetch(`assets/${p1Name}`) // pms: pair promises
            o[pairTagNames[0]] = pms[i * 2 + 0]
            o[pairTagNames[1]] = pms[i * 2 + 1]
            cts.pairs.push(o)                          // cts: pair contents will be resolved
            o[pairTagNames[0]] = `assets/${p0Name}`
            o[pairTagNames[1]] = `assets/${p1Name}`
            pts.pairs.push(o)                          // pts: pair pathes
            igs.push(o)                                // igs: pair pathes for reactImageGallery.images
          })
          json.pairs.unshift(pairTagNames)             // put pair tag names back
          json.solos.forEach((e, i) => {
            var key = e[0]
            var file = e[1]
            var path = `assets/${file}`
            var pm = fetch(path)
            var ct = [key, pm]
            var pt = [key, path]
            pms[l * 2 + i] = pm                        // solo promise
            cts.solos.push(cnvA2O(ct))                 // solo contents
            pts.solos.push(cnvA2O(pt))                 // solo path
          })
          Promise.all(pms)
            .then((pms) => {
//              console.log(`promises: ${pms.length} pairs: ${cts.pairs.length} solos: ${cts.solos.length}`)
//              console.log(pts.reactImageGallery.images[0])
              resolve(assets)
            })
            .catch(err => {
//              console.log(err)
              reject(new Error('loadFiles() no assets loaded'))
            })
        })
        .catch(err => {
//          console.log(err)
          reject(new Error('loadFiles() failed'))
        })
      function cnvA2O(a) { // had problem doing this in promise space, could be a bug...
        var o = {}
        o[a[0]] = a[1]
        return o
      }
    })
    return promise
  }

  render() {
    return null
  }
}
