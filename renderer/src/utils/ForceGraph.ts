import * as d3 from 'd3-hierarchy'
import * as d3force from "d3-force"

export default class ForceGraph {

  positions: any[]
  root: any

  constructor(data: any[], angle: number, radius: number) {
    console.log(data)

    // this.root = d3.hierarchy(data)
    // const cluster = d3.cluster().size([angle, radius])
    // cluster(this.root)

    const tree = d3.tree()
      .nodeSize([angle, radius])
      .separation(function(a, b) {
        // return(a.parent == b.parent ? 1 : 2);
        return (a.parent == b.parent ? 1 : 1.5) / a.depth;
      });
    const hierarchy_data = d3.hierarchy(data)
    this.root= tree(hierarchy_data)

    const nodes = this.root.descendants()
    const links = this.root.links()

    const sim = d3force.forceSimulation()
        .force('link', d3force.forceLink()
          .distance(function(d){ return 10.0 })
          .strength(-0.0001)
          .iterations(2 ))
        .force('charge', d3force.forceManyBody().strength(-0.0001))

    // sim.nodes(nodes)

    // @ts-ignore
    // sim.force('link').links(links).id(function(d) { return d.index })

  }

  getChildrenOfRoot(index: number) {
    const children = this.root.children
    const child = children[index]
    console.log(child)
    return child
  }

  transform(x: number, y: number) {
    // const angle = (x + 90) * Math.PI / 180;
    const angle = (x-90) * 180 / Math.PI
    // const angle = x
    const radius = y
    const posx = Math.cos(angle) * radius
    const posy = Math.sin(angle) * radius
    return { x: posx, y: posy}

    // const scale = 0.1
    // return { x: x * scale, y: y * scale }
  }

}
