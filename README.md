# Skimia Extension Framework (SEF)

the goal of this project is handle the new developpement way (such as php traits), using "mixin" decorators


## Install

Install with [npm](https://www.npmjs.com/)

```sh
npm i skimia-sef --save
```

## TODO

- [ ] find a way to configure mixins
- [ ] add events (on instance creation to call all "mixinConstructors")
- [ ] export to a new package

## Exemple

```ts

//mixin definition
const Resource = mixin('MixinName', {
    //access to local property in underscored snake case
    Premium() : boolean {
        return this._is_premium || (this._is_premium = false)
    },
    //setter
    setPremium(value:boolean) : IResource{
        this._is_premium = value
        return this
    }
}, {
    //Array of mixinNames dependent for this mixin
    dependencies: []
});
//mixin interface
interface IResource{
    Premium() : boolean
    setPremium(value:boolean) : IResource
}

//apply mixin
@Resource
class ResourceTemplate{
}

//fix (apply mixin interface)
interface ResourceTemplate extends IResource {}

//use
let rezz = new ResourceTemplate()
rezz.setPremium(true)
console.log(rezz.Premium()); // => true
```

Note:

- a mixin cannot redefine class members
- MixinName in **PascalCase**
- Property in **PascalCase**
- private var in **underscored snake_case**
- volatile var in **doubleunderscored snake_case** => __volatile (ex state)