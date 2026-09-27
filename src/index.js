import m from 'mithril';
// import { Counter } from './Counter';
// import { Input } from './Input';

import {Container} from './components/container'

//import "/style.css"

m.mount(document.getElementById('app'), {
  view: () => (
    m(Container
      // m('h1', 'mithril esbuild starter'),
      //m(Counter),
     // m(Input, {class: "bg-red-500"})
    )
  )
});

if (window.DEV_MODE) {
  // enable live reload in dev mode
  new EventSource('/esbuild').addEventListener('change', () => location.reload())
}