'use strict';


// sauce defined in sauce.js
let sauceLines = sauce.split('\n');



// let's add in router tags. This will mean a pre-sweep over the sauce for
// these tags, which is a break--having that pre-sweep. But without it, 
// we'd have to run the handler code *before* the route is even set up, which
// isn't what we want.

// this maps tag strings to line numbers
let ROUTER_TAG_MAP = {};


// this maps unique event id strings to tag strings
let ROUTER_MAP = {};




// this general approach might not work later if we want to interpolate 
// "function calls" in between, then the numbering will get messed up. But
// this is something simple to explore to get routing off the ground
let buildRTM = () => {

	for (let i = 0; i < sauceLines.length; i++) {
		let line = sauceLines[i];
	

		let words = line.split(' ');
		let colonIdx = words.indexOf('::');

		//console.log('line is:', line);
		//console.log('colon idx is:', colonIdx);

		// if '::' not found, there's no router tag to add
		if (colonIdx < 0) {
			continue;
		}

		// kinda hacky we're just going to assume now playing nice, :: at end

		// saving line number of where we find a given router tag. 
		// (calling them router tags for now cuz rn only router will be using them)
		ROUTER_TAG_MAP[words[colonIdx+1]] = i;


	}	



}

buildRTM();


// returns the largest positive integer key or else 0.
// so cheeseyLength({"20": 5}) counts holes, has length 20.

