import { Boss } from '../../types/boss';

function bossAdapt(element: Boss): Boss {
  return { ...element };
}

function bossesAdapt(elements: Boss[]): Boss[] {
  return elements ? elements.map((element) => bossAdapt(element)) : [];
}

export {
  bossAdapt,
  bossesAdapt,
}
