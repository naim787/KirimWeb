import m from 'mithril';

export const Nav = () => {

  return {
    view: () => (
      <>
<nav class="fixed w-full z-20 top-0 start-0 border-b-1 border-default text-white bg-gray-950">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="/favicon.png" class="h-10" alt="Flowbite Logo" />
        <span class="self-center text-xl text-heading font-semibold whitespace-nowrap">Kirim Web</span>
    </a>
    <input
    id="folder-upload"
    type="file"
    webkitdirectory
    style={{ display: "none" }}
    onchange={(e) => {
      const files = e.target.files;
      console.log(files);
    }}
  />
    <button onclick={() => document.getElementById("folder-upload").click()} 
      data-collapse-toggle="navbar-default" type="button" class="text-black p-3 text-sm rounded-md mx-3 bg-white">
     UPLOAD
    </button>
  </div>
</nav>
      </>
    )
  };
};

