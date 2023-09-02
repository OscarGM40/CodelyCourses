

// NOTE typescript siempre transpila a Javascript(con "use strict").Si definimos un enum sin la keyword const se creará una función de JS bastante extensa,con mucho narrowing por indices.Al poner el const cambiar bastante el código transpilado,es mucho menos verboso(es un simple switch)
const enum StepType {
  QUIZ,
  VIDEO,
  CHALLENGUE
}

const videoStepType = StepType.VIDEO;

// una const enum compila a esto,sin la const es mucho más código:
function print(stepType: StepType) {
  switch (stepType) {
    case StepType.QUIZ:
      return "This is a quiz step";
    default:
      return "No quiz step";
  }
}
