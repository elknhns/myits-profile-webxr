const camera = document.querySelector('a-camera')
const video = document.querySelector('#video')
const label = document.querySelector('#labelSection')

const biodata = document.querySelector('#biodata')
const academics = document.querySelector('#academics')

var currentLabel = ""

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
})

Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
]).then(learnFaces)

function startVideo() {
    navigator.mediaDevices.getUserMedia({ video: {} })
        .then(stream => video.srcObject = stream)
        .catch(err => console.error(err))
}

async function learnFaces() {
    console.time('Face Matcher preparation')
    console.debug('Face API Models loaded')

    // await updateDescriptors()

    const descriptorsAddress = await getDescriptors()

    labeledDescriptorsJson = await $.getJSON(descriptorsAddress)
    const labeledDescriptors = labeledDescriptorsJson.map( x=>faceapi.LabeledFaceDescriptors.fromJSON(x) );

    console.debug(labeledDescriptors)
    await prepareImages(labeledDescriptors)
    
    const faceMatcher = prepareFaceMatcher(labeledDescriptors)
    console.debug('Face Matcher ready')
    console.timeEnd('Face Matcher preparation')

    startVideo()
    recognizeFaces(faceMatcher)
}

async function recognizeFaces(faceMatcher) {
    video.addEventListener('play', () => {
        setInterval(async () => {
            const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors()    
            const results = detections.map((d) => {
                return faceMatcher.findBestMatch(d.descriptor)
            })
            // console.log(results)
            
            currentLabel = processResults(results)
        }, 200)
    })
}

function prepareFaceMatcher(labeledDescriptors) {
    return new faceapi.FaceMatcher(labeledDescriptors, 0.6)
}

async function updateDescriptors() {
    var labeledDescriptors = await loadLabeledImages()
    console.debug('All labeled images loaded')

    labeledDescriptors = cleanDescriptors(labeledDescriptors)

    console.debug(labeledDescriptors)

    var labeledDescriptorsJson = labeledDescriptors.map(x=>x.toJSON())

    saveDescriptors(JSON.stringify(labeledDescriptorsJson))
}

async function loadLabeledImages() {
    // var labels = await requestAllNRP()
    var labels = []
    const uniqueLabels = await getRegisteredLabels()
    uniqueLabels.forEach((label) => {
        labels.push(label)
    })

    return Promise.all(
        labels.map(async label => {
            const descriptions = []
            if (uniqueLabels.includes(label)) {
                for (let i = 1; i < 4; i++) {
                    const link = await requestMyPhotos(label, i)
                    console.debug(label, i, link)
                    if (i === 1) registerPhoto(label, link)

                    const img = await faceapi.fetchImage(link)
                    console.debug(img)
                    const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
                    descriptions.push(detections.descriptor)
                    console.debug(`${label}'s ${i}th face loaded`)
                }
                return new faceapi.LabeledFaceDescriptors(label, descriptions)
            } else {
                const link = await requestPhoto(label)
                console.debug(link)
                if (!link) {
                    console.debug(label + "'s photo not found")
                    return null
                } else {
                    registerPhoto(label, link)
                    
                    const img = await faceapi.fetchImage(link)
                    console.debug(img)
                    const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
                    descriptions.push(detections.descriptor)

                    console.debug(label + "'s face loaded")
                    return new faceapi.LabeledFaceDescriptors(label, descriptions)
                }
            }
        })
    )
}

async function processResults(results) {
    if (results.length === 0) {
        updateLabel()
        updateBiodata()
        updateAcademics()
        return ""
    }
    const result = results[0]
    console.debug(result)

    if (result.label !== 'unknown') {
        const response = await requestInfo(result.label)
        const course = JSON.parse(response)
        updateLabel(result.distance, course)
        updateBiodata(course)
        updateAcademics(course)
        return result.label
    }
}

