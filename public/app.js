let user = document.querySelector('input')
let btn = document.querySelector('button')
let video = document.querySelector('video')
video.style.display = 'none'

btn.addEventListener('click', async function da() {
    let api = await fetch(`https://no-watermark.vercel.app/download-tiktok?url=${user.value}`);
    let data = await api.json()
    video.style.display = 'block'
    video.src = data.videoUrl
})
