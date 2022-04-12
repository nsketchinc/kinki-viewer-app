import {
  BufferAttribute,
  BufferGeometry,
  Float32BufferAttribute,
  Vector3,
} from 'three'

function memcpy(src, srcOffset, dst, dstOffset, length) {
  src = src.subarray || src.slice ? src : src.buffer
  dst = dst.subarray || dst.slice ? dst : dst.buffer

  src = srcOffset
    ? src.subarray
      ? src.subarray(srcOffset, length && srcOffset + length)
      : src.slice(srcOffset, length && srcOffset + length)
    : src

  if (dst.set) {
    dst.set(src, dstOffset)
  } else {
    for (let i = 0; i < src.length; i++) {
      dst[i + dstOffset] = src[i]
    }
  }

  return dst
}

class MeshLine extends BufferGeometry {
  positions: Vector3[]
  previous: Vector3[]
  next: any[]
  side: any[]
  width: any[]
  indices_array: any[]
  uvs: any[]
  counters: any[]
  _attributes: {
    position: Float32BufferAttribute
    previous: Float32BufferAttribute
    next: Float32BufferAttribute
    side: Float32BufferAttribute
    width: Float32BufferAttribute
    uv: Float32BufferAttribute
    index: Float32BufferAttribute
    counters: Float32BufferAttribute
  }

  widthCallback: (v: any) => void

  constructor() {
    super()

    this.positions = []

    this.previous = []
    this.next = []
    this.side = []
    this.width = []
    this.indices_array = []
    this.uvs = []
    this.counters = []

    this.widthCallback = null
  }

  setPoints(points) {
    this.positions.length = 0

    for (let j = 0; j < points.length; j++) {
      const p = points[j]
      const c = j / points.length
      this.positions.push(p.x, p.y, p.z)
      this.positions.push(p.x, p.y, p.z)
      this.counters.push(c)
      this.counters.push(c)
    }

    this.process()
  }

  compareV3(a, b) {
    const aa = a * 6
    const ab = b * 6
    return (
      this.positions[aa] === this.positions[ab] &&
      this.positions[aa + 1] === this.positions[ab + 1] &&
      this.positions[aa + 2] === this.positions[ab + 2]
    )
  }

  copyV3(a) {
    const aa = a * 6
    return [this.positions[aa], this.positions[aa + 1], this.positions[aa + 2]]
  }

  process() {
    const l = this.positions.length / 6

    this.previous = []
    this.next = []
    this.side = []
    this.width = []
    this.indices_array = []
    this.uvs = []

    let w

    let v
    // initial previous points
    if (this.compareV3(0, l - 1)) {
      v = this.copyV3(l - 2)
    } else {
      v = this.copyV3(0)
    }
    this.previous.push(v[0], v[1], v[2])
    this.previous.push(v[0], v[1], v[2])

    for (let j = 0; j < l; j++) {
      // sides
      this.side.push(1)
      this.side.push(-1)

      // widths
      if (this.widthCallback) w = this.widthCallback(j / (l - 1))
      else w = 1
      this.width.push(w)
      this.width.push(w)

      // uvs
      this.uvs.push(j / (l - 1), 0)
      this.uvs.push(j / (l - 1), 1)

      if (j < l - 1) {
        // points previous to poisitions
        v = this.copyV3(j)
        this.previous.push(v[0], v[1], v[2])
        this.previous.push(v[0], v[1], v[2])

        // indices
        const n = j * 2
        this.indices_array.push(n, n + 1, n + 2)
        this.indices_array.push(n + 2, n + 1, n + 3)
      }
      if (j > 0) {
        // points after poisitions
        v = this.copyV3(j)
        this.next.push(v[0], v[1], v[2])
        this.next.push(v[0], v[1], v[2])
      }
    }

    // last next point
    if (this.compareV3(l - 1, 0)) {
      v = this.copyV3(1)
    } else {
      v = this.copyV3(l - 1)
    }
    this.next.push(v[0], v[1], v[2])
    this.next.push(v[0], v[1], v[2])

    // redefining the attribute seems to prevent range errors
    // if the user sets a differing number of vertices
    if (
      !this._attributes ||
      this._attributes.position.count !== this.positions.length / 3
    ) {
      this._attributes = {
        //@ts-ignore
        position: new Float32BufferAttribute(this.positions, 3),
        //@ts-ignore
        previous: new BufferAttribute(new Float32Array(this.previous), 3),
        next: new BufferAttribute(new Float32Array(this.next), 3),
        side: new BufferAttribute(new Float32Array(this.side), 1),
        width: new BufferAttribute(new Float32Array(this.width), 1),
        uv: new BufferAttribute(new Float32Array(this.uvs), 2),
        index: new BufferAttribute(new Uint16Array(this.indices_array), 1),
        counters: new BufferAttribute(new Float32Array(this.counters), 1),
      }
    } else {
      //@ts-ignore
      this._attributes.position.copyArray(new Float32Array(this.positions))
      this._attributes.position.needsUpdate = true
      //@ts-ignore
      this._attributes.previous.copyArray(new Float32Array(this.previous))
      this._attributes.previous.needsUpdate = true
      this._attributes.next.copyArray(new Float32Array(this.next))
      this._attributes.next.needsUpdate = true
      this._attributes.side.copyArray(new Float32Array(this.side))
      this._attributes.side.needsUpdate = true
      this._attributes.width.copyArray(new Float32Array(this.width))
      this._attributes.width.needsUpdate = true
      this._attributes.uv.copyArray(new Float32Array(this.uvs))
      this._attributes.uv.needsUpdate = true
      this._attributes.index.copyArray(new Uint16Array(this.indices_array))
      this._attributes.index.needsUpdate = true
    }

    this.setAttribute('position', this._attributes.position)
    this.setAttribute('previous', this._attributes.previous)
    this.setAttribute('next', this._attributes.next)
    this.setAttribute('side', this._attributes.side)
    this.setAttribute('width', this._attributes.width)
    this.setAttribute('uv', this._attributes.uv)
    this.setAttribute('counters', this._attributes.counters)

    this.setIndex(this._attributes.index)

    this.computeBoundingSphere()
    this.computeBoundingBox()
  }

  /**
   * Fast method to advance the line by one position.  The oldest position is removed.
   * @param position
   */
  advance(position) {
    const positions = [...(this.attributes.position.array as Array<number>)]
    const previous = this.attributes.previous.array
    const next = [...(this.attributes.next.array as Array<number>)]
    const l = positions.length

    // PREVIOUS
    memcpy(positions, 0, previous, 0, l)

    // POSITIONS
    memcpy(positions, 6, positions, 0, l - 6)

    positions[l - 6] = position.x
    positions[l - 5] = position.y
    positions[l - 4] = position.z
    positions[l - 3] = position.x
    positions[l - 2] = position.y
    positions[l - 1] = position.z

    // NEXT
    memcpy(positions, 6, next, 0, l - 6)

    next[l - 6] = position.x
    next[l - 5] = position.y
    next[l - 4] = position.z
    next[l - 3] = position.x
    next[l - 2] = position.y
    next[l - 1] = position.z

    this.attributes.position.needsUpdate = true
    this.attributes.previous.needsUpdate = true
    this.attributes.next.needsUpdate = true
  }
}

export { MeshLine }
