import m from 'mithril';

export const Container = () => {
  const data = [];

  const fetchFile = async (filename) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/files/${encodeURIComponent(filename)}/download`
      );

      if (!response.ok) {
        throw new Error('Gagal mengambil file');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      data.push({
        name: filename,
        url: url,
        blob: blob
      });

      m.redraw();

      console.log('File berhasil diambil:', data[data.length - 1]);

    } catch (error) {
      console.error('Fetch file error:', error);
    }
  };

  const uploadFile = () => {
    const input = document.createElement('input');

    input.type = 'file';

    input.onchange = async () => {
      const file = input.files && input.files[0];

      if (!file) return;

      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch(
          'http://127.0.0.1:3000/files/upload',
          {
            method: 'POST',
            body: formData
          }
        );

        if (!response.ok) {
          throw new Error('Upload gagal');
        }

        const result = await response.json();

        console.log('Upload berhasil:', result);

        const filename = result.filename;

        if (!filename) {
          throw new Error(
            'Filename tidak ditemukan dari response backend'
          );
        }

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
      <div className="w-[100vw] min-h-[100vh] bg-blue-50">

        <button
          onclick={uploadFile}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Upload
        </button>

        <div className="w-full mt-[11vh] flex flex-row flex-wrap justify-center items-center gap-4">

          {data.map((file) => (
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
          ))}

        </div>

      </div>
    )
  };
};
