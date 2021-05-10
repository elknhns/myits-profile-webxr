const camera = document.querySelector('a-camera')
const video = document.querySelector('#video')
const label = document.querySelector('#labelSection')

const biodata = document.querySelector('#biodata')
const details = biodata.lastElementChild

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
    
    const faceMatcher = prepareFaceMatcher(labeledDescriptors)
    console.log('Face Matcher done')

    startVideo()

    video.addEventListener('play', function () {
        var currentLabel = ""
        setInterval(async () => {
            const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors()    
            const results = detections.map((d) => {
                return faceMatcher.findBestMatch(d.descriptor)
            })
            
            if (results.length !== 0) {
                const result = results[0]

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
                                updateLabel(response)
                                updateDetails(response)
                            },
                            error: function (error) {
                                console.log(error)
                            }
                        })
                        currentLabel = result.label
                    }   
                }
            }
        }, 1000)
    })
}

function prepareFaceMatcher(labeledDescriptors) {
    return new faceapi.FaceMatcher(labeledDescriptors, 0.6)
}

function loadLabeledImages() {
    const labels = ['05111740000049', '05111740000076', '05111740000127', '05111740000154']
    return Promise.all(
        labels.map(async label => {
            const descriptions = []
            for (let i = 0; i < 2; i++) {
                const img = await faceapi.fetchImage(`https://raw.githubusercontent.com/elknhns/myits-profile-webxr-photos/main/labeled_images/${label}/${i}.jpg`)
                const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
                descriptions.push(detections.descriptor)
                // console.log(`Added image ${i}.jpg`)
            }
            console.log(label + "'s face loaded")
            return new faceapi.LabeledFaceDescriptors(label, descriptions)
        })
    )
}

function updateLabel(info) {
    label.children[0].setAttribute('value', info.nama)
    label.children[1].setAttribute('value', info.nrp)
}

function updateDetails(info) {
    details.children[1].children[2].setAttribute('value', capitalize(info.nama_lengkap))
    details.children[2].children[2].setAttribute('value', filterGender(info.jenis_kelamin))
    details.children[3].children[2].setAttribute('value', `${filterBirthPlace(info.tempat_lahir)}, ${filterBirthday(info.tanggal_lahir)}`)
    details.children[4].children[2].setAttribute('value', info.agama)
    details.children[5].children[2].setAttribute('value', info.no_telp)
    details.children[6].children[2].setAttribute('value', info.email)
    details.children[7].children[2].setAttribute('value', info.golongan_darah)
    details.children[8].children[2].setAttribute('value', info.alamat_surabaya)
}

function capitalize(sentence) {
    sentence = sentence.split(' ')
    for (let i = 0; i < sentence.length; i++) {
        sentence[i] = sentence[i].charAt(0).toUpperCase() + sentence[i].slice(1).toLowerCase()
    }
    return sentence.toString().replace(/,/g, " ")
}

function filterGender(gender) {
    return gender === 'L' ? 'Laki-laki' : 'Perempuan'
}

function filterBirthPlace(birthplace) {
    let commaPos = birthplace.indexOf(',')
    return (commaPos < 0) ? capitalize(birthplace) : capitalize(birthplace.slice(0, commaPos))
}

function filterBirthday(birthday) {
    // birthday = [yyyy, mm, dd]
    birthday = birthday.split('-')

    let months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

    // return d m Y
    return `${birthday[2]} ${months[parseInt(birthday[1]) - 1]} ${birthday[0]}`
}