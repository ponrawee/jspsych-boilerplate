async function main() {

participantId = await get_participant_id()
platformId = PLATFORM_ID
condition = 'default'

/*** Global metadata ***/
jsPsych.data.addProperties({
	participant_id: participantId,
	platform_id: platformId,
	condition: condition,
})

/*** Preface Block ***/
const preloadTrial = {
	type: jsPsychPreload,
	auto: true,
	data: {
		trial_name: 'preload'
	}
}

const consentTrial = {
	type: jsPsychExternalHtml,
	url: 'consent.html',
	cont_btn: 'start',
	data: {
		trial_name: 'consent'
	}
}

const prefaceBlock = {
	timeline: [preloadTrial, consentTrial]
}


/*** Data Saving Block ***/
const saveDataBlock = [{
	type: jsPsychCallFunction,
	async: true,
	html: '<div id="exp-callfunc-prompt">' + 
			SPINNER_HTML + 
			'<br>Submitting the results... <br><strong>DO NOT CLOSE</strong>' + 
		'</div>',
	data: {
		trial_name: 'saveData'
	},
	func: (done) => {
		let data = jsPsych.data.get()
		data = data.ignore(['internal_node_id'])
		data = data.csv()
		save_all_data(data, done)
	}
}]

const mainTimeline = [].concat([
	prefaceBlock
])

jsPsych.run(mainTimeline)

}