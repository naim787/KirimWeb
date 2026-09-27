import m from 'mithril';

export const Counter = () => {
  let num = 0;

  return {
    view: () => (
      m('div',
        m('h2' ,{class: "text-red-500"}, 'Counter'),
        m('h3', num),
        m('button', { onclick: () => num += 1 }, 'Increment'),
        m('button', { onclick: () => num -= 1 }, 'Decrement')
      )
    )
  };
};
