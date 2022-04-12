import {
  BufferGeometry,
  Material,
  Color,
  Vector2,
  RawShaderMaterial,
  BufferAttribute,
  Vector3, AdditiveBlending, NoBlending
} from "three"

const shader = {
  uniforms: {

      lineWidth: { value: 0.1 },

      map: { value: null },
      useMap: { value: 0 },
      alphaMap: { value: null },
      useAlphaMap: { value: 0 },

      color: { value: new Color(0xffffff) },

      opacity: { value: 1.0 },

      resolution: { value: new Vector2(1, 1) },
      sizeAttenuation: { value: 1 },

      near: { value: 1 },
      far: { value: 1 },

      dashArray: { value: new Vector2(1, 0) },
      dashRatio: { value: 0 },
      dashOffset: { value: 0},
      useDash: { value: 0},

      visibility: { value: 1 },
      alphaTest: { value: 0 },

      repeat: { value: new Vector2(1, 1)},

      time: { value: 0.0}

  },

  vertexShader: `
    precision highp float;
    #define linearstep(edge0, edge1, x) min(max((x - edge0) / (edge1 - edge0), 0.0), 1.0)
    
    attribute vec3 position;
    attribute vec3 previous;
    attribute vec3 next;
    attribute float side;
    attribute float width;
    attribute vec2 uv;
    attribute float counters;
    
    uniform mat4 projectionMatrix;
    uniform mat4 modelViewMatrix;
    uniform vec2 resolution;
    uniform float lineWidth;
    uniform vec3 color;
    uniform float opacity;
    uniform float near;
    uniform float far;
    uniform float sizeAttenuation;
    
    varying float vDepth;
    varying vec2 vUV;
    varying vec4 vColor;
    varying float vCounters;
    
    uniform float time;
    
    attribute float vertexRelDistance;
    varying float vRelDistance;
    varying float vOpacity;
    
    vec2 fix( vec4 i, float aspect ) {

    
        vec2 res = i.xy / i.w;
        res.x *= aspect;
        vCounters = counters;
        return res;
    
    }
    
    float circularIn(float t) {
      return 1.0 - sqrt(1.0 - t * t);
    }
    
    void main() {
    
    
        vRelDistance = vertexRelDistance;
        float rel = 1.0 - vRelDistance;
        
        float t = 1.0 - abs((time* 2.0) - 1.0);
        float vw = 0.2 * t;
        float minv = max(time - vw, 0.0);
        float maxv = min(time + rel / 2.0 + vw, 1.0);
        float mid = (minv + maxv) / 2.0;
        float op = smoothstep(minv, mid, rel) * ( 1.0 - smoothstep(mid, maxv, rel));
        // float op = linearstep(minv, mid, rel) * ( 1.0 - linearstep(mid, maxv, rel));
        vOpacity = op * min(t + 0.2, 1.0);
    
        float aspect = resolution.x / resolution.y;
        float pixelWidthRatio = 1. / (resolution.x * projectionMatrix[0][0]);
    
        vColor = vec4( color, opacity );
        vUV = uv;
    
        mat4 m = projectionMatrix * modelViewMatrix;
        vec4 finalPosition = m * vec4( position, 1.0 );
        vec4 prevPos = m * vec4( previous, 1.0 );
        vec4 nextPos = m * vec4( next, 1.0 );
    
        vec2 currentP = fix( finalPosition, aspect );
        vec2 prevP = fix( prevPos, aspect );
        vec2 nextP = fix( nextPos, aspect );
    
        float pixelWidth = finalPosition.w * pixelWidthRatio;
        
        // float weight = circularIn(vOpacity);
        float weight = min(max(op, 0.5), 0.8);
        float w = 1.8 * pixelWidth * lineWidth * width * weight;
    
        if( sizeAttenuation == 1. ) {

            w = 1.8 * lineWidth * width * weight;
        }
    
        vec2 dir;
        if( nextP == currentP ) dir = normalize( currentP - prevP );
        else if( prevP == currentP ) dir = normalize( nextP - currentP );
        else {

            vec2 dir1 = normalize( currentP - prevP );
            vec2 dir2 = normalize( nextP - currentP );
            dir = normalize( dir1 + dir2 );
    
            vec2 perp = vec2( -dir1.y, dir1.x );
            vec2 miter = vec2( -dir.y, dir.x );
    
        }
    
        vec2 normal = vec2( -dir.y, dir.x );
        normal.x /= aspect;
        normal *= .5 * w;

        vec4 offset = vec4( normal * side, 0.0, 1.0 );
        finalPosition.xy += offset.xy;

        gl_Position = finalPosition;
    
      }
  `,

  fragmentShader: `
      #extension GL_OES_standard_derivatives : enable
      precision highp float;
      
      uniform float opacity;

      uniform sampler2D map;
      uniform sampler2D alphaMap;
      uniform float useMap;
      uniform float useAlphaMap;
      uniform float useDash;
      uniform vec2 dashArray;
      uniform float dashOffset;
      uniform float visibility;
      uniform float alphaTest;
      uniform vec2 repeat;

      varying float vDepth;
      varying vec2 vUV;
      varying vec4 vColor;
      varying float vCounters;
      
      uniform float time;
      
      
      varying float vRelDistance;
      varying float vOpacity;

      void main() {
      
          vec4 c = vColor;
          vec2 tuv = vUV * repeat;
          if(useDash == 1.) {
            tuv.x = mod((tuv.x + dashOffset),1.);
          }
          if( useMap == 1. ) c *= texture2D(map, tuv);
          if( useAlphaMap == 1. ) c.a *= texture2D( alphaMap, tuv ).a;
          if( useDash == 1. ){
            if(mod(vCounters*repeat.x+dashOffset,1.)>(dashArray.x / (dashArray.x+dashArray.y))) {
              c.a = 0.;
            }
          }
          if( c.a < alphaTest ) discard;
          
          float rel = 1.0 - vRelDistance;
          
          float base = 1.0 - abs((rel * 2.0) - 1.0);
          
          float g = rel * rel * rel;
          float gradation = mod(g + 0.2, 1.0);
          float v = mod(gradation, 1.0) * opacity;
          
          float op = vOpacity * vOpacity;
          c.a = op;
          
          gl_FragColor = c;
          gl_FragColor.a *= step(vCounters,visibility);
          
      }
  `
}

class MeshLineMaterial extends Material {

  material: RawShaderMaterial

  constructor(parameters) {
    super();

    this.material = new RawShaderMaterial({
      ...shader,
      wireframe: false,
      transparent: true,
      blending: AdditiveBlending,
      depthWrite: false
    });

    this.material.type = "MeshLineMaterial";

  }

  get() { return this.material }

}

export { MeshLineMaterial };
