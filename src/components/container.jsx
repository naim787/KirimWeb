import m from 'mithril';
import {Nav} from './nav'

export const Container = () => {

  return {
    view: () => (
      <>
        <div className="w-[100vw] h-[100vh]
          bg-blue-50">
          <Nav/>
          <div className="w-full h-[fullvh] mt-[11vh] flex-row flex-wrap justify-center items-center">
             <div className="w-[90vw] h-30 flex bg-white">
               <div className="w-30">
                 <img src="/favicon.png"></img>
               </div>
               <p className="m-auto">file world minecraft, for brother</p>
               <div className="w-30 flex">
                 <div className="px-3 py-2 bg-green-500 m-auto rounded-md">simpan</div>
               </div>
             </div>
             <div className="w-[90vw] h-30 flex bg-white">
               <div className="w-30">
                 <img src="/favicon.png"></img>
               </div>
               <p className="m-auto">file world minecraft, for brother</p>
               <div className="w-30 flex">
                 <div className="px-3 py-2 bg-green-500 m-auto rounded-md">simpan</div>
               </div>
             </div>
          </div>
        </div>
      </>
    )
  };
};