const camera = document.querySelector('a-camera')
const video = document.querySelector('#video')
const label = document.querySelector('#labelSection')

const biodata = document.querySelector('#biodata')
const academics = document.querySelector('#academics')

var currentLabel = ""

Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
]).then(recognizeFaces)

function startVideo() {
    navigator.mediaDevices.getUserMedia(
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
        setInterval(async () => {
            const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors()    
            const results = detections.map((d) => {
                return faceMatcher.findBestMatch(d.descriptor)
            })
            // console.log(currentLabel)
            
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
                                updateBiodata(response)
                                updateAcademics(response)
                            },
                            error: function (error) {
                                console.log(error)
                            }
                        })
                        currentLabel = result.label
                    }   
                }
            } else {
                currentLabel = ""
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

function updateBiodata(info) {
    const details = biodata.lastElementChild
    const detailText = details.lastElementChild
    
    detailText.children[0].lastElementChild.setAttribute('value', capitalize(info.nama_lengkap))
    detailText.children[1].lastElementChild.setAttribute('value', info.email)
    detailText.children[2].lastElementChild.setAttribute('value', info.no_telp)
    detailText.children[3].lastElementChild.setAttribute('value', filterGender(info.jenis_kelamin))
    detailText.children[4].lastElementChild.setAttribute('value', info.agama)
    detailText.children[5].lastElementChild.setAttribute('value', info.golongan_darah)
    detailText.children[6].lastElementChild.setAttribute('value', `${filterBirthPlace(info.tempat_lahir)}, ${filterBirthday(info.tanggal_lahir)}`)
    detailText.children[7].lastElementChild.setAttribute('value', `${info.alamat_surabaya}, ${info.kode_pos}`)
}

function updateAcademics(info) {
    const details = academics.lastElementChild
    const detailText = details.lastElementChild
    
    detailText.children[0].lastElementChild.setAttribute('value', info.nrp)
    detailText.children[1].lastElementChild.setAttribute('value', capitalize(info.prodi))
    detailText.children[2].lastElementChild.setAttribute('value', fliterGPA(info.ipk))
    detailText.children[3].lastElementChild.setAttribute('value', info.tahun_masuk)
    detailText.children[4].lastElementChild.setAttribute('value', info.sks_lulus)
    detailText.children[5].lastElementChild.setAttribute('value', info.semester_ke)
    detailText.children[6].lastElementChild.setAttribute('value', info.dosen_wali)
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
    return `${parseInt(birthday[2])} ${months[parseInt(birthday[1]) - 1]} ${birthday[0]}`
}

function fliterGPA(gpa) {
    // Round GPA to 2 digit decimal
    return parseFloat(gpa).toFixed(2)
}