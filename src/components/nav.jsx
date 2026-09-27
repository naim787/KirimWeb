import m from 'mithril';

export const Nav = () => {

  return {
    view: () => (
      <>
<nav class="bg-neutral-primary fixed w-full z-20 top-0 start-0 border-b-1 border-default text-white bg-gray-950">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="https://flowbite.com/docs/images/logo.svg" class="h-7" alt="Flowbite Logo" />
        <span class="self-center text-xl text-heading font-semibold whitespace-nowrap">Kirim Web</span>
    </a>
    <button data-collapse-toggle="navbar-default" type="button" class="text-black p-3 text-sm rounded-md mx-3 bg-white">
     UPLOAD
    </button>
  </div>
</nav>
      </>
    )
  };
};

