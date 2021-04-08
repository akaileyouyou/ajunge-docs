/* @flow */

import { ASSET_TYPES } from 'shared/constants'
import { isPlainObject, validateComponentName } from '../util/index'

export function initAssetRegisters (Vue: GlobalAPI) {
  /**
   * Create asset registration methods.
   */ 
  ASSET_TYPES.forEach(type => {   // ASSET_TYPES 里有 components directive filter
    Vue[type] = function (
      id: string,
      definition: Function | Object
    ): Function | Object | void {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production' && type === 'component') {
          validateComponentName(id)
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id
          definition = this.options._base.extend(definition)
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition }   // 把定义的函数绑定在bind和update钩子上。
        }
        //所有的配置都会放在Vue.options.directives()上  // 然后在组件创建的时候会进行mergeOptions()合并配置
        this.options[type + 's'][id] = definition
        return definition
      }
    }
  })
}
