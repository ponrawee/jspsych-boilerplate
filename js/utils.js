// utility functions

// Shuffle without seed (use jsPsych functionality)
function unseeded_shuffle(array) {
	if (!Array.isArray(array)) {
		console.error("Argument to shuffle() must be an array.");
	}
	
	const copy_array = array.slice(0);
	let m = copy_array.length,
		t,
		i;
	
	// While there remain elements to shuffle…
	while (m) {
		// Pick a remaining element…
		i = Math.floor(Math.random() * m--);
	
		// And swap it with the current element.
		t = copy_array[m];
		copy_array[m] = copy_array[i];
		copy_array[i] = t;
	}
	
	return copy_array;
}


// data loaders/generators
async function get_participant_id() {
	const response = await fetch('backend/new_participant.php')
	if(!response.ok) {
		console.error(response.status)
		return false
	}
	const js = await response.json()
	return parseInt(js['pId'], 10)
}

function counterbalance_by_participantId(participantId, conditions, urlParam = false, divider = 1) {
	if (urlParam !== false) {
		const urlCondition = URL_PARAMS.get(urlParam)
		if (DEBUG && conditions.includes(urlCondition)) {
			return urlCondition
		}
	}
	return conditions[Math.floor(participantId / divider) % conditions.length]
}

// data handlers
function save_trial_data(data) {
	fetch('backend/save_data.php', {
		method: 'POST',
		headers: { 
			'Content-Type': 'application/json' 
		},
		body: JSON.stringify({
			pId: participantId,
			platformId: platformId,
			condition: condition,
			data: data,
			mode: 'checkpoint'
		}),
	}).then((response) => {
		if(!response.ok) {
			Promise.reject(response.status)
		}
	}).catch(console.error)
}

async function save_all_data(data, done) {
	const response = await fetch('backend/save_data.php', {
		method: 'POST',
		headers: { 
			'Content-Type': 'application/json' 
		},
		body: JSON.stringify({
			pId: participantId,
			platformId: platformId,
			condition: condition,
			data: data,
			mode: 'all'
		}),
	})
	if(!response.ok) {
		console.error(response.status)
		return false
	}
	done()
	return true
}