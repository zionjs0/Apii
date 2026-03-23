import ytdl from '@distube/ytdl-core';

export default async function handler(req, res) {
  try {
    const { url } = req.query

    if (!url) {
      return res.status(400).json({
        status: false,
        message: 'Masukkan url'
      })
    }

    if (!ytdl.validateURL(url)) {
      return res.status(400).json({
        status: false,
        message: 'URL tidak valid'
      })
    }

    const info = await ytdl.getInfo(url)

    const format = ytdl.chooseFormat(info.formats, {
      quality: 'highestaudio',
      filter: 'audioonly'
    })

    return res.status(200).json({
      status: true,
      title: info.videoDetails.title,
      result: format.url
    })

  } catch (e) {
    return res.status(500).json({
      status: false,
      message: 'Gagal ambil audio',
      error: e.message
    })
  }
}
