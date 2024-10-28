$(function (){
    let location = {x: 1, y: 1};
    let clueFound = false;
    let leonsSoul = false;
    let hasLeon = false;
    let hasKey = false;

    function validateLocation(newX, newY, terminal) {
        if (newX < 1 || newX > 5 || newY < 1 || newY > 5) {
            terminal.echo('Oops! Can\'t move there.');
            return false;
        } else if (newX == 1 && (newY == 4 || newY == 5)) {
            terminal.echo('You bumped into the bed.');
            return false;
        } else if (newX == 3 && newY == 4) {
            terminal.echo('There\'s a computer there!');
            return false;
        } else if (newX == 5 && newY == 5) {
            terminal.echo('That\'s a fridge, dummy.');
            return false;
        } else if (newX == 5 && newY == 1) {
            terminal.echo('Are you trying to jump in the trash???');
            return false;
        } else {
            return true;
        }
    }

    function bed(terminal) {
        if (leonsSoul) {
            hasLeon = true;
            terminal.echo('You found Leon on the bed!');
            setTimeout(() => {
                terminal.echo('Huh, what\'s that?');
                setTimeout(() => {
                    terminal.echo('What do you MEAN he ate the USB with his soul on it?!');
                    summonLeon(terminal);
                }, 750);
            }, 750);
        } else {
            terminal.echo('Leon\'s on the bed, but he can\'t talk right now.');
        }
    }

    function computer(terminal) {
        let guessedWords = {hotDog: false, fries: false, japan: false, chicken: false};
        const wrongWords = new Set(['idiot', 'art', 'song', 'call', 'magnet', 'drama', 'coat',
        'woman', 'china', 'cake', 'angel', 'math', 'toronto', 'card', 'book', 'opera', 'ring', 
        'premiere', 'sleep', 'jazz', 'skate']);

        terminal.echo('The computer powers on...\n' +
        'Type [[b;#fff;]exit] at any time to leave.\n');
        
        setTimeout(() => {
            terminal.echo(`<img src='codenames.png' width='500'/>`, {raw: true});
            if (clueFound) {
                terminal.echo('Clue: midnight snack, 4');
            } else {
                terminal.echo('Clue: ******** *****, 4\n' +
                'Hmm, it doesn\'t seem like you have the clue for this.\n\n' +
                'Maybe look for it somewhere else?');
            }
            terminal.echo('Type [[b;#fff;]words] to see the words again.');
        
            terminal.push(function (command) {
                if (command == 'exit') {
                    terminal.echo('Exited the computer interface.');
                    terminal.pop();
                    terminal.exec('loc', true);
                } else if (command == 'words') {
                    terminal.echo(`<img src='codenames.png' width='500'/>`, {raw: true});
                } else if (command.toLowerCase() == 'hot dog' || command.toLowerCase() == 'hotdog') {
                    if (guessedWords.hotDog == false) {
                        guessedWords.hotDog = true;
                        correctGuess(terminal, guessedWords);
                    } else {
                        terminal.echo('You already guessed this one!');
                    }
                } else if (command.toLowerCase() == 'fries') {
                    if (guessedWords.fries == false) {
                        guessedWords.fries = true;
                        correctGuess(terminal, guessedWords);
                    } else {
                        terminal.echo('You already guessed this one!');
                    }
                } else if (command.toLowerCase() == 'japan') {
                    if (guessedWords.japan == false) {
                        guessedWords.japan = true;
                        correctGuess(terminal, guessedWords);
                    } else {
                        terminal.echo('You already guessed this one!');
                    }
                } else if (command.toLowerCase() == 'chicken') {
                    if (guessedWords.chicken == false) {
                        guessedWords.chicken = true;
                        correctGuess(terminal, guessedWords);
                    } else {
                        terminal.echo('You already guessed this one!');
                    }
                } else if (wrongWords.has(command.toLowerCase())) {
                    terminal.echo('Nope! Take another guess.');
                } else {
                    terminal.echo(`[[;red;]Word \'${command}\' Not Found!]`);
                }
            }, {
                prompt: '>> '
            });
        }, 1000);      
    }

    function fridge(terminal) {
        if (hasLeon) {
            hasKey = true;
            terminal.echo('You put Leon in the fridge.');
            setTimeout(() => {
                terminal.echo('He searches around for food, eventually finding a banana.');
                setTimeout(() => {
                    terminal.echo('He brings the banana to you. You eat the banana.');
                    setTimeout(() => {
                    terminal.echo('Inside you find a key.');
                    }, 750);
                }, 750);
            }, 750);   
        } else {
            terminal.echo('Looks like a normal fridge to me. Come back later?');
        }
    }

    function door(terminal) {
        if (hasKey) {
            terminal.echo('Congratulations! You finished the game.\n');
            setTimeout(() => {
                terminal.echo('Here\'s a gift Arthur made for you:\n');
                setTimeout(() => {
                    terminal.echo('[[b;#fff;]days]\n' +
                    '[[i;#fff;]for Robin]\n')
                    terminal.echo('my friend, it\'s a new day &minus; yes, it\'s a start\n' +
                    'that tree &minus;&minus; over there, do you see the rise?\n' +
                    'do you liken that sight, to a home faraway?\n' +
                    'do you see the clouds, up there &minus; yes, that one.\n' +
                    'do you like their flight &minus; how fluffy &minus; in white.\n\n' +
                    'my friend, it\'s a new day &minus;&minus; yes, it\'s feeling like one.\n' +
                    'do you wish to go back &minus; one, two, three &minus;\n' +
                    'maybe four? its a time. to celebrate, for\n' +
                    'you! you\'ve aged, rest well, let\'s cherish,\n' +
                    'five seconds of waiting &minus; let\'s go, tonight.\n\n' +
                    'my friend, it\'s a new day &minus; yes, maybe it\'ll end\n' +
                    'do you wish to move on? or carry out, my friend?\n' +
                    'maybe the sun has fallen &minus; maybe the stars are gone.\n' +
                    'maybe it\'s just a dream; but you\'ve grown up, \n' +
                    'another day, another year.\n\n' +
                    'my friend, it\'s a new day &minus; let\'s go out, tonight.');
                }, 750);
            }, 750);
        } else {
            terminal.echo('The door is locked. Can you find the key?');
        }
    }

    function trashCan(terminal) {
        terminal.echo('You look in the trash can...\n' +
        'Type [[b;#fff;]exit] at any time to leave.\n')

        setTimeout(() => {
            terminal.echo('You find some notes from school.');
            terminal.echo(`<img src='indexcards.png' width='700'/>`, {raw: true});
            setTimeout(() => {
                terminal.echo('I see some index cards. I wonder what the smudged word is.');
                
                terminal.push(function (command) {
                    if (command == 'exit') {
                        exitToMain(terminal);
                    } else if (command.toLowerCase() == 'mid') {
                        terminal.echo('Well done.');
                        setTimeout(() => {
                            album(terminal);
                        }, 1000);
                    } else {
                        terminal.echo('That doesn\'t seem right. Try again.');
                    }
                }, {
                    prompt: '>> '
                }); 
            }, 1000);
        }, 1000);
    }

    function album(terminal) {
        terminal.echo(`<img src='photoalbum.png' width='700'/>`, {raw: true});
        terminal.echo('There\'s an album in the trash can too... What do you think that word is?');

        terminal.push(function (command) {
            if (command == 'exit') {
                exitToMain(terminal);
            } else if (command.toLowerCase() == 'night') {
                terminal.echo('Great job. You\'re almost there.');
                setTimeout(() => {
                    french(terminal);
                }, 1000);
            } else {
                terminal.echo('Nuh uh. Take another guess.');
            }
        }, {
            prompt: '>> '
        });
    }

    function french(terminal) {
        terminal.echo(`<img src='french.png' width='700'/>`, {raw: true});
        terminal.echo('Hmm, some unfinished French homework. It looks like a puzzle...?');

        terminal.push(function (command) {
            if (command == 'exit') {
                exitToMain(terminal);
            } else if (command.toLowerCase() == 'snack') {
                clueFound = true;
                terminal.echo('Perfect! Midnight snack... I wonder what that means.');
                setTimeout(() => {
                    while (terminal.level() > 1) {
                        terminal.pop();
                    }
                    terminal.exec('loc', true);
                }, 1000);
            } else {
                terminal.echo('C\'est incorrect. R&eacute;essayez.', {raw: true});
            }
        }, {
            prompt: '>> '
        });
    }

    function correctGuess(terminal, guessedWords) {
        if (wordsLeft(guessedWords) == 0) {
            leonsSoul = true;
            terminal.echo('Congrats, you found all the words!\n' +
            'Downloading Leon\'s soul onto a flash drive...');
            progressBar(terminal);
        } else if (wordsLeft(guessedWords) == 1) {
            terminal.echo('Good job! 1 word left.');
        } else {
            terminal.echo(`Good job! ${wordsLeft(guessedWords)} words left.`);
        }
    }

    function wordsLeft(words) {
        let count = 0;
        for (let word in words) {
            if (words[word] == false) {
                count++;
            }
        }
        return count;
    }

    function exitToMain(terminal) {
        while (terminal.level() > 1) {
            terminal.pop();
        }
        terminal.echo('Stopped looking in the trash.');
        terminal.exec('loc', true);
    }

    async function summonLeon(terminal) {
        await terminal.typing('echo', 200, '......');
        terminal.echo('LEON HAS BEEN SUMMONED.');
    }

    async function progressBar(terminal) {
        await startProgressBar(terminal);
        terminal.echo('Download finished.');
        setTimeout(() => {
            terminal.pop();
            terminal.exec('loc', true);
        }, 1000);
    }

    $('body').terminal({
        help: function(){
            this.echo('Available commands are:\n' +
            '[[b;#fff;]help]: get help\n' + 
            '[[b;#fff;]loc]: show current location\n' +
            '[[b;#fff;]w], [[b;#fff;]a], [[b;#fff;]s], [[b;#fff;]d]: move up, left, down, right\n' +
            '[[b;#fff;]interact]: interact with an object')
        },
        w: function(){
            if (validateLocation(location.x, location.y + 1, this)) {
                location.y++;
            }
            this.exec('loc', true);
        },
        s: function(){
            if (validateLocation(location.x, location.y - 1, this)) {
                location.y--;
            }
            this.exec('loc', true);
        },
        a: function(){
            if (validateLocation(location.x - 1, location.y, this)) {
                location.x--;
            }
            this.exec('loc', true);
        },
        d: function(){
            if (validateLocation(location.x + 1, location.y, this)) {
                location.x++;
            }
            this.exec('loc', true);
        },
        loc: function(){
            let imageLink = window.location.href.substring(0, window.location.href.lastIndexOf('/'));
            let locationCode = '' + location.x + location.y;
            this.echo(`<img src='${imageLink}/maps/${locationCode}.PNG' width='500'/>`, {raw: true});
        },
        interact: function(){
            if (location.x == 2 && (location.y == 4 || location.y == 5)) {
                bed(this);
            } else if (location.x == 3 && location.y == 3) {
                computer(this);
            } else if (location.x == 5 && location.y == 4) {
                fridge(this);
            } else if (location.x == 5 && location.y == 3) {
                door(this);
            } else if ((location.x == 4 && location.y == 1) || (location.x == 5 && location.y == 2)) {
                trashCan(this);
            } else {
                this.echo('There\'s nothing to interact with here!');
            }
        }


    }, {
        greetings: 'Hello Robin! Welcome to the game.\n' +
        'At any point type [[b;#fff;]help] for a list of commands.\n',
        prompt: '> ',
        onInit: function(){
            this.exec('loc', true);
        },
    });
})