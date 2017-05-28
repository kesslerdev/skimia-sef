
declare global {
  interface Function{
    curry() : Function
  }
}

Function.prototype.curry = function () : any {
  const fn = this
  const args = [].slice.call(arguments, 0)
  return function () {
    return fn.apply(this, args.concat([].slice.call(arguments, 0)))
  }
}

export * from './mixin'
export * from './clone'

export interface IExtendable{
  Extensions() : string
}
