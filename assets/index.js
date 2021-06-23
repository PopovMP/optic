const view = {}

function initialize() {
	view.rightRes = document.getElementById('right-res')
	view.leftRes  = document.getElementById('left-res')

	initializeSph()
	initializeCyl()
	initializeAdd()
	initializePupil()

	calculate()
}

function initializeSph() {
	view.rightSph = document.getElementById('right-sph')
	view.leftSph  = document.getElementById('left-sph')

	const sphOptions = []
	for (let sph = 800; sph >= -800; sph -= 25) {
		sphOptions.push(`<option id="${sph}">${(sph / 100).toFixed(2)}</option>`)
	}
	const sphOptionHtml = sphOptions.join('/n')
	view.rightSph.innerHTML = sphOptionHtml
	view.leftSph.innerHTML  = sphOptionHtml
	view.rightSph.value = '0.00'
	view.leftSph.value  = '0.00'

	view.rightSph.addEventListener( 'change', option_changed)
	view.leftSph.addEventListener('change',   option_changed)
}

function initializeCyl() {
	view.rightCyl = document.getElementById('right-cyl')
	view.leftCyl  = document.getElementById('left-cyl')

	const sphOptions = []
	for (let cyl = 600; cyl >= -600; cyl -= 25) {
		sphOptions.push(`<option id="${cyl}">${(cyl / 100).toFixed(2)}</option>`)
	}
	const sphOptionHtml = sphOptions.join('/n')
	view.rightCyl.innerHTML = sphOptionHtml
	view.leftCyl.innerHTML  = sphOptionHtml

	view.rightCyl.value = '0.00'
	view.leftCyl.value  = '0.00'

	view.rightCyl.addEventListener('change', option_changed)
	view.leftCyl.addEventListener( 'change', option_changed)
}

function initializeAdd() {
	view.rightAdd = document.getElementById('right-add')
	view.leftAdd  = document.getElementById('left-add')

	const addOptions = []
	for (let add = 350; add >= 75; add -= 25) {
		addOptions.push(`<option id="${add}">${(add / 100).toFixed(2)}</option>`)
	}
	const addOptionHtml = addOptions.join('/n')

	view.rightAdd.innerHTML = addOptionHtml
	view.leftAdd.innerHTML  = addOptionHtml

	view.rightAdd.value = '0.75'
	view.leftAdd.value  = '0.75'

	view.rightAdd.addEventListener( 'change', option_changed)
	view.leftAdd.addEventListener('change',   option_changed)
}

function initializePupil() {
	view.rightPupil = document.getElementById('right-pupil')
	view.leftPupil  = document.getElementById('left-pupil')

	const pupilOptions = []
	for (let pupil = 30; pupil >= 10; pupil -= 1) {
		pupilOptions.push(`<option id="${pupil}">${pupil}</option>`)
	}
	const addOptionHtml = pupilOptions.join('/n')

	view.rightPupil.innerHTML = addOptionHtml
	view.leftPupil.innerHTML  = addOptionHtml

	view.rightPupil.value = '19'
	view.leftPupil.value  = '19'

	view.rightPupil.addEventListener( 'change', option_changed)
	view.leftPupil.addEventListener('change',   option_changed)
}

function option_changed(event) {
	event.preventDefault()

	calculate()
}

function calculate() {
	const rightSph = Math.round(parseFloat(view.rightSph.value) * 100)
	const rightCyl = Math.round(parseFloat(view.rightCyl.value) * 100)
	const rightSe  = getSe(rightSph, rightCyl)

	const leftSph = Math.round(parseFloat(view.leftSph.value) * 100)
	const leftCyl = Math.round(parseFloat(view.leftCyl.value) * 100)
	const leftSe  = getSe(leftSph, leftCyl)

	const rightPup = parseInt(view.rightPupil.value)
	if (rightPup < 15) {
		view.rightRes.innerHTML = 'Bas Sh<br>Pr Sh<br>Al Sh<br>Chan 5'
	}

	const leftPup = parseInt(view.leftPupil.value)
	if (leftPup < 15) {
		view.leftRes.innerHTML = 'Bas Sh<br>Pr Sh<br>Al Sh<br>Chan 5'
	}

	if ( Math.abs(rightSe - leftSe) < 300) {
		if (rightPup >= 15) {
			const rightAdd = Math.round(parseFloat(view.rightAdd.value) * 100)
			view.rightRes.innerHTML = calculateOptic(rightSe, rightAdd, rightPup)
		}

		if (leftPup >= 15) {
			const leftAdd = Math.round(parseFloat(view.leftAdd.value) * 100)
			view.leftRes.innerHTML = calculateOptic(leftSe, leftAdd, leftPup)
		}
	}
	else {
		if (rightPup >= 15) {
			view.rightRes.innerHTML = 'HD<br>HD 2<br>HD 3<br>Chan 7'
		}

		if (rightPup >= 15) {
			view.leftRes.innerHTML  = 'HD<br>HD 2<br>HD 3<br>Chan 7'
		}
	}
}

