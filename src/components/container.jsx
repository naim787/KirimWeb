import m from 'mithril';
import { Nav } from './nav';

export const Container = () => {

  const uploadFile = () => {
    const input = document.createElement('input');

    input.type = 'file';

    input.onchange = async () => {
      const file = input.files?.[0];

      if (!file) return;

      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('http://127.0.0.1:3000/files/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Upload gagal');
        }

        const result = await response.json();

        console.log('Upload berhasil:', result);

        alert('File berhasil diupload');

        // Meminta Mithril melakukan render ulang
        m.redraw();
      } catch (error) {
        console.error('Upload error:', error);
        alert('Gagal upload file');
      }
    };

    input.click();
  };

  return {
    view: () => (
      <>
        <div className="w-[100vw] h-[100vh] bg-blue-50">

          {/* <Nav /> */}

          <button
            onclick={uploadFile}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Upload
          </button>

          <div className="w-full mt-[11vh] flex flex-row flex-wrap justify-center items-center gap-4">

            <div className="w-[90vw] h-30 flex bg-white">

              <div className="w-30">
                <img src="/favicon.png" />
              </div>

              <p className="m-auto">
                file world minecraft, for brother
              </p>

              <div className="w-30 flex">
                <div className="px-3 py-2 bg-green-500 m-auto rounded-md">
                  simpan
                </div>
              </div>

            </div>

          </div>
        </div>
      </>
    )
  };
};