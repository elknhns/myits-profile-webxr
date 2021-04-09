const video = document.getElementById('video')

Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
]).then(recognizeFaces)

function startVideo() {
    navigator.getUserMedia(
        { video: {} },
        stream => video.srcObject = stream,
        err => console.error(err)
    )
}

async function recognizeFaces() {
    const labeledDescriptors = await loadLabeledImages()
    console.log('All labeled images loaded')
    const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6)
    console.log('Face Matcher done')

    startVideo()
    
    video.addEventListener('play', () => {
        console.log('Video played')
        const canvas = faceapi.createCanvasFromMedia(video)
        document.body.append(canvas)
        console.log('Canvas added')
        const displaySize = { width: video.width, height: video.height }
        faceapi.matchDimensions(canvas, displaySize)
        setInterval(async () => {
            const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors()
            const resizedDetections = faceapi.resizeResults(detections, displaySize)
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)

            const results = resizedDetections.map((d) => {
                return faceMatcher.findBestMatch(d.descriptor)
            })
            // faceapi.draw.drawDetections(canvas, resizedDetections)
            // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
            // faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
            results.forEach((result, i) => {
                const box = resizedDetections[i].detection.box
                const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
                drawBox.draw(canvas)
            })
        }, 100)
    })
}

function loadLabeledImages() {
    const labels = ['Elkana Hans', 'Paksi Ario', 'Raehan']
    return Promise.all(
        labels.map(async label => {
            const descriptions = []
            for (let i = 0; i < 2; i++) {
                const img = await faceapi.fetchImage(`https://raw.githubusercontent.com/elknhns/myits-profile-webxr/master/public/labeled_images/${label}/${i}.jpg`)
                const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
                descriptions.push(detections.descriptor)
                console.log(`Added image ${i}.jpg`)
            }
            console.log(label + "'s face loaded")
            return new faceapi.LabeledFaceDescriptors(label, descriptions)
        })
    )
}