// ~it would be a good idea to refactor and have tests, to use the
// npm thing too where saving this file auto reloads page~
let cheesyLength = (obj) => {
	let entries = Object.entries(obj);
	let max = 0;
	for (let i = 0; i < entries.length; i++) {
		let keystr = entries[i][0];
		// if negative int, won't overwrite max anyway
		let maybeInt = parseInt(keystr);
		if (maybeInt && (maybeInt > max)) {
			max = maybeInt;
		}
	}
	return max;
}





		let Colors = {
			WHITE: "white",
			GOLD: "gold",
			SILVER: "silver",
			RED: "red",
			BLUE: "blue",
		}

		// AND BOOM, ALL IN ONE FILE BABY, LET'S DEFINE THE BASIC SYNTAX HIGHLIGHTING
		// the problem should decompose for lang-lang into something line-by-line
		// Yes, the string is a list of characters, we want instead a list of colored
		// characters, redundancy of repeating red, red, red---who cares?!

		// in JS, say mystr[4] is a length-one string, that's fine for us. So we are
		// going to be returning a list of <length-one string, color enum> pairs.

		// Let's consider creating color objects mapped to strings. A multicolored
		// string, to deal with later, ... orr, you know maybe later we won't have any
		// contiguous (nowhitespace) string that would vary in syntax highlighting.
		// So let's forget that for now. 
		let color_liner = (line) => {

			// output is the list of simple character color pairs
			let output = [];

			let og_length = line.length;
			let trimLine = line.trimLeft();

			let whiteSpaceDiff = og_length - trimLine.length;


			// write out preceding whitespace at the beginning
			for (var i = 0; i < whiteSpaceDiff; i++) {
				output.push({s: " ", c: Colors.WHITE});
			}





			let words = trimLine.split(' ');

			// we'll build on this then deconstruct it in the output
			let bubbles = [];



			op = words[0];



			switch (op) {
				// loop is always 3 words, loop start span
				case "loop": {
					bubbles.push({s: "loop", c: Colors.SILVER});
					let start = words[1];
					let span = words[2];

					if (!isNaN(parseInt(start))) {
						// we parsed an int, so a constant
						bubbles.push({s: start, c: Colors.WHITE});
					} else {
						// otherwise we have a variable
						bubbles.push({s: start, c: Colors.RED});
					}

					if (!isNaN(parseInt(span))) {
						// we parsed an int, so a constant
						bubbles.push({s: span, c: Colors.WHITE});
					} else {
						// otherwise we have a variable
						bubbles.push({s: span, c: Colors.RED});
					}

					break;

				}

				// hardwiring syntax for <if arg1 comp arg2>
				case "if": {
					bubbles.push({s: "if", c: Colors.BLUE});
					let arg1 = words[1];
					let comp = words[2];
					let arg2 = words[3];

					if (!isNaN(parseInt(arg1))) {
						// we parsed an int, so a constant
						bubbles.push({s: arg1, c: Colors.WHITE});
					} else {
						// otherwise we have a variable
						bubbles.push({s: arg1, c: Colors.RED});
					}

					bubbles.push({s: comp, c: Colors.GOLD});

					if (!isNaN(parseInt(arg2))) {
						// we parsed an int, so a constant
						bubbles.push({s: arg2, c: Colors.WHITE});
					} else {
						// otherwise we have a variable
						bubbles.push({s: arg2, c: Colors.RED});
					}


					break;

				}

				case "pool": {
					bubbles.push({s: "pool", c: Colors.SILVER});
					break;
				}

				case "fi": {
					bubbles.push({s: "fi", c: Colors.BLUE});
					break;
				}


				default: {
					// all the other operations
					bubbles.push({s: op, c: Colors.GOLD});
					words.shift();
					for (let i = 0; i < words.length; i++) {
						bubbles.push({s: words[i], c: Colors.WHITE});
					}
				}
			}


			for (let i = 0; i < bubbles.length; i++) {
				for (let j = 0; j < bubbles[i].s.length; j++) {
					output.push({s: bubbles[i].s[j], c: bubbles[i].c});
				}
				// now we have a space, a WHITE space
				output.push({s: " ", c: Colors.WHITE})
			}

			// last space was unnecessary
			output.pop();

			return output;


		}





		// Refactor LATER! Here is a copy-paste of my JS table:

		console.log('script says hiiii');
		document.body.style.cursor = 'default';
		let cursorBox = [0,0]; // I know, keeping it simple atm
		for (let i = 0; i < 30; i++) {
			let mycol = document.createElement("div");
			mycol.style = "display:flex;";
			for (let j = 0; j < 30; j++) {
				let mydiv = document.createElement("div");
				// right then down the graphical convention
				mydiv.id = j.toString() + "," + i.toString();
				mydiv.style="height:20px;width:20px;background-color:rgb(0,0,0);"	
				mycol.append(mydiv);
			}
			document.getElementById('top').append(mycol);
		}

		// a copy now to get a grid for writing text in, just getting the rendering up
		cursorBox = [0,0]; // I know, keeping it simple atm
		/*for (let i = 0; i < 30; i++) {
			let mycol = document.createElement("div");
			mycol.style = "display:flex;";
			for (let j = 0; j < 30; j++) {
				let mydiv = document.createElement("div");
				// right then down the graphical convention
				mydiv.id = j.toString() + ":" + i.toString();
				mydiv.style="height:20px;width:15px;background-color:rgb(20,20,20);text-align:center;vertical-align:middle;line-height:20px;"
				//mydiv.innerHTML = "X";	
				mycol.append(mydiv);
			}
			document.getElementById('top').append(mycol);
		}*/


		let writeEditorColorChar = (x, y, char, color) => {

			// it is GOOD to just copy, paste this right now!!!

			// XXX for now let's just be graceful if out of range
			if (x < 1 || x > 30) {
				return;
			}
			if (y < 1 || y > 30) {
				return;
			}

			// adjust for index convention
			x--;
			y--;

			// 30 magic
			// XXX kill reverse skydiving y = 30 - y - 1;

			let mydiv = document.getElementById(x.toString() + ":" + y.toString());



			let cstring = "";
			switch (color) {
				case Colors.WHITE: {
					cstring = "rgb(255,255,255)";
					break;
				}
				case Colors.RED: {
					cstring = "rgb(180, 0, 0)";
					break;
				}

				case Colors.SILVER: {
					cstring = "rgb(200,200,200)";
					break;
				}

				case Colors.BLUE: {
					cstring = "rgb(65, 105, 225)";
					break;
				}

				case Colors.GOLD: {
					cstring = "rgb(218,165,32)";
					break;
				}

				default: {
					cstring = "rgb(255,255,255)";
				}

			}



			mydiv.style = `height:20px;width:15px;color:${cstring};background-color:rgb(20,20,20);text-align:center;vertical-align:middle;line-height:20px;font-family:Arial;`;
			mydiv.innerHTML = char;


		}



		// Now let's try writing colored letters to the screen
		//let test = document.getElementById("15:5");
		//test.style = "height:20px;width:20px;color:rgb(255,255,255);background-color:rgb(150,50,50);text-align:center;vertical-align:middle;line-height:20px;";


		//writeEditorColorChar(4, 20, 'A', Colors.RED);


		// now let's try writing out the whole first line
		//let firstLoop = sauceLines[3];
		//let colorChars = color_liner(firstLoop);


		//writeEditorColorChar(1, 1, colorChars[0].s, colorChars[0].c);

		//writeEditorColorChar(4, 4, 'O', Colors.SILVER);


		// THIS CODE MATTERS, but let's remove the sauce for now, taking up space 
		// as distraction
		/*for (let i = 0; i < sauceLines.length; i++) {
			let colorChars = color_liner(sauceLines[i]);
			for (let j = 0; j < colorChars.length; j++) {
				writeEditorColorChar(j+1, i+1, colorChars[j].s, colorChars[j].c);
			}
		}*/










		// ~~~ AND HERE NOW IS THE INTERPRETER ~~~


		// glue connecting the two ~~~

		// x and y are logically indexed by 1, starting from bottom left,
		// first x across then y up. easy. This means tho some translations
		// to an index-by-zero system that is right then down


		let graphicalWrite = (x, y, shade)  => {

			// XXX for now let's just be graceful if out of range
			if (x < 1 || x > 30) {
				return;
			}
			if (y < 1 || y > 30) {
				return;
			}

			// adjust for index convention
			x--;
			y--;

			// 30 magic
			y = 30 - y - 1;

			// now for shade, we want 0->0 and 49->255 (heh, we may clip perfect white)
			let color_string = "rgb(" + shade + "," + shade + "," + shade + ")";


			let mydiv = document.getElementById(x.toString() + "," + y.toString());
			// yes inelegant here we have to write out redundant style. Whatever
			// this will be in webgl later anyway
			mydiv.style="height:20px;width:20px;background-color:" + color_string + ";";
		}



		// SOURCE INSTRUCTION POINTER, i.e. which line are we on rn?
		let SIP = 0;

		let SKIP_SIP_INC = false;


		let GS = {};





		// Guess what fools, all caps right now are used for certain big ass global
		// variables as I feel like it, some are constant, some are not!


		// oyy veyy, and now it begins
		let LD = -1; // LOOP-DEPTH. in first loop becomes 0 to point to *first* entry
		let loop_idxes = [];
		let loop_fail_spots = []; // run lengths
		let loop_start_incs = []; // +1 of the loop starts, where to loop back to

		// whether or not the if check is on, i.e. are we applying it?
		let ICON = true;


		// lets KISS that right now we only have ints legal in teh lang-lang.
		let getIntMeaning = (blah) => {

			// if it is in int format, job is easy
			let n = parseInt(blah);
			if (!isNaN(n)) {
				return n;
			}

			// loop indices also have special meaning
			if (blah == "%1") {
				return loop_idxes[LD];
			}
			if (blah == "%2") {
				return loop_idxes[LD-1];
			}



			let items = blah.split('.');
			let x = {};
			for (let i = 0; i < items.length; i++) {
				let item = items[i];

				// we also declare in this case at end of tree search
				if (item == "*len*") {
					return cheesyLength(x);
				}

				// tricky here, let's see if this works... interpret out the /.../
				// XXX doubt this would work in general case
				if (item[0] == '/' && item[item.length-1] == '/') {
					item = getIntMeaning(item.slice(1, item.length-1));
				}

				if (i == 0) {
					x = GS[item];
				} else {
					x = x[item];
				}
			}

			return x;





			/*// hardwiring some magic next


			let maybsVal = GS[blah];
			if (maybsVal != undefined) {
				return maybsVal;
			}*/

		}



		// indexed from 0
		let getNthWord = (line, n) => {
			line = line.trimLeft();
			let words = line.split(' ');
			return words[n];
		}

		let getFirstWord = (line) => {
			return getNthWord(line, 0);
		}





	let coreLoop = () => {

		while (true) {
			if (SIP >= sauceLines.length || SIP < 0) {
				console.log("SIP has fallen off the map, maybs cuz program finished");
				break;

			}
			console.log('LINE:', sauceLines[SIP]);
			let out = performDataFunction(sauceLines[SIP]);
			console.log('STATE NOW:', JSON.stringify(GS));
			if (out == "break") {
				break;
			}
		}
	}


	let eventHandler = (event) => {

	    // should be garbage now: let event = e.key;
	    let tag = ROUTER_MAP[event];
	    if (!tag) {
	    	console.log('Event ', event, ' has no handling route!');
	    	return;
	    }

	    let lineNum = ROUTER_TAG_MAP[tag];
	    if (!lineNum) {
	    	console.log('Tag ', tag, ' is not defined at any line.');
	    }

	    // XXX something hacky now that could totally run into multithreading issues
	    // and yes, JS is multithreaded

	    SIP = lineNum;
	    coreLoop();


	}












		let performDataFunction = (line) => {

			// handle whitespace flab && comment lines
			if (line.length == 0) {
				SIP++;
				return;
	
			}
			if (line[0] == '/' && line[1] == '/') {
				SIP++;
				return;
			}



			let OP = getFirstWord(line)


			// with no icon, we skip over code, unless we find a FI which
			// tells us to switch back
			if (!ICON) {
				if (OP == "fi") {
					ICON = true;
				}
				SIP++;
				return;
			}

			let moveSemanticsOn = false;

			switch(OP) {

				case "fi": {
					ICON = true;
					break;
				}

				case "loop": {
					let start = getIntMeaning(getNthWord(line, 1));
					let nruns = getIntMeaning(getNthWord(line, 2));

					LD++;
					loop_idxes[LD] = start;
					// so if we loop start 2 for 5 runs, we go thru
					// 2,3,4,5,6 and then 7 is the spot of failure
					loop_fail_spots[LD] = start + nruns;

					loop_start_incs[LD] = SIP + 1;

					break;
				}


				case "if": {
					// simple assumptions now for the win
					let arg1 = getNthWord(line, 1);
					let bob = getNthWord(line, 2); // bin op bool
					let arg2 = getNthWord(line, 3);


					let arg1int = getIntMeaning(arg1);
					let arg2int = getIntMeaning(arg2);

					if (bob == "==") {
						ICON = (arg1int == arg2int);
					} else if (bob == "!=") {
						ICON = (arg1int != arg2int);
					} else if (bob == "<") {
						ICON = (arg1int < arg2int);
					} else if (bob == ">") {
						ICON = (arg1int > arg2int);
					}

					break;
				}

				case "pool": {
					// one of TWO things can happen here:
					// 1) we continue and pop loop context
					// or
					// 2) we teleport to inc of loop start and inc counter

					let curIdx = loop_idxes[LD];
					let failSpot = loop_fail_spots[LD];

					// if we are now to move forward, loop time over
					if (curIdx >= failSpot-1) { // the -1 kind of a hack, loop counting
						// XXX above hack might cause failure in trivial loop cases
						//console.log("NOW:", curIdx, failSpot);
						loop_idxes.pop();
						loop_fail_spots.pop();
						LD--;
					} else {
						let whereToLoopBackTo = loop_start_incs[LD];
						loop_idxes[LD]++;
						SIP = whereToLoopBackTo

						// yes, why ++ the loop start when we are already
						// doing a SIP++ anyway? I judge it's too slick and
						// pointlessly confusing.

						SKIP_SIP_INC = true;
					}

					break;
				}

				// can we maybe hack with not using break and just falling down?

				case "mov": {
					moveSemanticsOn = true;

					// hehehe no break, woooo
				}

				// XXX Hacks still cheating
				case "cp": {

					let raw_source = getNthWord(line, 1);
					let source = getIntMeaning(getNthWord(line, 1));

					let raw_source_split = raw_source.split('.');

					// kill source on global scope, to give us move semantics
					// the source is frozen now, we already know it. Here's a
					// closure to call in when we're ready.
					let killSourceOnGS = () => {

						if (!moveSemanticsOn) {
							return;
						}

						let source_items = [];
						for (var i = 0; i < raw_source_split.length; i++) {
							let rsi = raw_source_split[i];
							if (rsi[0] == '/' && rsi[rsi.length-1] == '/') {
								let unslash = rsi.slice(1, rsi.length-1);
								source_items.push(getIntMeaning(unslash));
							} else {
								source_items.push(rsi);
							}
						}

						// let's hack this out case by case before loop

						if (source_items.length == 1) {
							delete GS[source_items[0]];
						} else if (source_items.length == 2) {
							delete GS[source_items[0]][source_items[1]];
						} else {
							delete GS[source_items[0]][source_items[1]][source_items[2]];
						}


					}


					let dest = getNthWord(line, 2);

					// hmm, what if I just directly expand out items now
					let basic_items = dest.split('.');

					//console.log('basic items:', basic_items);

					let items = [];

					for (let i = 0; i < basic_items.length; i++) {
						let bi = basic_items[i];
						if (bi[0] == '/' && bi[bi.length-1] == '/') {
							let unslash = bi.slice(1, bi.length-1);
							items.push(getIntMeaning(unslash));
						} else {
							// for a non /.../, only get int meaning if
							// there is just one dest item
							if (basic_items.length == 1) {
								items.push(bi);
							} else {
								items.push(bi);
							}
						}
					}

					//console.log('dest items:', items);



					if (items.length == 1) {
						GS[items[0]] = source;
						killSourceOnGS();
						break;
					}


					// XXX just rapid hacking, haven't verified if this is right
					if (items.length == 2) {
						if (GS[items[0]] == undefined) {
							GS[items[0]] = {};
						}
						GS[items[0]][items[1]] = source;
						killSourceOnGS();
						break;
					}

					if (items.length == 3) {
						if (GS[items[0]] == undefined) {
							GS[items[0]] = {};
						}
						if (GS[items[0]][items[1]] == undefined) {
							GS[items[0]][items[1]] = {};
						}
						GS[items[0]][items[1]][items[2]] = source;
						killSourceOnGS();
						break;
					}

					break;


				}

				case "add": {

					// hey this nth word as 1 works well cuz the op is 0, score
					let arg1 = getIntMeaning(getNthWord(line, 1));
					let arg2 = getIntMeaning(getNthWord(line, 2));
					let dest_name = getNthWord(line, 3);

					GS[dest_name] = arg1 + arg2;

					break;

				}

				case "sub": {

					let arg1 = getIntMeaning(getNthWord(line, 1));
					let arg2 = getIntMeaning(getNthWord(line, 2));
					let dest_name = getNthWord(line, 3);

					// MWAHAHAHA subtract first arg from second arg
					let dest = arg2 - arg1;
					GS[dest_name] = dest;

					break;

				}

				case "rngi": {

					let arg1 = getIntMeaning(getNthWord(line, 1));
					let dest_name = getNthWord(line, 2);
					// + 1 for index by 1
					GS[dest_name] = Math.floor(Math.random()*arg1) + 1;


					break;
				}

				case "sleep": {
					SIP++;
					setTimeout(function() {
						coreLoop();
					}, PAUSE_TIME);
					return "break";
				}

				// XXX horrible shitty stop, must fix
				case "stop": {
					// do NOT SIP++, and return, so it's just this
					// instruction over and over
					setTimeout(function() {
						coreLoop();
					}, 1000000); // lol
					return "break";
				}

				case "black": {
					for (let i = 0; i < 30; i++) {
						for (let j = 0; j < 30; j++) {
							graphicalWrite(i+1, j+1, 0); // write black
						}
					}

					break;
				}

				case "route": {
					let event = getNthWord(line, 1);
					let handlerTag = getNthWord(line, 2);

					ROUTER_MAP[event] = handlerTag;

					// this special route establishes things happening in time
					if (event == "~blink~") {
						setInterval(() => {
							eventHandler("~blink~");
						}, PAUSE_TIME); // hardwired 1/5 sec now
					}


					break;
				}

				case "log": {

					console.log(line);

					break;
				}

				case "draw": {

					let shade = getIntMeaning(getNthWord(line, 1));
					let x = getIntMeaning(getNthWord(line, 2));
					let y = getIntMeaning(getNthWord(line, 3));

					graphicalWrite(x, y, shade);


					break;
				}




				default: {
					console.log("Unsupported op:", line);
				}


			}			

			if (!SKIP_SIP_INC) {
				SIP++;
			}
			SKIP_SIP_INC = false;

		}
		





	document.addEventListener('keydown', (e) => {
		eventHandler(e.key)
	});






		coreLoop();
