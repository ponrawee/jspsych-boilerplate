const DEBUG = true
const JSPSYCH_OPTIONS = {
	on_finish: function() {
		if (DEBUG) {
			jsPsych.data.displayData()
		}
	}
}

/* URL Params and derivatives */
const URL_PARAMS = (new URL(document.location)).searchParams
const PLATFORM_ID = URL_PARAMS.get('PROLIFIC_ID') || 'NO-PLATFORM-ID'

/* Miscellaneous */
const SPINNER_HTML = '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>'