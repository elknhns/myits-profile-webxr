const camera = document.querySelector('a-camera')
const video = document.querySelector('#video')
const nrp = document.querySelector('#nrp')

const profile = document.querySelector('#profile')

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
    console.log('Face API Models loaded')
    const labeledDescriptors = await loadLabeledImages()
    console.log('All labeled images loaded')
    const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6)
    console.log('Face Matcher done')

    startVideo()

    video.addEventListener('play', function () {
        var currentLabel = ""
        setInterval(async () => {
            const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors()
            // console.log(video)
    
            const results = detections.map((d) => {
                return faceMatcher.findBestMatch(d.descriptor)
            })
            
            results.forEach((result) => {
                // console.log(result.label)
                if (result.label != currentLabel) {
                    if (result.label != 'unknown') {
                        $.ajaxSetup({
                            headers: {
                                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                            }
                        })
                        $.ajax({
                            type: 'POST',
                            url: `search/${result.label}`,
                            success: function (response) {
                                console.log(response)
                                nrp.setAttribute('value', response.nrp)
                            },
                            error: function (error) {
                                console.log(error)
                            }
                        })
                        currentLabel = result.label
                    }   
                }
            })
        }, 1000)
    })
}

function loadLabeledImages() {
    const labels = ['05111740000076', '05111740000127', '05111740000154']
    return Promise.all(
        labels.map(async label => {
            const descriptions = []
            for (let i = 0; i < 2; i++) {
                const img = await faceapi.fetchImage(`https://raw.githubusercontent.com/elknhns/myits-profile-webxr/master/public/labeled_images/${label}/${i}.jpg`)
                const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
                descriptions.push(detections.descriptor)
                // console.log(`Added image ${i}.jpg`)
            }
            console.log(label + "'s face loaded")
            return new faceapi.LabeledFaceDescriptors(label, descriptions)
        })
    )
}