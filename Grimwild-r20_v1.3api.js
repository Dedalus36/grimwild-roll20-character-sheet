on('ready', function() {
    log('=== Grimwild Dice System Loaded ===');
    log('Grimwild dice system is ready! v1.3');
});

on('chat:message', function(msg) {
    if (msg.type !== 'api') return;
    
    if (msg.content.indexOf('!grimwild') === 0) {
        handleGrimwildRoll(msg);
    }
    
    if (msg.content.indexOf('!grimpool') === 0) {
        handlePoolRoll(msg);
    }
    
    if (msg.content.indexOf('!story-menu') === 0) {
        handleStoryMenu(msg);
    }
    
    if (msg.content.indexOf('!story-') === 0 && msg.content !== '!story-menu') {
        handleStoryOption(msg);
    }
});

function handleGrimwildRoll(msg) {
    const args = msg.content.split(' ');
    const poolSize = parseInt(args[1]);
    
    if (args[2] === 'menu') {
        handleStoryMenu(msg);
        return;
    }
    
    let thornCount = 0;
    let attributeName = 'Grimwild';
    let difficultyThorns = 0;
    let markHarmThorns = 0;
    let extraDice = 0;
    let wasMarked = false;
    let usedSpark = false;
    
    
	for (let i = 2; i < args.length; i++) {
		const arg = args[i];
		if (arg.toLowerCase() === 'marked') {
			wasMarked = true;
		} else if (arg.toLowerCase() === 'spark') {
			usedSpark = true;
		} else if (arg.toLowerCase() === 'montage') {
			attributeName = 'Montage';
		} else if (arg.toLowerCase() === 'dropped') {
			attributeName = 'Dropped';
		} else if (arg.toLowerCase().startsWith('t')) {
			thornCount = parseInt(arg.slice(1)) || 0;
		} else if (arg.toLowerCase().startsWith('d')) {
			difficultyThorns = parseInt(arg.slice(1)) || 0;
		} else if (arg.toLowerCase().startsWith('m')) {
			markHarmThorns = parseInt(arg.slice(1)) || 0;
		} else if (arg.toLowerCase().startsWith('e')) {
			extraDice = parseInt(arg.slice(1)) || 0;
		} else {
			attributeName = arg;
		}
	}
		
    if (isNaN(poolSize) || poolSize < 1 || poolSize > 10) {
        sendChat('Grimwild', '/w "' + msg.who + '" Usage: !grimwild [pool size] [thorns] [attribute]');
        return;
    }
    
    
    const dice = [];
    for (let i = 0; i < poolSize; i++) {
        dice.push(randomInteger(6));
    }
    
    
    let mainDice = dice.slice(0, poolSize - (usedSpark ? 1 : 0));
    let sparkDice = usedSpark ? dice.slice(-1) : [];
    
    
    const highest = Math.max(...dice);
    const perfectCount = dice.filter(d => d === 6).length;
    
    
    let difficultyThornResults = [];
    let markHarmThornResults = [];
    let totalThornCuts = 0;
    
    if (difficultyThorns > 0) {
        for (let i = 0; i < difficultyThorns; i++) {
            const thornRoll = randomInteger(8);
            difficultyThornResults.push(thornRoll);
            if (thornRoll >= 7) {
                totalThornCuts++;
            }
        }
    }
    
    if (markHarmThorns > 0) {
        for (let i = 0; i < markHarmThorns; i++) {
            const thornRoll = randomInteger(8);
            markHarmThornResults.push(thornRoll);
            if (thornRoll >= 7) {
                totalThornCuts++;
            }
        }
    }
    
    
    let baseResult;
    let isCritical = false;
    
    if (perfectCount >= 2) {
        baseResult = 'critical';
        isCritical = true;
    } else if (highest === 6) {
        baseResult = 'perfect';
    } else if (highest >= 4) {
        baseResult = 'messy';
    } else {
        baseResult = 'grim';
    }
    
    
    let finalResult = baseResult;
    if (!isCritical && totalThornCuts > 0) {
        
        if (baseResult === 'perfect') {
            finalResult = totalThornCuts >= 1 ? 'messy' : 'perfect';
            if (totalThornCuts >= 2) finalResult = 'grim';
            if (totalThornCuts >= 3) finalResult = 'disaster';
        } else if (baseResult === 'messy') {
            finalResult = totalThornCuts >= 1 ? 'grim' : 'messy';
            if (totalThornCuts >= 2) finalResult = 'disaster';
        } else if (baseResult === 'grim') {
            finalResult = totalThornCuts >= 1 ? 'disaster' : 'grim';
        }
    }
    
    
	let resultDetails = {};
	switch(finalResult) {
		case 'critical':
			if (attributeName === 'Story') {
				resultDetails = {
					resultname: 'CRITICAL',
					resulttext: 'It\'s the optimal situation.'
				};
			} else if (attributeName === 'Montage') {
				resultDetails = {
					resultname: 'CRITICAL',
					resulttext: 'You do it, and choose a bonus.'
				};
			} else if (attributeName === 'Dropped') {
				resultDetails = {
					resultname: 'CRITICAL',
					resulttext: 'You remain in the scene!'
				};
			} else {
				resultDetails = {
					resultname: 'CRITICAL',
					resulttext: 'You did it, choose a bonus.'
				};
			}
			break;
		case 'perfect':
			if (attributeName === 'Story') {
				resultDetails = {
					resultname: 'PERFECT',
					resulttext: 'It\'s an ideal situation.'
				};
			} else if (attributeName === 'Montage') {
				resultDetails = {
					resultname: 'PERFECT',
					resulttext: 'You did it, avoiding trouble.'
				};
			} else if (attributeName === 'Dropped') {
				resultDetails = {
					resultname: 'PERFECT',
					resulttext: 'You\'re out of the scene.'
				};
			} else {
				resultDetails = {
					resultname: 'PERFECT',
					resulttext: 'You do it, and avoid trouble.'
				};
			}
			break;
		case 'messy':
			if (attributeName === 'Story') {
				resultDetails = {
					resultname: 'MESSY',
					resulttext: 'It\'s okay, but there\'s a catch.'
				};
			} else if (attributeName === 'Montage') {
				resultDetails = {
					resultname: 'MESSY',
					resulttext: 'You did it, but with trouble.'
				};
			} else if (attributeName === 'Dropped') {
				resultDetails = {
					resultname: 'MESSY',
					resulttext: 'You\'re out of the scene, and it\'s bad (e.g., 4d dying, broken leg, trauma).'
				};
			} else {
				resultDetails = {
					resultname: 'MESSY',
					resulttext: 'You do it, but there\'s trouble.'
				};
			}
			break;
		case 'grim':
			if (attributeName === 'Story') {
				resultDetails = {
					resultname: 'GRIM',
					resulttext: 'Not good, and there\'s trouble.'
				};
			} else if (attributeName === 'Montage') {
				resultDetails = {
					resultname: 'GRIM',
					resulttext: 'You failed, and found trouble.'
				};
			} else if (attributeName === 'Dropped') {
				resultDetails = {
					resultname: 'GRIM',
					resulttext: 'You\'re out of the scene, and forever changed (e.g., death, insanity, morality shift).'
				};
			} else {
				resultDetails = {
					resultname: 'GRIM',
					resulttext: 'You fail, and there\'s trouble.'
				};
			}
			break;
		case 'disaster':
			if (attributeName === 'Story') {
				resultDetails = {
					resultname: 'DISASTER',
					resulttext: 'The worst case scenario.'
				};
			} else if (attributeName === 'Montage') {
				resultDetails = {
					resultname: 'DISASTER',
					resulttext: 'The worst case scenario.'
				};
			} else if (attributeName === 'Dropped') {
				resultDetails = {
					resultname: 'DISASTER',
					resulttext: 'The worst case scenario.'
				};
			} else {
				resultDetails = {
					resultname: 'DISASTER',
					resulttext: 'The worst case scenario.'
				};
			}
			break;
	}
    
    
    const playerName = msg.who.replace(' (GM)', '');
    
    let rollString = '&{template:grimwild}';
    rollString += ` {{charactername=${playerName}}}`;
    rollString += ` {{rollname=${attributeName}}}`;
    rollString += ` {{pool=1}}`;
    rollString += ` {{poolname=${attributeName}}}`;
    
    
    for (let i = 0; i < mainDice.length; i++) {
        rollString += ` {{dice${i+1}=${mainDice[i]}}}`;
    }
    
    
    if (usedSpark && sparkDice.length > 0) {
        rollString += ` {{spark=1}}`;
        for (let i = 0; i < sparkDice.length; i++) {
            rollString += ` {{spark${i+1}=${sparkDice[i]}}}`;
        }
    }
    
    
    if (difficultyThornResults.length > 0 || markHarmThornResults.length > 0) {
        
        if (difficultyThornResults.length > 0) {
            
            rollString += ` {{thorns=1}}`;
            
            
            for (let i = 0; i < difficultyThornResults.length; i++) {
                rollString += ` {{thorn${i+1}=${difficultyThornResults[i]}}}`;
            }
            
            
            if (markHarmThornResults.length > 0) {
                rollString += ` {{markharm=1}}`;
                for (let i = 0; i < markHarmThornResults.length; i++) {
                    rollString += ` {{mark${i+1}=${markHarmThornResults[i]}}}`;
                }
            }
        } else {
            
            rollString += ` {{markharmonly=1}}`;
            for (let i = 0; i < markHarmThornResults.length; i++) {
                rollString += ` {{mark${i+1}=${markHarmThornResults[i]}}}`;
            }
        }
    }
    
    
    rollString += ` {{result=1}}`;
    rollString += ` {{resultname=${resultDetails.resultname}}}`;
    rollString += ` {{resulttext=${resultDetails.resulttext}}}`;
    
    
    let notifications = [];

    if (usedSpark) {
        notifications.push('Spark used');
    }

    if (totalThornCuts > 0) {
        notifications.push(`${totalThornCuts} thorn cut${totalThornCuts > 1 ? 's' : ''}`);
    }
    
	if (wasMarked) {
        notifications.push(attributeName + ' mark cleared');
    }  
	
    if (notifications.length > 0) {

        rollString += ` {{status=${notifications.join('<br>')}}}`;
    }
    
    sendChat('Grimwild', rollString);
}

