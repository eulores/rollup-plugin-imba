import { createFilter } from '@rollup/pluginutils';
import { extname, relative, basename}  from 'path';
import { compile } from 'imba/dist/compiler.js';

function debug(wp, ...args) {
  if (debug.active) console.warn(`WP${wp}:`, ...args);
}

export default function(pluginOptions={}) {
  if (pluginOptions.debug==true) debug.active = true;
  const filter = createFilter(pluginOptions.include, pluginOptions.exclude);

  return {
    name: 'imba',

    transform ( code, id ) {
      debug(1, "transform, before filter:", id);
      if (!filter(id)) return null;
      const ext = extname(id);
      if (ext!='.imba') return null;
      debug(2, "transform, before compile:", id);
      const options = {
        target: 'web',
        format: 'esm',
        es6: true,
        standalone: false,
        sourceMap: true,
        sourceRoot: '',
        evaling: true,
      };
      Object.assign(options, pluginOptions);
      const filePath = relative(process.cwd(), id);
      options.filename = basename(filePath);
      options.sourcePath = filePath;
      options.targetPath = options.sourcePath.replace(/\.imba\d?$/,'.js');
      let {js, sourcemap} = compile(code, options);
      // consider extracting warnings for custom display (switch of evaling!)
      // consider extracting css as well
      delete sourcemap.maps; // debugging leftover?
      debug(3, "transform, after compile:", id);
      return {
        code: js,
        map: sourcemap,
        moduleSideEffects: true // further investigation needed (special treatment for imba/src/imba?)
      };
    }
  };
}