function cleanDescriptors(descriptors) {
    return descriptors.filter(descriptor => descriptor !== null)
}

async function prepareImages(labeledDescriptors) {
    const link = await getPhotoAddress()
    const uniqueLabels = await getRegisteredLabels()
    return Promise.all(
        Object.values(labeledDescriptors).map(face => {
            if(uniqueLabels.includes(face.label)) return registerPhoto(face.label, `${link}/photos/${face.label}/1.jpg`)
            registerPhoto(face.label, `${link}/${face.label}.jpg`)
        })
    )
}

function registerPhoto(nrp, src) {
    const assets = document.querySelector('a-assets')
    const img = document.createElement('img')
    img.setAttribute('id', `photo-${nrp}`)
    img.setAttribute('src', src)
    assets.appendChild(img)
}

function requestMyPhotos(nrp, filename) {
    return $.ajax({
        type: 'POST',
        url: `search/${nrp}/${filename}/photo`,
    })
}

function getRegisteredLabels() {
    return $.ajax({
        type: 'POST',
        url: 'get-registered-labels'
    })
}

function getPhotoAddress() {
    return $.ajax({
        type: 'POST',
        url: 'get-photo-address'
    })
}

function requestAllNRP() {
    return $.ajax({
        type: 'POST',
        url: `nrp`,
    })
}

function requestPhoto(nrp) {
    return $.ajax({
        type: 'POST',
        url: `search/${nrp}/photo`,
    })
}

function saveDescriptors(content) {
    $.ajax({
        type: "POST",
        url: 'save-descriptors',
        data: {
            content: content
        }
    })
}

function getDescriptors() {
    return $.ajax({
        type: "POST",
        url: 'get-descriptors'
    })
}

function requestInfo(nrp) {
    return $.ajax({
        type: 'POST',
        url: `search/${nrp}`,
    })
}

async function updateLabel(confidence, info = null) {
    if (!confidence) {
        label.children[0].setAttribute('visible', 'false')
        label.children[1].setAttribute('value', '')
        label.children[2].setAttribute('value', '')
        label.children[3].setAttribute('visible', 'false')
        return
    }

    label.children[3].lastElementChild.setAttribute('value', `${Math.round(confidence*100)}%`)

    if (info) {
        label.children[0].setAttribute('visible', 'true')
        label.children[0].setAttribute('src', `#photo-${info.nrp}`)
        label.children[1].setAttribute('value', info.nama)
        label.children[2].setAttribute('value', info.nrp)
        label.children[3].setAttribute('visible', 'true')
    }
}

function updateBiodata(info = null) {
    const details = biodata.lastElementChild
    const detailText = details.lastElementChild

    if (!info) {
        for (child of detailText.children) {
            child.lastElementChild.setAttribute('value', 'Wajah tidak dikenal')
        }
        return        
    }
    
    detailText.children[0].lastElementChild.setAttribute('value', capitalize(info.nama_lengkap))
    detailText.children[1].lastElementChild.setAttribute('value', info.email)
    detailText.children[2].lastElementChild.setAttribute('value', info.no_telp)
    detailText.children[3].lastElementChild.setAttribute('value', filterGender(info.jenis_kelamin))
    detailText.children[4].lastElementChild.setAttribute('value', info.agama)
    detailText.children[5].lastElementChild.setAttribute('value', info.golongan_darah)
    detailText.children[6].lastElementChild.setAttribute('value', `${filterBirthPlace(info.tempat_lahir)}, ${filterBirthday(info.tanggal_lahir)}`)
    detailText.children[7].lastElementChild.setAttribute('value', `${info.alamat_surabaya}, ${info.kode_pos}`)
}

function updateAcademics(info = null) {
    const details = academics.lastElementChild
    const detailText = details.lastElementChild

    if (!info) {
        for (child of detailText.children) {
            child.lastElementChild.setAttribute('value', 'Wajah tidak dikenal')
        }
        return
    }
    
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