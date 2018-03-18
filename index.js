var EventEmitter = require("events").EventEmitter;
var OSinfo = require('./modules/OSInfo');

var emitter = EventEmitter();
emitter.on("beforeCommand", function(instruction){
	console.log('You wrote: ' + instruction + ', trying to run command');
});
emitter.on("affterCommand", function() {
	console.log('Finished command');
});

process.stdin.setEncoding('utf-8');
process.stdin.on('readable', function() {
	var input = process.stdin.read();
	if(input !== null) {
		var instruction = input.trim ();
		// uruchamianie zdarzenia beuforeCommand (z parametrem - instruction)
		emitter.emmit('beuforeCommand', instruction);
		switch(instruction) {
			case 'exit':
				process.stdout.write('Quitting app!\n');
				process.exit();
				break;
			case 'sayhello':
				process.stdout.write('hello!\n');
				break;
			case 'getOSinfo':
				OSinfo.print();
				//getOSinfo();
				//process.stdout.write('info o sys');
				break;
			default:
				process.stderr.write('Wrong instruction!\n');

		};
		//uruchamianie zdarzenia after command (bez parametru)
		emmiter.emmit('affterCommand');
	}
});

