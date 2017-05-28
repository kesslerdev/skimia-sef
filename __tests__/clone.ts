import { inspect } from 'util'
import { clone } from '../src/clone'


class Y{
  protected Test:[]

  protected claxx:Y

  testM(){}
}

class X extends Y {}

describe('clone', () => {
  it('should has the same representation with empty class', () => {
    let x = new X();
    x.Test = ['value']
    let copy = clone(x, false);

    expect(inspect(copy,true)).toBe(inspect(x,true));
  });

  it('cloned array should be equal to original empty array', () => {
    let x = [new X()];
    let copy = clone(x, true);

    expect(inspect(copy,true)).toBe(inspect(x,true));
  });

  it('cloned class should be equal to self referenced property', () => {
    let x = new X();
    x.claxx = x
    //circular true or infinite recursion
    let copy = clone(x, true);

    expect(copy).toBe(copy.claxx)
  });
});