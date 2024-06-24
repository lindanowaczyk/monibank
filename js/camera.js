const botaoIniciarCamera = document.querySelector('[data-video-botao]')
const campoCamera = document.querySelector('[data-camera]')
const video = document.querySelector('[data-video]')
const botaoTirarFoto = document.querySelector('[data-tirar-foto]')
const canvas = document.querySelector('[data-video-canvas]') // canvas é a tag html que salva a imagem como se fosse um desenho digital e cria uma url
const mensagem = document.querySelector('[data-mensagem]')

let imagemURL = ''

botaoIniciarCamera.addEventListener('click', async function () {
    // navigator.mediaDevices: navegador pede para iniciar a camera
    // video: true, audio: false: quero somente o video, sem áudio
    const iniciarVideo = await navigator.mediaDevices.getUserMedia({video: true, audio: false}) 

    botaoIniciarCamera.style.display = 'none'
    campoCamera.style.display = 'block'

    video.srcObject = iniciarVideo // tag de origem do video recebe navigator que pede acesso a camera
})

botaoTirarFoto.addEventListener('click', function () {
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.heigth)

    imagemURL = canvas.toDataURL('image/jpeg')
    console.log(imagemURL);

    campoCamera.style.display = 'none';
    mensagem.style.display = 'block';
})