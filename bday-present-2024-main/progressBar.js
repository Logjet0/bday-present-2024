const speed = 2; // Speed of progress increment
let progress;
let animation;

// Function to initialize and start the progress bar animation
function startProgressBar(term) {
    const width = 15; // Fixed width of the progress bar

    const render = (percent) => progress_bar(width, percent);
    progress = new Progress({ term, speed, render });
    animation = true;

    // Pause the terminal while the progress is running
    term.pause(true);

    // Start the progress animation
    return progress.start().then(() => {
        animation = false;
        term.resume(); // Resume the terminal after completion
    });
}

// Function to create the progress bar display
function progress_bar(width, percent) {
    const size = Math.round(width * percent / 100);
    let left = '', taken = '';

    // Create the taken part of the progress bar
    for (let i = size; i--;) {
        taken += '=';
    }
    // Change the last '=' to '>' to indicate progress
    if (taken.length > 0) {
        taken = taken.replace(/=$/, '>');
    }
    // Create the remaining part of the progress bar
    for (let i = width - size; i--;) {
        left += ' ';
    }

    return '[' + taken + left + '] ' + percent + '%';
}

// Progress class to handle the animation logic
class Progress {
    constructor({ speed, term, render }) {
        this._speed = speed;
        this._term = term;
        this._render = render;
        this._percent = 0; // Initialize the percent to 0
    }

    _progress(percent) {
        return this._render(percent);
    }

    start() {
        const self = this;
        self._prompt = self._term.get_prompt(); // Save current prompt
        return new Promise(resolve => {
            (function loop() {
                self._string = self._progress(self._percent);
                self._term.set_prompt(self._string);
                self._percent += self._speed; // Increment percent

                // Continue the animation until 100%
                if (self._percent < 100) {
                    self._timer = setTimeout(loop, 100);
                } else {
                    self._term.echo(self._progress(100)).set_prompt(self._prompt); // Final display
                    resolve();
                }
            })();
        });
    }

    stop() {
        clearTimeout(this._timer); // Stop the timer
        this._term.echo(this._string).set_prompt(this._prompt); // Reset prompt
    }
}

// Make startProgressBar globally available for other scripts
window.startProgressBar = startProgressBar;

// Initialize the terminal
const term = $('body').terminal({
    progress: function () {
        startProgressBar(this); // Call the function to start the progress bar
    }
}, {
    onInit() {
        this.echo('Type [[;white;]progress] to start the progress bar.');
    },
    completion: true,
    keydown: function (e) {
        if (animation) {
            if (e.which === 68 && e.ctrlKey) { // CTRL+D
                progress.stop();
                animation = false;
                this.resume();
            }
        }
    }
});
