import m from 'mithril';
import {Nav} from './nav'

export const Container = () => {

  return {
    view: () => (
      <>
        <div className="w-[100vw] h-[100vh]
          bg-blue-50">
          <Nav/>
        </div>
      </>
    )
  };
};