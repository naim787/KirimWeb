import m from 'mithril';
import { Nav } from './nav';

interface FileData {
  name: string;
  url: string;
  blob?: Blob;
}

export const Container = () => {

  // Menampung semua file yang sudah diupload
  const data: FileData[] = [];

  // Mengambil file dari backend berdasarkan filename
  const fetchFile = async (filename: string) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/files/${encodeURIComponent(filename)}/download`
      );

      if (!response.ok) {
        throw new Error('Gagal mengambil file');
      }

      // Ambil data file sebagai Blob
      const blob = await response.blob();

      // Buat URL lokal agar file bisa digunakan di browser
      const url = URL.createObjectURL(blob);

      const fileData: FileData = {
        name: filename,
        url,
        blob,
      };

      // Push ke array
      data.push(fileData);

      // Minta Mithril render ulang
      m.redraw();

      console.log('File berhasil diambil:', fileData);

    } catch (error) {
      console.error('Fetch file error:', error);
    }
  };


  const uploadFile = () => {
    const input = document.createElement('input');

    input.type = 'file';

    input.onchange = async () => {
      const file = input.files?.[0];

      if (!file) return;

      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch(
          'http://127.0.0.1:3000/files/upload',
          {
            method: 'POST',
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error('Upload gagal');
        }

        const result = await response.json();

        console.log('Upload berhasil:', result);

        /*
         * Misalnya response backend:
         *
         * {
         *   "filename": "minecraft.world"
         * }
         *
         * Ambil nama file dari response.
         */
        const filename = result.filename;

        if (!filename) {
          throw new Error('Filename tidak ditemukan dari response backend');
        }

        // Setelah upload berhasil, ambil file dari endpoint download
        await fetchFile(filename);

        alert('File berhasil diupload');

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
        <div className="w-[100vw] min-h-[100vh] bg-blue-50">

          {/* <Nav /> */}

          <button
            onclick={uploadFile}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Upload
          </button>


          <div className="w-full mt-[11vh] flex flex-row flex-wrap justify-center items-center gap-4">

            {
              data.map((file) => (
                <div
                  className="w-[90vw] h-30 flex bg-white"
                  key={file.name}
                >

                  <div className="w-30">
                    <img
                      src="/favicon.png"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <p className="m-auto">
                    {file.name}
                  </p>

                  <div className="w-30 flex">

                    <a
                      href={file.url}
                      download={file.name}
                      className="px-3 py-2 bg-green-500 text-white m-auto rounded-md"
                    >
                      simpan
                    </a>

                  </div>

                </div>
              ))
            }

          </div>

        </div>
      </>
    )
  };
};