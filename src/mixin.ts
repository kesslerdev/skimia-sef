
import { IExtendable } from './skimia-sef';
import { inspect } from 'util';

function mixinsAccessor(target: any) {
    return function () {
        return target.__mixins || (target.__mixins = []);
    }
}


export function mixin(mixinTag: string, behaviour: any, options : { dependencies?:Array<string> } = {}) {
    const instanceKeys = Reflect.ownKeys(behaviour);
    const typeTag = Symbol('isa');

    function _mixin(target: any): any | IExtendable {

        //# Addons IExtendable
        if (!Reflect.has(target.prototype, 'Extensions')){
            Object.defineProperty(target.prototype, 'Extensions', { value: mixinsAccessor(target.prototype) });
        }
        if(!Reflect.has(target.prototype, typeTag)) {
            Object.defineProperty(target.prototype, typeTag, { value: true });
        }

        //# Checks
        if (Reflect.has(options, 'dependencies')) {
            for (let dep in options.dependencies) {
                if(!target.prototype.Extensions().includes(options.dependencies[dep])) {
                    throw new Error(`"${mixinTag}" depend [${options.dependencies.join()}] mixins`);
                }
            }
        }
        //not twice
        if(target.prototype.Extensions().includes(mixinTag)) {
            throw new Error(`Cannot set already added mixin "${mixinTag}"`);
        } else {
            target.prototype.Extensions().push(mixinTag);
        }    
        
        //# Copy properties
        for (let property of instanceKeys) {
            //do not replace a property if exists
            if (!Reflect.has(target.prototype, property)) {
                Object.defineProperty(target.prototype, property, Object.getOwnPropertyDescriptor(behaviour, property));
            }
        }
        return target;
    }
    //for instanceof
    Object.defineProperty(_mixin, Symbol.hasInstance, {
        value: (i: any) => !!i[typeTag]
    });

    return _mixin;
}