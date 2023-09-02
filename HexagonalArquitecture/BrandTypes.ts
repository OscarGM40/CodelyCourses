type PositiveNumber = number & { __brand: 'PositiveNumber'};

// no puedo anotar una variable con este tipo porque tiene una propiedad readonly(__prop)
// const x: PositiveNumber = 10;

function divide(a:number,b:PositiveNumber){
  return a/b;
}
// lo que se suele hacer es crear una funcion validadora(ojo al asserts argument is type)
function assertPositiveNumber(x:unknown): asserts x is PositiveNumber {
  if(typeof x === 'number' && x < 0){
    throw new Error('Number is not greater than zero')
  }
}
// y ahora creo una variable sin tipar(pues es readonly si la tipo) y le paso la funcion validadora.Puede ser un approach interesante en algun contexto,si
const x = 15;
assertPositiveNumber(x);
divide(100,x);