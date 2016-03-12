import {Observable} from 'rxjs-es/Rx';

const startButton = document.querySelector('#start');
const stopButton = document.querySelector('#stop');
const resetButton = document.querySelector('#reset');
const halfButton = document.querySelector('#half');
const quarterButton = document.querySelector('#quarter');

const start$ = Observable.fromEvent(startButton, 'click');
const stop$ = Observable.fromEvent(stopButton, 'click');
const half$ = Observable.fromEvent(halfButton, 'click');
const quarter$ = Observable.fromEvent(quarterButton, 'click');
const reset$ = Observable.fromEvent(resetButton, 'click');

const interval$ = Observable.interval(1000);
const intervalThatStop$ = interval$.takeUntil(stop$);

const data = {
	count: 0
};
const inc = acc => ({count: acc.count + 1});
const reset = () => data;
const incOrRest$ = Observable.merge(
	intervalThatStop$.mapTo(inc),
	reset$.mapTo(reset)
);

//OR
const starters$ = Observable.merge(
						start$.mapTo(1000),
						half$.mapTo(500),
						quarter$.mapTo(250)
					)
					.share();

const intervalActions = time => (
	//OR
	Observable.merge(
		Observable
			.interval(time)
			.takeUntil(stop$)
			.mapTo(inc),
		reset$.mapTo(reset)
	)
);

const timer$ = starters$
				.switchMap(intervalActions)
				.startWith(data)
				.scan((accumulator, current) => current(accumulator)); //current is inc() or reset()

const input = document.querySelector('#input');
const input$ = Observable
				.fromEvent(input, 'input')
				.map(e => e.target.value);

//the entire combined stream is completed only when the input$ and timer$ are completed
// timer$
// 	.do(x => console.log(x))
// 	.combineLatest( //require the two streams are kicked started
// 		input$.do(x => console.log(x)),
// 		(timer, input) => ({ //transform stream, the same as map()
// 			count: timer.count,
// 			text: input
// 		})
// 	)
// 	.do(x => console.log(x)) //log the intermediate stream values
// 	.takeWhile(data => data.count < 4) //stop the stream conditionally
// 	.filter(data => data.count === parseInt(data.text, 10)) //filter stream
// 	.reduce((accumulator, current) => accumulator + 1, 0) //accumulating data before complete
// 	.subscribe(
// 		x => console.log(x),
// 		err => console.log(err),
// 		() => console.log('complete')
// 	);

//when the timer$ is completed, the latest value from input$ is taken and the whole combined stream is completed
const runningGame$ = timer$
						.do(x => console.log(x))
						.takeWhile(data => data.count < 4) //stop the stream conditionally
						.withLatestFrom( //require the two streams are kicked started
							input$.do(x => console.log(x)),
							(timer, input) => ({ //transform stream, the same as map()
								count: timer.count,
								text: input
							})
						)
						.share(); //allow all subscriptions shareing the same stream, instead of creating one for each subscriber


starters$.subscribe(() => {
	input.focus();
	input.value = '';
	document.querySelector('#score').innerHTML = '';
});

runningGame$
	.repeat()
	.subscribe(() => input.value = '');

runningGame$
	.filter(data => data.count === parseInt(data.text, 10)) //filter stream
	.reduce((accumulator, current) => accumulator + 1, 0) //accumulating data before complete
	.repeat() //restart and re-subscribe the whole stream, and never hit complete                                                      
	.subscribe(
		x => {
			document.querySelector('#score').innerHTML = `${x}`;
		},
		err => console.log(err),
		() => console.log('complete')
	);