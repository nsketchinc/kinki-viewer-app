import {
  WebGLRenderTarget,
  ClampToEdgeWrapping,
  LinearFilter,
  RGBAFormat,
  UnsignedByteType,
  WebGLMultisampleRenderTarget,
} from "three"

function getFBO(
  w: number,
  h: number,
  options = {
    wrapS: ClampToEdgeWrapping,
    wrapT: ClampToEdgeWrapping,
    minFilter: LinearFilter,
    magFilter: LinearFilter,
    format: RGBAFormat,
    type: UnsignedByteType,
    stencilBuffer: false,
    depthBuffer: true
  },
  antialiased = true
) {
  if (antialiased) {
    return new WebGLMultisampleRenderTarget(w, h, {
      wrapS: options.wrapS,
      wrapT: options.wrapT,
      minFilter: options.minFilter,
      magFilter: options.magFilter,
      format: options.format,
      type: options.type,
      stencilBuffer: options.stencilBuffer,
      depthBuffer: options.depthBuffer
    });
  }
  return new WebGLRenderTarget(w, h, {
    wrapS: options.wrapS,
    wrapT: options.wrapT,
    minFilter: options.minFilter,
    magFilter: options.magFilter,
    format: options.format,
    type: options.type,
    stencilBuffer: options.stencilBuffer,
    depthBuffer: options.depthBuffer
  });
}

export { getFBO };