function handlePoolRoll(msg) {
    const args = msg.content.split(' ');
    const poolSize = parseInt(args[1]);
    const customName = args.slice(2).join(' ');
    
    if (isNaN(poolSize) || poolSize < 1 || poolSize > 12) {
        sendChat('Grimwild', '/w "' + msg.who + '" Usage: !grimpool [pool size 1-12] [optional custom name]');
        return;
    }
    
    const dice = [];
    for (let i = 0; i < poolSize; i++) {
        dice.push(randomInteger(6));
    }
    
    const drops = dice.filter(d => d <= 3).length;
    const remaining = poolSize - drops;
    
    let statusText;
    if (remaining === 0) {
        statusText = 'POOL DEPLETED - Event occurs, situation ends, or resource is depleted!';
    } else if (remaining === 1) {
        statusText = 'ONE LEFT - Push yourself, or spend suspense, to deplete!';
    } else if (remaining <= 2) {
        statusText = 'LOW - The pool is almost out!';
    } else {
        statusText = 'STABLE - The pool continues...';
    }
    
    const playerName = msg.who.replace(' (GM)', '');
    
    let rollString = '&{template:grimwild}';
    rollString += ` {{charactername=${playerName}}}`;
    if (customName) {
        rollString += ` {{rollname=${customName}}}`;
        rollString += ` {{poolname=${customName} (${poolSize}d6)}}`;
    } else {
        rollString += ` {{poolname=Pool (${poolSize}d6)}}`;
    }
    rollString += ` {{pool=1}}`;
    rollString += ` {{poolroll=1}}`;
    
    for (let i = 0; i < dice.length; i++) {
        rollString += ` {{dice${i+1}=${dice[i]}}}`;
    }
    
    rollString += ` {{result=1}}`;
    rollString += ` {{resultname=POOL RESULT}}`;
    rollString += ` {{resulttext=Dropped: ${drops}d | Remaining: ${remaining}d}}`;
    rollString += ` {{status=${statusText}}}`;
   
    sendChat('Grimwild', rollString);
}

