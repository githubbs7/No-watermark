let user = document.querySelector('input')
let btn = document.querySelector('button')
let video = document.querySelector('video')
video.style.display = 'none'

btn.addEventListener('click', async function da() {
    let api = await fetch(`http://localhost:3000/download-tiktok?url=${user.value}`)
    let data = await api.json()
    video.style.display = 'block'
    video.src = data.videoUrl
})