function getSe(sph, cyl) {
	return (sph >=0 && cyl >= 0) || (sph <= 0 && cyl <= 0)
		? sph + (cyl / 2)
		: sph - (-cyl / 2)
}

function calculateOptic(se, add, pup) {
	let opDesign = ''
	let forceChannel = 0

	if (se < -300) {
		switch (add) {
			case 75:
			case 100:
				opDesign = 'HD<br>HD 2<br>HD 3'
				break
			case 125:
			case 150:
				opDesign = 'HD<br>HD 2<br>HD 3'
				break
			case 175:
			case 200:
				opDesign = 'HD<br>HD 2<br>HD 3'
				break
			case 225:
			case 250:
				opDesign = 'HD<br>HD 2<br>HD 3'
				break
			case 275:
			case 300:
			case 325:
			case 350:
				opDesign = 'HD<br>HD 2<br>HD 3'
				break
		}
	}
	else if (se >= -300 && se < -125) {
		switch (add) {
			case 75:
			case 100:
				opDesign = 'HD<br>HD 2<br>HD 3'
				break
			case 125:
			case 150:
				opDesign = 'HD<br>HD 2<br>HD 3'
				break
			case 175:
			case 200:
				opDesign = 'MD<br>MD 2<br>MD 3'
				break
			case 225:
			case 250:
				opDesign = 'MD<br>MD 2<br>MD 3'
				break
			case 275:
			case 300:
			case 325:
			case 350:
				opDesign = 'MD<br>MD 2<br>MD 3'
				break
		}
	}
	else if (se >= -125 && se < 150) {
		switch (add) {
			case 75:
			case 100:
				opDesign = 'SD<br>S 35<br>A 35'
				if (pup > 22) {
					forceChannel = 13
				}
				break
			case 125:
			case 150:
				opDesign = 'SD<br>S 35<br>A 35'
				if (pup > 22) {
					forceChannel = 13
				}
				break
			case 175:
			case 200:
				opDesign = 'SD<br>SD 2<br>SD 3'
				break
			case 225:
			case 250:
				opDesign = 'SD<br>SD 2<br>SD 3'
				break
			case 275:
			case 300:
			case 325:
			case 350:
				opDesign = 'SD<br>SD 2<br>SD 3'
				break
		}
	}
	else if (se >= 150 && se < 325) {
		switch (add) {
			case 75:
			case 100:
				opDesign = 'SD<br>S 35<br>A 35'
				break
			case 125:
			case 150:
				opDesign = 'SD<br>S 2<br>A 3'
				break
			case 175:
			case 200:
				opDesign = 'MD<br>MD 2<br>MD 3'
				break
			case 225:
			case 250:
				opDesign = 'MD<br>MD 2<br>MD 3'
				break
			case 275:
			case 300:
			case 325:
			case 350:
				opDesign = 'MD<br>MD 2<br>MD 3'
				break
		}
	}
	else if (se >= 325) {
		switch (add) {
			case 75:
			case 100:
				opDesign = 'MD<br>MD 2<br>MD 3'
				break
			case 125:
			case 150:
				opDesign = 'MD<br>MD 2<br>MD 3'
				break
			case 175:
			case 200:
				opDesign = 'MD<br>MD 2<br>MD 3'
				break
			case 225:
			case 250:
				opDesign = 'MD<br>MD 2<br>MD 3'
				break
			case 275:
			case 300:
			case 325:
			case 350:
				opDesign = 'MD<br>MD 2<br>MD 3'
		}
	}

	const ch = se <= -125
		? pup <= 19
			? 7
			: 9
		: pup <= 19
			? 9
			: pup <= 22
				? 11
				: 13

	return opDesign + `<br>Chan ${forceChannel !== 0 ? forceChannel : ch}`
}