function handleStoryMenu(msg) {
    const playerName = msg.who.replace(' (GM)', '');
    const args = msg.content.split(' ');
    
    let difficultyThorns = 0;
    let markHarmThorns = 0;
    let extraDice = 0;
    let usingSpark = false;
    
    for (let i = 2; i < args.length; i++) {
        const arg = args[i];
        if (arg.toLowerCase().startsWith('d')) {
            difficultyThorns = parseInt(arg.slice(1)) || 0;
        } else if (arg.toLowerCase().startsWith('m')) {
            markHarmThorns = parseInt(arg.slice(1)) || 0;
        } else if (arg.toLowerCase().startsWith('e')) {
            extraDice = parseInt(arg.slice(1)) || 0;
        } else if (arg.toLowerCase() === 'spark') {
            usingSpark = true;
        }
    }
    
    const sparkDie = usingSpark ? 1 : 0;
    const totalThorns = difficultyThorns + markHarmThorns;
    const sparkText = usingSpark ? ' spark' : '';
    
    let menuOutput = '/w "' + playerName + '" ';
    menuOutput += '&{template:grimwild-menu} ';
    menuOutput += '{{rollname=' + playerName + ' | Story Choice}} ';
    menuOutput += '{{menu_title=SELECT A STORY ROLL}} ';
    
    let buttonOptions = '';
    buttonOptions += `[Bad Odds | 1d](!grimwild ${1 + extraDice + sparkDie} t${totalThorns} Story d${difficultyThorns} m${markHarmThorns} e${extraDice}${sparkText})<br>`;
    buttonOptions += `[Even Odds | 2d](!grimwild ${2 + extraDice + sparkDie} t${totalThorns} Story d${difficultyThorns} m${markHarmThorns} e${extraDice}${sparkText})<br>`;
    buttonOptions += `[Good Odds |3d](!grimwild ${3 + extraDice + sparkDie} t${totalThorns} Story d${difficultyThorns} m${markHarmThorns} e${extraDice}${sparkText})<br>`;
    buttonOptions += `[Montage | 2d](!grimwild ${2 + extraDice + sparkDie} t${totalThorns} Montage d${difficultyThorns} m${markHarmThorns} e${extraDice}${sparkText})`;
    
    menuOutput += `{{menu_options=${buttonOptions}}}`;
    
    sendChat('', menuOutput);
}

function handleStoryOption(msg) {
    const option = msg.content.substring(1);
    let diceCount = 1;
    let rollName = 'Story';
    
    switch(option) {
        case 'story-bad': diceCount = 1; break;
        case 'story-even': diceCount = 2; break;
        case 'story-good': diceCount = 3; break;
        case 'story-montage': diceCount = 2; rollName = 'Montage'; break;
    }
    
    const grimwildCommand = `!grimwild ${diceCount} t0 ${rollName} d0 m0 e0`;
    handleGrimwildRoll({
        content: grimwildCommand,
        who: msg.who,
        type: 'api'
    });
}
